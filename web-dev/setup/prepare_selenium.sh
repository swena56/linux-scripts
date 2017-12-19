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

PROJECT_NAME="WebDev"

screen -X -S selenium kill
screen -dmS selenium bash -c "cd ~/$PROJECT_NAME; php artisan serve --host=0.0.0.0; exec bash;"
screen -X -S serve kill
screen -dmS serve bash -c "cd ~/; java -jar selenium-server-standalone-3.8.1.jar; exec bash;"


sleep 4
screen -ls


