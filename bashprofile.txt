alias ip="dig +short myip.opendns.com @resolver1.opendns.com"

## search for file and open it with nano
fnano() {
    local PS3="Choose a file to edit: "
    select opt in $(locate "$1") quit
    do
        if [[ $opt = "quit" ]]
        then
            break
        fi
        ${EDITOR:-nano} "$opt"
    done
}
