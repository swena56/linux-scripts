#!/bin/bash

## check if root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi


## check for first paramter
if [ -z "$1" ]
then
      echo "Need domain name for first paramter."
      exit
else
      echo "Domain name is $1"
fi

# install PHP
sudo apt-get install -y python-software-properties

sudo apt-get -qq update
sudo apt-get install -y apache2 libapache2-mod-php7.0 php7.0 php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0-fpm php7.0-mbstring php7.0-mcrypt php7.0-xml php7.0-common php7.0-pgsql php7.0-zip php7.0-dev php7.0-gd php7.0-intl php7.0-mysqlnd php7.0-gd php7.0-imap

# install misc
sudo apt-get install -y screen ranger nano build-essential libssl-dev git curl screenfetch

# sudo apt-get upgrade -y
if grep -q 'screenfetch' "$HOME/.bashrc"; then
  echo "Already added screen fetch";
else 
  echo "screenfetch" >> "$HOME/.bashrc"; 
  echo 'ip -4 addr show eth1 | grep -oP "(?<=inet ).*(?=/)"' >> ~/.bashrc
fi

echo "Finished Install Dependencies and PHP";  

# verify php version
php -v

# Install Composer and Curl
if ! hash composer 2>/dev/null; then
  sudo curl -s https://getcomposer.org/installer | php
  sudo mv composer.phar /usr/local/bin/composer
fi

# verify composer version
composer --version

sudo apt-get install -y build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev libpng-dev

cd ~/
sudo curl -sL https://deb.nodesource.com/setup_7.x > install_npm.sh
sudo chmod 777 install_npm.sh
sudo ./install_npm.sh

sudo apt-get install -y nodejs

node -v
npm -v

if ! hash mysql 2>/dev/null; then
  MYSQL_ROOT_PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | sed 1q)
  MYSQL_PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | sed 1q)

  echo "mysql root password: $MYSQL_ROOT_PASSWORD"

  # Install MySQL Server in a Non-Interactive mode. Default root password will be "root"
  echo "mysql-server mysql-server/root_password password $MYSQL_ROOT_PASSWORD" | sudo debconf-set-selections
  echo "mysql-server mysql-server/root_password_again password $MYSQL_ROOT_PASSWORD" | sudo debconf-set-selections
  sudo apt-get -y install mysql-server

  # Run the MySQL Secure Installation wizard
  ###mysql_secure_installation

  sudo cat > "$HOME/.my.cnf" << EOL 
  [client]
  user=root
  password=$MYSQL_ROOT_PASSWORD
  #database=$1
EOL

  sed -i 's/127\.0\.0\.1/0\.0\.0\.0/g' /etc/mysql/my.cnf
  #mysql -uroot -p -e 'USE mysql; UPDATE `user` SET `Host`="%" WHERE `User`="root" AND `Host`="localhost"; DELETE FROM `user` WHERE `Host` != "%" AND `User`="root"; FLUSH PRIVILEGES;'

  sudo service mysql restart

  mysql --password=$MYSQL_ROOT_PASSWORD --user=root -e "CREATE DATABASE $1"

fi

# install sublime
if ! hash subl 2>/dev/null; then
  wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
  echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
  sudo apt-get update -qq

  sudo apt-get install -y libgtk2.0-0 libgdk-pixbuf2.0-0 libfontconfig1 libxrender1 libx11-6 libglib2.0-0 libxft2 libfreetype6 libc6 zlib1g libpng-dev libstdc++6-4.8-dbg libgcc1

  sudo apt-get install -y sublime-text
fi

###################  Configure Apache ####################
  
sudo apt-get install -y apache2 
sudo /etc/init.d/apache2 start

# verify existance of apache2
apachectl -V

# is apache running
/etc/init.d/apache2 status

# define these details as temp environment variables
SERVER_ADMIN="admin@site.com"
SERVER_NAME="localhost"
DOCUMENT_ROOT="/var/www/html"
DOMAIN_NAME="domain_name"
APACHE_CONF="/etc/apache2/sites-available/$1.conf"

# write the apache conf file
rm $APACHE_CONF;
touch $APACHE_CONF;
echo "<Virtualhost *:80>" > $APACHE_CONF;
echo "   ServerAdmin $SERVER_ADMIN" >> $APACHE_CONF;
echo "   DocumentRoot $DOCUMENT_ROOT/public" >> $APACHE_CONF;
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
echo "   DocumentRoot $DOCUMENT_ROOT/public" >> $APACHE_CONF;
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

sudo sed -i -e "s/export APACHE_RUN_USER=www-data/export APACHE_RUN_USER=$USER/g" /etc/apache2/envvars
sudo sed -i -e "s/export APACHE_RUN_GROUP=www-data/export APACHE_RUN_GROUP=$USER/g" /etc/apache2/envvars

# link the conf to sites-enabled
cd /etc/apache2/sites-enabled
sudo ln -s "../sites-available/$1.conf"
sudo service apache2 restart

## enable php7 
sudo a2enmod php7.0

sudo a2dissite 000-default.conf
sudo a2ensite "$1.conf"
sudo a2enmod rewrite
sudo service apache2 restart

apachectl configtest

sudo a2enmod ssl
#sudo a2ensite default-ssl
sudo /etc/init.d/apache2 restart


sudo mkdir -p /etc/ssl/crt/
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
IP="$(ip -4 addr show eth1 | grep -oP "(?<=inet ).*(?=/)")"
echo "Webserver running on: http://$IP"

sudo /etc/init.d/apache2 restart
sudo update-rc.d apache2 defaults
