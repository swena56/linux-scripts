#!/bin/bash

## check for first paramter
if [ -z "$1" ]
then
      echo "Need Project Name for first paramter."
      exit
else
      echo "Project Name is $1"
fi

PROJECT_NAME="$1"

echo -e "\n--- Setting document root to public directory ---\n"

# Install Laravel
cd $HOME/
composer create-project --prefer-dist laravel/laravel $PROJECT_NAME
cd $HOME/$PROJECT_NAME/

composer require brandonwamboldt/utilphp
composer require behat/mink
composer require behat/mink-selenium2-driver

# set .env default password
MYSQL_ROOT_PASSWORD="$(sudo cat /root/.my.cnf | grep password | cut -d "=" -f 2)"

sudo sed -i -e "s/DB_DATABASE=homestead/DB_DATABASE=$PROJECT_NAME/g" "$HOME/$PROJECT_NAME/.env"
sudo sed -i -e "s/DB_USERNAME=homestead/DB_USERNAME=root/g" "$HOME/$PROJECT_NAME/.env"
sudo sed -i -e "s/DB_PASSWORD=secret/DB_PASSWORD=$MYSQL_ROOT_PASSWORD/g" "$HOME/$PROJECT_NAME/.env"

php artisan make:auth
php artisan preset react
php artisan migrate
npm install && npm run dev

# potential
npm install babel-preset-react --save-dev
npm install react react-dom --save-dev
#npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer

# link components
cd $HOME/$PROJECT_NAME/resources/assets/js/
rm -rf components

git clone http://github.com/swena56/components

sudo sed -i -e 's/Example/_ROOT_\/Root/g' app.js

cd components
git config --global user.email "swena56@gmail.com"
git config --global user.name "Andrew Swenson"

cp welcome.blade.php ../../../views/

sudo chown -R $USER:$USER $HOME/$PROJECT_NAME

sudo ln -fs $HOME/$PROJECT_NAME /var/www/html

sleep 5
sudo /etc/init.d/apache2 restart

echo "Starting NPM watch, check `screen -ls`"
runuser -l vagrant -c "screen -dmS watch bash -c 'echo Starting NPM Watch; sudo /etc/init.d/apache2 restart; cd $PROJECT_NAME; sleep 5; npm run watch; exec bash'"
screen -ls
echo
echo

IP="$(ifconfig | grep "inet addr:" | grep -v 127.0.0.1 | sed -e 's/Bcast//' | cut -d: -f2)"
echo "Webserver running on: https://$IP && http://$IP"
echo

