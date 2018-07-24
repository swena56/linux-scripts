_alarm() {
	( \speaker-test --frequency $1 --test sine )&
	pid=$!
	\sleep ${2}
	\kill -9 $pid
	}


_run() {
	if ping -c 1 8.8.8.8 &> /dev/null
	then
		_alarm 1000 1
		sleep 1
		_alarm 1000 1
		sleep 1
		_alarm 1000 1
		exit
	else
		echo -e "Fail: " $(date) >> internetTest.log
	fi
}

while [[ 1 -eq 1 ]]; do
	_run
	sleep 15
	done

