#!/bin/bash
# files can be semt via curl:  curl https://<ID>.ngrok.io --upload-file file-name.txt
FOLDER=$1
if [ ! -d "$FOLDER" ]; then
	echo "Need file directory"
	mkdir -p /tmp/webdav/share	
	read -p "FOLDER [/tmp/webdav/share]: " FOLDER; FOLDER=${FOLDER:-'/tmp/webdav/share'}
	[ ! -d "$FOLDER" ] && echo "Invalid directory" && exit
fi
[ -z "$(which wsgidav)" ] && pip install wsgidav cheroot
/etc/init.d/apache2 stop > /dev/null 2>&1 &

pkill wsgidav
wsgidav --host=0.0.0.0 --port=80 --root "$FOLDER" --auth=anonymous > /dev/null 2>&1 &
#wsgidav --host=0.0.0.0 --port=80 --root "$1	" --auth=nt > /dev/null 2>&1 &
pkill ngrok
ngrok http 80
pkill wsgidav