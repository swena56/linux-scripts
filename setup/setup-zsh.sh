#!/usr/bin/env bash

# install dependencies
# sudo apt update
! command -v fzf &>2 && sudo apt install fzf -y
! command -v jq &>2 && sudo apt install jq -y
! command -v hx &>2 && sudo apt install hx -y

# install https://ohmyz.sh/
if [ ! -d ~/.oh-my-zsh ]; then
    echo "[+] installing oh-my-zsh"
 	sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
	exit
fi

# manually install plugins
if [ ! -d ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-fzf-history-search ]; then
	git clone https://github.com/joshskidmore/zsh-fzf-history-search ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-fzf-history-search
fi

## Setup plugins - https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins
function addPlugin() {
    local PLUGINS=$(cat ~/.zshrc | grep 'plugins=' | grep -v '#' | awk -F"[()]" '{print $2}')
    if ! grep -q "$1" <<< "$PLUGINS"; then
        echo "[+] Adding $1"
        sed -i 's/^plugins=.*$/plugins=('"$PLUGINS $1"')/' ~/.zshrc
    fi
}

addPlugin last-working-dir
addPlugin zsh-fzf-history-search
addPlugin zsh-interactive-cd
addPlugin zsh-syntax-highlighting
