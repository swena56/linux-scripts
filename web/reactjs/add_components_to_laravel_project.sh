#!/bin/bash

## copys the components dir to a project

if [[ -z "$1" && ! -d "$1" ]]; then

   echo "[+] Need parameter 1 - Laravel Project Directory"
   exit

fi

PROJECT=${1%/}

echo "Project: $PROJECT"

COMP_DIR="$PROJECT/resources/assets/js"

if [ ! -d "$COMP_DIR" ]; then

	if [ -d "$PROJECT/src" ]; then
		COMP_DIR="$PROJECT/src"
	else
		echo "[!] Needs to be a laravel directory: $COMP_DIR"
		exit
	fi
fi

echo $COMP_DIR
echo  "$(pwd)/components/ ./components"

#ln -sf "$(pwd)/components/" "$COMP_DIR/components"

echo "Copying components directory to project dir"
cp -R "$(pwd)/base_source/src/components" "$COMP_DIR/components"

ls -lrt $COMP_DIR/components

echo "Done"
