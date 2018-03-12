#!/bin/bash
## Install NodeJS and NPM ##

# might be necessary to remove the node_modules directory from project directory
# before doing npm install

sudo apt-get install nodejs npm -y
sudo npm cache clean -f
sudo npm install npm@latest -g
sudo n stable

sudo ln -sf `which node` /usr/bin/nodejs
sudo ln -sf /usr/local/bin/npm /usr/bin/npm

npm -v
nodejs -v