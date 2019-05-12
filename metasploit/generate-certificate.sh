#!/bin/bash

function generate-certificate(){
	openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
	-subj "/C=US/ST=MN/L=GV/O=Dev/CN=CERT" \
	-keyout CERT.key \
	-out CERT.crt && \
	cat CERT.key CERT.crt > CERT.pem && \
	rm -f CERT.key CERT.crt
	ls -lrth CERT.pem
}
