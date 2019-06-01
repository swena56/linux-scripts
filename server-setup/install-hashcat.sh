cd
sudo apt update
sudo apt install cmake build-essential
sudo apt install checkinstall git
sudo apt remove hashcat
sudo apt build-dep hashcat
sudo rm -rf hashcat
git clone https://github.com/hashcat/hashcat.git
cd hashcat
git submodule update --init
sudo make
sudo checkinstall
hashcat --version
# hashcat version should be v3.5.0 or newer