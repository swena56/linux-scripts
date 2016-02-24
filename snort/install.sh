 sudo apt-get install flex bison build-essential checkinstall libpcap-dev libnet1-dev libpcre3-dev libmysqlclient15-dev libnetfilter-queue-dev iptables-dev
 wget https://libdnet.googlecode.com/files/libdnet-1.12.tgz
 tar xvfvz libdnet-1.12.tgz
 cd libdnet-1.12
 ./configure "CFLAGS=-fPIC"
 make
 sudo checkinstall

sudo dpkg -i libdnet*.deb
sudo ln -s /usr/local/lib/libdnet.1.0.1 /usr/lib/libdnet.1

https://www.snort.org/downloads/snort/daq-2.0.6.tar.gz
 tar xvfvz daq-2.0.6.tar.gz
 cd daq-2.0.6
./configure; make; sudo make install

# ./configure
# make
# sudo checkinstall
# sudo dpkg -i daq*.deb


wget https://www.snort.org/downloads/snort/snort-2.9.8.0.tar.gz
tar xvfvz snort-2.9.8.0.tar.gz
 cd snort-2.9.8
./configure --enable-sourcefire; make; sudo make install 

#./configure --enable-sourcefire
# make
# sudo checkinstall  # this or do make install
# sudo dpkg -i snort_*.deb
# sudo ln -s /usr/local/bin/snort /usr/sbin/snort

sudo ldconfig -v

snort -v
sudo groupadd snort
sudo useradd snort -d /var/log/snort -s /sbin/nologin -c SNORT_IDS -g snort
sudo mkdir /var/log/snort
sudo chown snort:snort /var/log/snort


sudo mkdir /etc/snort
 sudo tar xvfvz snortrules-snapshot-2950.tar.gz -C /etc/snort
 sudo touch /etc/snort/rules/white_list.rules /etc/snort/rules/black_list.rules
 sudo mkdir /usr/local/lib/snort_dynamicrules
 sudo chown -R snort:snort /etc/snort/*
 sudo mv /etc/snort/etc/* /etc/snort

echo "\n" > /etc/snort/snort.conf
echo "var RULE_PATH /etc/snort/rules\n" >> /etc/snort/snort.conf
echo "var SO_RULE_PATH /etc/snort/so_rules\n"
echo "var PREPROC_RULE_PATH /etc/snort/preproc_rules\n" >> /etc/snort/snort.conf
echo "var WHITE_LIST_PATH /etc/snort/rules\n" >> /etc/snort/snort.conf
echo "var BLACK_LIST_PATH /etc/snort/rules\n" >> /etc/snort/snort.conf
echo "ipvar HOME_NET 10.0.0.0/24\n" >> /etc/snort/snort.conf
echo "ipvar EXTERNAL_NET !$HOME_NET\n" >> /etc/snort/snort.conf
 sudo nano /etc/snort/snort.conf


 sudo snort -T -i wlan0 -u snort -g snort -c /etc/snort/snort.conf

 wget https://www.snort.org/rules/community
tar -xvfz community.tar.gz -C /etc/snort/rules
