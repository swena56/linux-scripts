
#aircrack-ng /root/wpa.cap

ESSID="ASUS"
john --stdout --wordlist=rockyou_8.txt --rules | aircrack-ng -e "${ESSID}" -a 2 -w - /root/wpa.cap
