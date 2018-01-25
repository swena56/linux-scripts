#!/usr/bin/bash
# Sample Cert generation, change the subject details

if [ ! -f /opt/CERT.pem ]; then
echo "CERT not found, generating now"

openssl req -new -newkey rsa:4096 -days 365 -nodes -x509 \
    -subj "/C=US/ST=MN/L=GV/O=Dev/CN=CERT" \
    -keyout CERT.key \
    -out CERT.crt && \
cat CERT.key  CERT.crt > CERT.pem && \
rm -f CERT.key  CERT.crt

mv CERT.pem /opt/CERT.pem

fi

