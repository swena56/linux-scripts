#!/bin/bash
[ -z "$(which wsgidav)" ] && pip install wsgidav cheroot
/etc/init.d/apache2 stop > /dev/null 2>&1 &
wsgidav --host=0.0.0.0 --port=80 --root "$(pwd)" --auth=anonymous > /dev/null 2>&1 &
pkill ngrok
ngrok http 80
pkill wsgidav