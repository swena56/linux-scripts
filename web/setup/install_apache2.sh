###################  Configure Apache ####################

## uses a project folder in the home directory for param 1

## check if has first parameter
if [ -z "$1" ]
then
     if [ ! -d "$1" ]; then
	echo "[!] Domain project directory does not exist"
	exit
     fi
     echo "[+] Parameter 1 is empty, domain name"
     exit
else
      echo "[!] Got domain name."
fi

## check if root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

  
sudo apt-get install -y apache2 

## install certbot
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-apache -y

a2enmod ssl
sudo apt-get install --only-upgrade libssl1.0.0 openssl


## generate cert
#sudo certbot --apache -d "$1"


sudo /etc/init.d/apache2 start

## prevent poodle attack
#nano /etc/apache2/mods-enabled/ssl.conf

#SSLProtocol ALL -SSLv2 -SSLv3
#SSLCipherSuite ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:HIGH:+AES256:+CAMELLIA:+SHA1:+3DES:!aNULL:!DSS:!DH:-AES+SSLv3
#SSLHonorCipherOrder On


# verify existance of apache2
apachectl -V

# is apache running
/etc/init.d/apache2 status

# define these details as temp environment variables
SERVER_ADMIN="admin@site.com"
SERVER_NAME="localhost"
DOCUMENT_ROOT="/var/www/html"
DOMAIN_NAME="$1"
APACHE_CONF="/etc/apache2/sites-available/$1.conf"


if [ ! -f "$APACHE_CONF" ]; then

# write the apache conf file
rm $APACHE_CONF;
touch $APACHE_CONF;
echo "<Virtualhost *:80>" > $APACHE_CONF;
echo "   ServerAdmin $SERVER_ADMIN" >> $APACHE_CONF;
echo "   DocumentRoot $DOCUMENT_ROOT/$DOMAIN_NAME" >> $APACHE_CONF;
echo "   ServerName $SERVER_NAME" >> $APACHE_CONF;
echo "   <directory \"$DOCUMENT_ROOT\">" >> $APACHE_CONF;
echo "      AllowOverride All" >> $APACHE_CONF;
echo "      Order allow,deny" >> $APACHE_CONF;
echo "      allow from all" >> $APACHE_CONF;
echo "   </directory>" >> $APACHE_CONF;
echo "   ErrorLog /var/log/apache2/$DOMAIN_NAME.com-error_log" >> $APACHE_CONF;
echo "   CustomLog /var/log/apache2/$DOMAIN_NAME.com-access_log common" >> $APACHE_CONF;
echo "</Virtualhost>" >> $APACHE_CONF;
echo "" >> $APACHE_CONF;
echo "<Virtualhost *:443>" >> $APACHE_CONF;
echo "   ServerAdmin $SERVER_ADMIN" >> $APACHE_CONF;
echo "   DocumentRoot $DOCUMENT_ROOT/$DOMAIN_NAME" >> $APACHE_CONF;
echo "   ServerName $SERVER_NAME" >> $APACHE_CONF;
echo "   ServerAlias $SERVER_ALIAS" >> $APACHE_CONF;
echo "   SSLEngine on" >> $APACHE_CONF;
echo "   SSLCertificateFile \"/etc/ssl/crt/$1.crt\"" >> $APACHE_CONF;
echo "   SSLCertificateKeyFile \"/etc/ssl/crt/$1.key\"" >> $APACHE_CONF;
#echo "   SSLCertificateChainFile /path/to/DigiCertCA" >> $APACHE_CONF;
echo "   <directory \"$DOCUMENT_ROOT\">" >> $APACHE_CONF;
#echo "      Options FollowSymLinks" >> $APACHE_CONF;
echo "      AllowOverride All" >> $APACHE_CONF;
echo "      Order allow,deny" >> $APACHE_CONF;
echo "      allow from all" >> $APACHE_CONF;
echo "   </directory>" >> $APACHE_CONF;
echo "   ErrorLog /var/log/apache2/$DOMAIN_NAME.com-error_log" >> $APACHE_CONF;
echo "   CustomLog /var/log/apache2/$DOMAIN_NAME.com-access_log common" >> $APACHE_CONF;
echo "</Virtualhost>" >> $APACHE_CONF;
cat $APACHE_CONF;

sudo sed -i -e "s/export APACHE_RUN_USER=www-data/export APACHE_RUN_USER=ubuntu/g" /etc/apache2/envvars
sudo sed -i -e "s/export APACHE_RUN_GROUP=www-data/export APACHE_RUN_GROUP=ubuntu/g" /etc/apache2/envvars


if ! grep -q "export APACHE_RUN_USER=ubuntu" /etc/apache2/envvars; then
    echo "apache run user not set, adding to envvars"
    sudo echo "export APACHE_RUN_USER=ubuntu" >> /etc/apache2/envvars
fi

if ! grep -q "export APACHE_RUN_GROUP=ubuntu" /etc/apache2/envvars; then
    echo "apache run group not set, adding to envvars"
    sudo echo "export APACHE_RUN_GROUP=ubuntu" >> /etc/apache2/envvars
fi


# link the conf to sites-enabled
cd /etc/apache2/sites-enabled
sudo ln -s "../sites-available/$1.conf"
sudo service apache2 restart

sudo a2ensite "$1.conf"


else

  echo "$APACHE_CONF already exists"

fi


## enable php7 
sudo a2enmod php7.0

sudo a2dissite 000-default.conf
sudo a2enmod rewrite
sudo service apache2 restart


apachectl configtest

sudo a2enmod ssl
#sudo a2ensite default-ssl
sudo /etc/init.d/apache2 restart


# set up certs
sudo mkdir -p /etc/ssl/crt/

if [ ! -f "/etc/ssl/crt/$1.crt" ]; then
cd /etc/ssl/crt

#Required
domain=$1
commonname=$domain

#Change to your company details
country=US
state=MN
locality=Minneapolis
organization=MyOrg
organizationalunit=IT
email=email@email.com
days=1
 
#Optional
password=dummypassword
 
if [ -z "$domain" ]
then
    echo "Argument not present."
    echo "Useage $0 [common name]"
 
    exit 99
fi
 
echo "Generating key request for $domain"
 
sudo openssl genrsa -des3 -passout pass:$password -out $domain.key 2048 -noout

#Remove passphrase from the key. Comment the line out to keep the passphrase
echo "Removing passphrase from key"
sudo openssl rsa -in $domain.key -passin pass:$password -out "$domain.key"

#Create the request
echo "Creating CSR"
sudo openssl req -new -key $domain.key -out $domain.pem -passin pass:$password    -subj "/C=$country/ST=$state/L=$locality/O=$organization/OU=$organizationalunit/CN=$commonname/emailAddress=$email"
sudo openssl x509 -in $domain.pem -out $domain.crt -req -signkey $domain.key -days $days

echo "---------------------------"
echo "-----Below is your CSR-----"
echo "---------------------------"
echo
cat $domain.crt
 
echo
echo "---------------------------"
echo "-----Below is your Key-----"
echo "---------------------------"
echo
cat $domain.key
echo

else 
echo "crt and key already exists"

fi


IP="$(ifconfig | grep "inet addr:" | grep -v 127.0.0.1 | sed -e 's/Bcast//' | cut -d: -f2)"
#IP="$(ip -4 addr show eth1 | grep -oP "(?<=inet ).*(?=/)")"
echo "Webserver running on: http://$IP"

sudo /etc/init.d/apache2 restart
sudo update-rc.d apache2 defaults


# check status of fpm
/etc/init.d/php7.0-fpm status

# write fpm config file.
cat << EOT >> /etc/php/7.0/fpm/pool.d/www-data.conf
[www]
user = www
group = www-data
listen = /var/run/php-fpm-www-data.sock
listen.owner = www
listen.group = www-data
listen.mode = 0666
pm = ondemand
pm.max_children = 5
pm.process_idle_timeout = 10s
pm.max_requests = 200
chdir = /
EOT

# restart php fpm
/etc/init.d/php7.0-fpm restart

#journalctl -xe
echo "Now link a project to the location /var/www/html"
echo
echo "Example:"
echo "sudo ln -sf /home/ubuntu/microweber/ /var/www/html/$DOMAIN_NAME"
