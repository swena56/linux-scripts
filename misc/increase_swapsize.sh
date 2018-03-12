#!/bin/bash


if [ ! -f "/mnt/file.swap" ]; then
	sudo dd if=/dev/zero of=/mnt/file.swap bs=1M count=512
	echo "created swap file"
	ls -lrth /mnt/file.swap
	
	sudo chmod 0600 /mnt/file.swap	
	
	sudo mkswap /mnt/file.swap
	sudo swapon /mnt/file.swap

	## add to fstab
	sudo cat "/mnt/file.swap none swap sw 0 0" >> /etc/fstab
fi



# /etc/fstab
#/mnt/file.swap none swap sw 0 0
