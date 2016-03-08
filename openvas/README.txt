echo "Setting up openvas"
apt-get install openvas
openvas-setup

openvasmd --user=admin --new-password=letmein

host=localhost
port=9390
username=admin
password=letmein



# Resources
#http://www.openvas.org/src-doc/openvas-cli/index.html
User created with password 'afeee3bd-2072-4e5e-9d2f-9af53be2d531'.
 lsof |grep 9390
openvas-start
ls -lrt /var/lib/openvas/mgr/tasks.db

omp -v -h 127.0.0.1 -u admin -w letmein -p 9390 -X -

omp -v -h 192.168.2.235 -u nopsec -w passwd -p 9390 -X $(< haha.xml)

omp -u <user> -w <password> --xml='
<create_target>
<name>home</name>
<hosts>10.0.0.0/24</hosts>
</create_target>'
<create_target_response id="8618ee57-27c2-4aaa-95f2-218f503a8398" status_text="OK, 

resource created" status="201"></create_target_response>


#unknown
openvas-setup
omp --help
omp -h 127.0.0.1 -u admin -p 9390 -g
sudo -s
test -e /var/lib/openvas/CA/cacert.pem || openvas-mkcert -q
openvas-nvt-sync
test -e /var/lib/openvas/users/om || openvas-mkcert-client -n om -i
service openvas-manager stop
service openvas-scanner stop
openvassd
openvasmd --migrate
openvasmd --rebuild
openvas-scapdata-sync
openvas-certdata-sync
test -e /var/lib/openvas/users/admin || openvasad -c adduser -n admin -r Admin
killall openvassd
sleep 15
service openvas-scanner start
service openvas-manager start
service openvas-administrator restart
service greenbone-security-assistant restart

openvasmd --user=admin --new-password=letmein
