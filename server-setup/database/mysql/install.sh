#!/bin/bash
# install mysql, and write .my.cnf
# requires root

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

  mkdir -p /var/run/mysqld
  chown mysql:mysql /var/run/mysqld

fi