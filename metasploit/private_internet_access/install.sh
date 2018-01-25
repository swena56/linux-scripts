#TODO Not implemented


apt-get install openvpn
unzip openvpn.zip -d /opt/pia

wget https://www.privateinternetaccess.com/installer/install_ubuntu.sh 
mv install_ubuntu.sh /opt/pia
cd /opt/pia
sh install_ubuntu.sh
openvpn --config "US Midwest.ovpn"


function create_pia_service {
	#https://www.privateinternetaccess.com/forum/discussion/20798/command-line-start-at-boot-linux-vpn

	#chmod .ovpn file
	# needs to go in /etc/init.d/
#pip contents into file

exec 1>/var/log/vpn 2>&1

case "$1" in
  start)
    echo "Connecting to PIA VPN "
    /usr/sbin/openvpn --config "/opt/pia/US Midwest.ovpn" &
    ;;
  stop)
    echo "Closing connection to PIA VPN "
    killall openvpn
    ;;
  *)
    echo "Usage: /etc/init.d/vpn {start|stop}"
    exit 1
    ;;
esac

exit 0


# inform user how to start service

#set up on boot
#update-rc.d vpn defaults

}


