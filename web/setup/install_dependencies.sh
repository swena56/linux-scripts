#!/bin/bash

## check if root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi


IP="$(ifconfig | grep "inet addr:" | grep -v 127.0.0.1 | sed -e 's/Bcast//' | cut -d: -f2)"

sudo apt-get update
sudo apt-get -y upgrade

# install PHP
sudo apt-get install -y python-software-properties

sudo apt-get -qq update
sudo apt-get install -y apache2 libapache2-mod-php7.0 php7.0 php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0-fpm php7.0-mbstring php7.0-mcrypt php7.0-xml php7.0-common php7.0-pgsql php7.0-zip php7.0-dev php7.0-gd php7.0-intl php7.0-mysqlnd php7.0-gd php7.0-imap

# install misc
sudo apt-get install -y screen ranger nano build-essential libssl-dev git curl screenfetch
sudo apt-get install build-essential libssl-dev libffi-dev python3-dev build-essential m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev libpng-dev

# install nodejs and NPM
# cd ~/
# sudo curl -sL https://deb.nodesource.com/setup_7.x > install_npm.sh
# sudo chmod 777 install_npm.sh
# sudo ./install_npm.sh

sudo apt-get install nodejs npm -y
sudo npm cache clean -f
sudo npm install npm@latest -g
sudo n stable

sudo ln -sf `which node` /usr/bin/nodejs
sudo ln -sf /usr/local/bin/npm /usr/bin/npm

npm -v
nodejs -v


# sudo apt-get upgrade -y
if grep -q 'screenfetch' "$HOME/.bashrc"; then
  echo "Already added screen fetch";
else 
  echo "screenfetch" >> "$HOME/.bashrc"; 
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


cat > "/root/.my.cnf" << EOL 
[client]
user=root
password=$MYSQL_ROOT_PASSWORD
#database=$1
EOL

  sed -i 's/127\.0\.0\.1/0\.0\.0\.0/g' /etc/mysql/my.cnf
  mysql -uroot -P $MYSQL_ROOT_PASSWORD -e 'USE mysql; UPDATE `user` SET `Host`="%" WHERE `User`="root" AND `Host`="localhost"; DELETE FROM `user` WHERE `Host` != "%" AND `User`="root"; FLUSH PRIVILEGES;'

  sudo service mysql restart

  mysql --password=$MYSQL_ROOT_PASSWORD --user=root -e "CREATE DATABASE $1"

  mkdir -p /var/run/mysqld
  chown mysql:mysql /var/run/mysqld

fi

# install sublime
if ! hash subl 2>/dev/null; then
  wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
  echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
  sudo apt-get update -qq

  sudo apt-get install -y libgtk2.0-0 libgdk-pixbuf2.0-0 libfontconfig1 libxrender1 libx11-6 libglib2.0-0 libxft2 libfreetype6 libc6 zlib1g libpng-dev libstdc++6-4.8-dbg libgcc1

  sudo apt-get install -y sublime-text
fi

apt-get autoremove -y

echo "DONE"
exit
