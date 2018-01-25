<?php

/*
	By: AFS
	Helps demonstrate how to connect to wireless networks via cli,
	using standard linux tools

	** requires root

	TODO:
		ADD scan_ssid=1 for hidden essids
		Connect to wpa, wep, and open

	Questions:
		1) What to use iwconfig for vs iw
		2) Check card speed
		3) Configure DNS /etc/resolv.conf

	resources:
		https://linuxcommando.blogspot.com/2013/10/how-to-connect-to-wpawpa2-wifi-network.html
*/

//scan results
function get_wifi_networks( $interface, $verbose=null ){

	$failed_tries = 0;

	//check if interface is in monitor mode
	$r = sys_com( "iw $interface scan");

	//check if failed due to busy device
	if( strpos($r,"Device or resource busy (-16)") !== false ){
		echo "BUSY";
		exit;
		//NOT USED right now, should use the failed_tries eventually
	}

	$results = explode("\n", $r );
	$ssid_list = array();

	//parse ssids
	foreach( $results as $line ){
		if( strpos($line,"SSID:") !== false ){
			$ssid = substr($line,6);
			$ssid = trim( $ssid );
			if( $verbose != null ){
				echo "\033[36m$ssid\033[0m \n";
			}

			array_push($ssid_list,$ssid);
		} else {
			if( $verbose != null ){
				echo $line . "\n";
				usleep(500000);
			}
		}
	}

	if( count( $ssid_list ) > 0 ){
		return $ssid_list;
	} else {
		echo "[!] No essids where found\n";
	}

}

function get_list(){

}

function connection_test(){
	return false;
}

function get_public_ip(){

}

function create_access_point( $interface ){

}


/*
system "bash -c 'wpa_supplicant -Dwext -c <(wpa_passphrase \"#{ssid}\" \"#{pass}\") -B -P #{PIDFILE} -f #{LOG_FILE} -i #{dev} 2>/dev/null'"
*/
function connect_wpa( $interface, $essid ){

	$essid = escapeshellarg( $essid );
	$command = "wpa_passphrase $essid";

	echo "Enter the password for $essid: \n";

	//generate supplicant conf data
	$conf_data = shell_exec( $command );
	$valid = true;
	foreach( $conf_data as $line ){
		if( strpos( $conf_data, "Passphrase must be 8..63 characters" ) !== false ){
			$valid = false;
		}
	}

	if( $valid ){

		echo "Provided valid password, writing to file.\n";
		//write to tmp supplicate file
		$file = "/tmp/wpa_supplicant.conf";
		$handle = fopen($file, 'w') or die('Cannot open file:  '.$file);
		fwrite($handle, $conf_data);

		//write to screen
		echo "Writing this config data to \"$file\"\n$conf_data";
	}

	echo "executing wpa_supplicant background daemon with default driver\n";
	$sup_command = "sudo wpa_supplicant -B -i $interface -c $file";

	echo sys_com($sup_command);
	sleep(4);
	echo "Sleeping...";
	echo "[+] Checking link status\n";
	echo sys_com("iw $interface link");

	//if the link status is good, assign an ip with dhcp
	echo sys_com("sudo dhclient $interface -v");
	echo sys_com("ip addr show $interface");
}

//list wireless devices
function get_wireless_devices(){
	if( bin_exist("iw") ){
		echo "[+] Use the iw command to get information about wireless devices.\n";
		$results = sys_com("iw dev");

		//parse interface names
		$interfaces = array();
		$arr = explode( "\n", $results );
		foreach( $arr as $line ){
			//print "$line\n";
			if( strpos( $line, "Interface" ) !== false ){
				array_push( $interfaces, explode(" ",$line)[1] );
			}
		}
		// what if there are no interfaces
		if( count( $interfaces ) > 0 ){
			return $interfaces;
		}

	} else {

		die("[!] iw binary does not exist");
	}
}

function bin_exist($bin){

	if( $bin == null ){
		return false;
	}
	
	$results = exec("which " . escapeshellarg($bin) );

	if( $results != "" && file_exists($results)  ){
		return true;
	} else {
		return false;
	}
}

function sys_com($command){

	$safe_command = escapeshellcmd( $command );

	//print command on one line in color cyan 
	echo "\033[36m$safe_command\033[0m \n";

	//why does the escaped command not working
	return shell_exec( $safe_command );
}

//---------------------------------------------------------------------------
//    				MAIN
//---------------------------------------------------------------------------

//check for command line arguments
//echo var_dump( $argv ) . "\n";

$intface = ( count($argv) >= 2 ) ? $argv[1] : null;
$essid = ( count($argv) >= 3 ) ? $argv[2] : null;

// Using iw dev to find out the wireless deice name
$interfaces = get_wireless_devices();

//check if user supplied interface via cli
if( count( $interfaces ) > 0 ){
	echo "[+] There are " . count( $interfaces ) . " wireless interfaces.\n";
	for( $i = 0; $i < count( $interfaces ); $i++ ){

		//if interface is supplied by cli, mark it in the list
		echo ($i+1) . ") " . $interfaces[$i] .
			(($intface != null && $intface == $interfaces[$i]) ? "( Selected )" : null) .
			"\n";
	}

	if( $intface == null ){

		//request the user to pick one from the list if not supplied
		$sel = readline("Select an interface: ");
		$sel = trim($sel);

		if( $sel != null && $sel > 0 && $sel <= count( $interfaces ) ){
			echo sys_com("iw " . $interfaces[$sel-1] . " info" );
			$intface = $interfaces[$sel-1];
		}
	}

	//when essid is empty scan for networks
	if( $essid == null ){
		echo "[+] $intface is scanning...\n";
		$networks = get_wifi_networks($intface);
		for( $i = 0; $i < count( $networks ); $i++ ){

			//if essid is supplied by cli, mark it in the list
			echo ($i+1) . ") " . $networks[$i] .
				(($essid != null && $essid == $networks[$i]) ? "( Selected )" : null) .
				"\n";
		}

		$sel = readline("Select an essid: ");
                $sel = trim($sel);

                if( $sel != null && $sel > 0 && $sel <= count( $networks ) ){
                        $essid = $networks[$sel-1];
                }
	}
}

connect_wpa($intface, $essid);

echo "\n\nDone\n";

?>
