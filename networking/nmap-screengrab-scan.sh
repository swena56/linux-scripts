#!/bin/bash
# apt-get install nmap -y
# https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/using-nmap-to-screenshot-web-services/
# git clone git://github.com/SpiderLabs/Nmap-Tools.git
# cd Nmap-Tools/NSE/
# downloaded the wrong version of wkhtml, so I needed to rename it in the script
# cp http-screenshot.nse /usr/local/share/nmap/scripts/
# nmap --script-updatedb
# install for ubuntu
# wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox_0.12.6-1.focal_amd64.deb
# sudo apt install ./wkhtmltox_0.12.6-1.focal_amd64.deb -y

cd /tmp
nmap -A --script=default,http-screenshot 192.168.50.1/24 -p80,443 -oA results

printf "<HTML><BODY><BR>" > preview.html
ls -1 *.png | awk -F : '{ print $1":"$2"\n<BR><IMG SRC=\""$1"%3A"$2"\" width=400><BR><BR>"}' >> preview.html
printf "</BODY></HTML>" >> preview.html
