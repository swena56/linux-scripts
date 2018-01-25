#!/bin/bash

if [ -z "$1" ]
then

	echo "end need paramter 1, wifi interface"
	exit

else

	echo "$1"

fi

iw reg set BO
iwconfig $1 txpower 30

exit
