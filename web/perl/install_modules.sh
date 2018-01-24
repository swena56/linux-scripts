#!/usr/bin/bash

## install cpanm

apt-get update
apt-get upgrade -y
apt-get install -y cpanminus


##LWP::UserAgent
cpanm install LWP::UserAgent \
	HTTP::Request::Common \
	WWW::Scripter \
	WWW::Scripter::Plugin::Ajax 
