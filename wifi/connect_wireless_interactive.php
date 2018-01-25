<?php

//scan results
function detect_wifi_networks( $interface ){

	//check if interface is in monitor mode
	echo sys_com( "iw $intface scan");

}

function get_list(){

}

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

	echo "executing wpa_supplicant with default driver\n";
	$sup_command = "sudo wpa_supplicant -B -i $interface -c $file";

	echo sys_com($sup_command);

	echo "[+] Checking link status\n";
	echo sys_com("iw $interface link");

	//if the link status is good, assign an ip with dhcp
	echo system("sudo dhclient $interface");

	echo system("ip addr show wlan0");
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
			print "$line\n";
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


// Using iw dev to find out the wireless deice name
$interfaces = get_wireless_devices();

if( count( $interfaces ) > 0 ){
	echo "[+] There are " . count( $interfaces ) . " wireless interfaces\n\n";

	echo "[+] Looping over each interface \n";
	foreach( $interfaces as $intface ){

		sleep( 2 );
		$out = sys_com( "iw $intface scan");
	}
}


//test connect_wpa
$essid = "Swenson52";
connect_wpa("wlan0", $essid);



echo "\n\nDone\n";

?>
