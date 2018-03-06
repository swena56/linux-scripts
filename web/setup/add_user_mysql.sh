#!/bin/bash

## check if root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi

USER=$1

if [[ -z $USER ]]; then
	echo "Need user, example"
	echo "./add_user_mysql.sh ubuntu"
	exit 1
fi

MYSQL_ROOT_PASSWORD="$(grep password /root/.my.cnf | grep password | cut -d '=' -f 2)"

if [[ -z $MYSQL_ROOT_PASSWORD ]]; then
	echo "Could not fetch root mysql password"
	exit 1
fi

echo "Granting privileges for $USER"
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO '$USER'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"


## add .my.cnf to user home directory
cp /root/.my.cnf /home/$USER/
chown $USER:$USER /home/$USER/.my.cnf

echo "Done adding $USER"
echo

