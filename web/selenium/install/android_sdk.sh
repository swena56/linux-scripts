#!/bin/bash
# install android sdk

sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386 -y
sudo apt-get install android-sdk -y

// sudo apt-get install qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils ia32-libs-multiarch

adb -v
adb start-server

cd /opt
sudo wget http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
sudo tar -zxvf android-sdk_r24.4.1-linux.tgz
sudo chown -R $USER:$USER android-sdk-linux/
sudo rm android-sdk_r24.4.1-linux.tgz


export ANDROID_SDK_ROOT=/opt/android-sdk-linux
./android-sdk-linux/tools/android

./android-sdk-linux/tools/emulator -avd Nexus
## link tools
