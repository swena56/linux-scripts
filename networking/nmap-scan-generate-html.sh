
MYIP="192.168.1.243"
SUBNET="192.168.1.0/24"
FILENAME="namp-$(date +%F_%R)"

nmap -A $SUBNET -oX "/tmp/$FILENAME.xml"
xsltproc "/tmp/$FILENAME.xml" -o "/var/www/html/files/$FILENAME.html"

echo "http://$MYIP/files/$FILENAME.html"
