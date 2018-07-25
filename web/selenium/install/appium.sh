#!/bin/bash

## remove old versions
echo "Remove nodejs? "
sudo apt-get remove nodej

echo "Remove npm? "
sudo apt-get remove npm

## install nodejs dependencies
sudo apt-get install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev -y
sudo apt-get install linuxbrew-wrapper -y

## manual brew install linux
# ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
# export PATH="$HOME/.linuxbrew/bin:$PATH"
# export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
# export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"

brew update
brew install node
brew link node

node -v
npm -v

npm install -g appium
npm install wd

appium