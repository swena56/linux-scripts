#!/bin/bash

CERTBOT_INSTALLED="$(which certbot)"
DOMAIN="$1"

if [ ! -f "$CERTBOT_INSTALLED" ]; then
	## install certbot
	sudo add-apt-repository ppa:certbot/certbot
	sudo apt-get update
	sudo apt-get install python-certbot-apache -y

	a2enmod ssl
	sudo apt-get install --only-upgrade libssl1.0.0 openssl
	else
	echo "[+] certbot installed at: $CERTBOT_INSTALLED"
fi


if [ ! -z "$DOMAIN" ]; then
	
	echo "[+] Domain set, $DOMAIN"
	## generate cert
	sudo certbot --apache -d "$1"

	else
	echo "[!] Domain unset!"
fi



# text here


