
echo "deb http://deb.torproject.org/torproject.org sana main" >> /etc/apt/sources.list
gpg --keyserver keys.gnupg.net --recv 886DDD89
gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
apt-get update
apt-get upgrade
apt-get install deb.torproject.org-keyring
apt-get install tor


#https://www.torproject.org/projects/torbrowser.html.en
