#!/bin/bash

if [[ -z "$1" && ! -d "$1" ]]; then

   echo "[+] Need parameter 1 - Laravel Project Directory"
   exit

fi

PROJECT=${1%/}

echo "Project: $PROJECT"

COMP_DIR="$PROJECT/resources/assets/js"


if [ ! -d "$COMP_DIR" ]; then
	echo "[!] Needs to be a laravel directory: $COMP_DIR"
	exit
fi

echo $COMP_DIR
echo  "$(pwd)/components/ ./components"

ln -sf "$(pwd)/components/" "$COMP_DIR/components"

ls -lrt $COMP_DIR/components

echo "Done"
