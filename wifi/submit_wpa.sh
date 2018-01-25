#!/bin/bash 

EMAIL="swena56@gmail.com"
LOG="/tmp/wpa_submit.log"
FILE="~/wpa.cap"

echo "${LOG}"
echo "${EMAIL}"
echo "${FILE}"

#curl -s -v -F submit="Submit" -F emailWpa="${EMAIL}" -F wpaFile=@${FILE} http://www.onlinehashcrack.com/wifi-wpa-rsna-psk-crack.php > /dev/null 2>> ${LOG}

exit
