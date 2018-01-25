sudo apt-get update
sudo apt-get upgrade

sudo apt-get install metasploit-framework -y

exit

#will install metasploit
sudo apt-get install libpq-dev \
         gnupg2 \
        build-essential \
        libreadline-dev \
        libssl-dev \
        libpq5 \
        libpq-dev libreadline5 libsqlite3-dev libpcap-dev openjdk-8-jre git-core  autoconf curl;

gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3;
curl -L https://get.rvm.io | bash -s stable;
source /usr/local/rvm/scripts/rvm

echo "source /usr/local/rvm/scripts/rvm" >> ~/.bashrc;
rvm install 2.3.1 && rvm use 2.3.1 --default;
cd /opt;
git clone https://github.com/rapid7/metasploit-framework.git;
cd /opt/metasploit-framework;
gem install bundler;
bundle install

source /etc/profile.d/rvm.sh

export PATH=$PATH:/opt/metasploit-framework

## set up database
#

msfconsole
