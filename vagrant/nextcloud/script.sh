#!/bin/bash
# script.sh

sudo apt-get update
sudo apt-get upgrade -y

## install dependencies
sudo apt-get install wget curl unzip -y

## Download nextcloud
# as of 2018-03-05
# https://nextcloud.com/install/#instructions-server
if [ ! -f "nextcloud-13.0.0.zip" ]; then
	wget https://download.nextcloud.com/server/releases/nextcloud-13.0.0.zip
	unzip nextcloud-13.0.0.zip
fi

sudo ln -sf /home/vagrant/nextcloud/ /var/www
