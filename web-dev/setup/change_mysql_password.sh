
sudo killall mysqld
sudo /etc/init.d/mysql stop


mkdir -p /var/run/mysqld
chown mysql:mysql /var/run/mysqld

mysqld_safe --skip-grant-tables &

#mysqld --skip-grant-tables &

MYSQL_ROOT_PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | sed 1q)
MYSQL_PASSWORD=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | sed 1q)

echo "MySQL password: $MYSQL_ROOT_PASSWORD";

echo "USER: $USER"

mysql -u root -e "USE mysql; UPDATE user SET Password = PASSWORD('$MYSQL_ROOT_PASSWORD') WHERE Host = 'localhost' AND User = 'root'; FLUSH PRIVILEGES;"
mysql -u root -e "CREATE USER '$USER'@'%' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';GRANT ALL PRIVILEGES ON *.* TO '$USER'@'localhost' WITH GRANT OPTION; FLUSH PRIVILEGES;"

sudo cat > $HOME/.my.cnf << EOL 
[client]
user=root
password=$MYSQL_ROOT_PASSWORD
#database=$1
EOL

sudo /etc/init.d/mysql stop
sudo /etc/init.d/mysql start


