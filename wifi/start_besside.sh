#!/bin/sh


source /root/.profile

echo "besside.sh screen"

iw dev wlan0 info
iw phy phy0 interface add mon0 type monitor
ifconfig mon0 up

cd ~/

sleep 5

/usr/bin/screen -dmS bess bash -c 'cd /root/; sleep 20; besside-ng mon0; sleep 5; exec bash'
#screen -dmS bess bash -c 'echo waiting 5 senconds...; sleep 5; exec bash'

/usr/bin/screen -ls
