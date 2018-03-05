PROJECT_NAME="$1"


if [ -z "$1" ]; then
     echo "Using default name"
     # note that the project can not contain symbols
     PROJECT_NAME="microweber"
fi

echo "Create microweber proeject called $PROJECT_NAME"


## grab .my.cnf password
if [ ! -f "$HOME/.my.cnf" ]; then
   echo "Mysql .my.cnf does not exist"
   exit
fi

MYSQL_ROOT_PASSWORD="$(grep password $HOME/.my.cnf | grep password | cut -d '=' -f 2)"

# allow group by mysql
mysql -e "set global sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'"
mysql -e "set global sql_mode = ''"

#git clone https://github.com/microweber/microweber
if [ ! -d "$HOME/$PROJECT_NAME" ]; then
	# download microweber to the location you want to serve the project
	cd $HOME
	composer create-project microweber/microweber $PROJECT_NAME
	cd -
else
  	echo "[+] $PROJECT_NAME Already exists"
fi

	cd $HOME/$PROJECT_NAME
	composer install

	## create database
	mysql -e "CREATE DATABASE IF NOT EXISTS $PROJECT_NAME"

	#php artisan microweber:install admin@site.com admin_username admin_password '127.0.0.1' $PROJECT_NAME $USER database_password secret -p extention_used_on_database_tables
	#echo "php artisan microweber:install admin@site.com admin_username admin_password '127.0.0.1' $PROJECT_NAME $USER $MYSQL_ROOT_PASSWORD"
	php artisan microweber:install admin@site.com admin_username admin_password '127.0.0.1' $PROJECT_NAME $USER $MYSQL_ROOT_PASSWORD

	echo "[+] Allowing apache to own the src folder"
	sudo chown ubuntu:ubuntu $HOME/$PROJECT_NAME/src/Microweber
	sudo chmod -R 755 $HOME/$PROJECT_NAME/src
	sudo chmod -R 755 $HOME/$PROJECT_NAME/index.php

cd -
pwd

sudo bash ./install_apache2.sh $PROJECT_NAME

echo
echo "[+] Linking project folder to apache2"
echo "sudo ln -sf $HOME/$PROJECT_NAME/ /var/www/html/$PROJECT_NAME"
sudo ln -sf $HOME/$PROJECT_NAME/ /var/www/html/$PROJECT_NAME

exit


