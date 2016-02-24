
wget https://www.snort.org/downloads/snort/daq-2.0.6.tar.gz
wget https://www.snort.org/downloads/snort/snort-2.9.8.0.tar.gz

tar xvfz daq-2.0.6.tar.gz
cd daq-2.0.6
./configure; make; sudo make install
cd ..

tar xvfz snort-2.9.8.0.tar.gz
cd snort-2.9.8.0
./configure --enable-sourcefire; make; sudo make install
cd ..
