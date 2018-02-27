#!/bin/bash

sudo apt-get install openjdk-9-jre-headless wget -y
cd ~/

if [ -e ~/selenium-server-standalone-3.8.1.jar ]
then
       echo "exists"
else
       cd ~/
	wget http://selenium-release.storage.googleapis.com/3.8/selenium-server-standalone-3.8.1.jar
fi

PROJECT_NAME=$1


if [[ -z $PROJECT_NAME ]]; then
        echo "Need project name"
        exit 1

fi

screen -X -S serve kill
screen -dmS serve bash -c "cd ~/$PROJECT_NAME; php artisan serve --host=0.0.0.0; exec bash;"
screen -X -S selenium kill
screen -dmS selenium bash -c "cd ~/; sudo java -jar selenium-server-standalone-3.8.1.jar; exec bash;"

echo "Selenium server is running"
echo "$PROJECT_NAME is servered at http://$IP:8000"

sleep 4
screen -ls


