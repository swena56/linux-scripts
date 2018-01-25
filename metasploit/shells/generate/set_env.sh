#!/usr/bin/bash

## dependencies
sudo apt-get install dnsutils -y -q

## get public ip address
export PUBLIC_IP="$(dig +short myip.opendns.com @resolver1.opendns.com)"
echo "Public: $PUBLIC_IP"
echo
