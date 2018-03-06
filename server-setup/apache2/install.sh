

## install apache2
sudo apt-get install -y apache2 
sudo /etc/init.d/apache2 start


## install php
sudo apt-get install -y libapache2-mod-php7.0 php7.0 php7.0-mysql php7.0-curl php7.0-json php7.0-cgi php7.0-fpm php7.0-mbstring php7.0-mcrypt php7.0-xml php7.0-common php7.0-pgsql php7.0-zip php7.0-dev php7.0-gd php7.0-intl php7.0-mysqlnd php7.0-gd php7.0-imap

## enable php rewrite
sudo a2enmod php7.0
sudo a2enmod rewrite

