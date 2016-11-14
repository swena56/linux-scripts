import nmap		#pip install nmap
import socket
import os
import sys
import subprocess
import readchar		#pip install readchar
import functools

#https://docs.python.org/2/library/functions.html

## is nmap installed
try:
    nm = nmap.PortScanner()
except nmap.PortScannerError:
    print('Nmap not found', sys.exc_info()[0])
    sys.exit(0)
except:
    print("Unexpected error:", sys.exc_info()[0])
    sys.exit(0)

## function scan_ip -> parameter1="ip address"
def scan_ip( scan_me=None ):
	os.system('clear');
	if( scan_me == None ):
	        scan_me = raw_input("ip: ")
	
	print "Presets"
	print "1) undefined"
	print "2) undefined"
	sel = raw_input("Selection:")
	print "Scanning " + scan_me 
	nm.scan( scan_me )
	#nm.scaninfo()
	for host in nm.all_hosts():
    	    print('----------------------------------------------------')
	    print('Host : %s (%s)' % (host, nm[host].hostname()))
	    print('State : %s' % nm[host].state())

	for proto in nm[host].all_protocols():
	    print('----------')
       	    print('Protocol : %s' % proto)

        lport = list(nm[host][proto].keys())
        lport.sort()
        for port in lport:
            print('port : %s\tstate : %s' % (port, nm[host][proto][port]['state']))
	print('----------------------------------------------------')
	#print nm.all_hosts()
	raw_input( "Press any key to continue" )

## get ip address of all interfaces
def get_interfaces():
    file=os.popen("ifconfig | grep 'addr:'")
    data=file.read()
    file.close()
    bits=data.strip().split('\n')
    addresses=[]
    for bit in bits:
        if bit.strip().startswith("inet "):
            other_bits=bit.replace(':', ' ').strip().split(' ')
            for obit in other_bits:
                if (obit.count('.')==3):
                    if not obit.startswith("127."):
                        addresses.append(obit)
                    break
    return addresses

## main loop
title = "Insert Title Here"
still_running = 1
while( still_running ):

	os.system('clear');
	print "------------------------------------------------------"
	print "             " + title
	print "------------------------------------------------------"
	print( "Kernel: ", str( os.system( 'uname -r' ) ) )
	#public_ip =  str( os.system( 'dig +short myip.opendns.com @resolver1.opendns.com' ) )
	print str( os.system( 'dig +short myip.opendns.com @resolver1.opendns.com' ) )
	print "Local IP(s): "
	for port in get_interfaces():
		print " " + port
	print
	print "OS:" +  str( os.system('uname -o') )
	print "------------------------------------------------------"
	print
	print " 1) scan ip"
	print " 2) scan random"
	print " q) quit"
	print
	print " -write scan to file"
	print
	print "Select an option:"
	print "------------------------------------------------------"
	wait_key = readchar.readchar()

	## keys the user can push
	if ( wait_key == "q" or wait_key == "\x03" or wait_key == "\x04" or wait_key == "\x1a"  ):
		still_running = 0
	if ( wait_key == "1" ):
		scan_ip()
	if ( wait_key == "3" ):
		ping()



def get_data():
	print "data";


## functions
def local_scan():
	nm.scan('127.0.0.1', '22-443')      # scan host 127.0.0.1, ports from 22 to 443
	nm.command_line()                   # get command line used for the scan : nmap -oX - -p 22-443 127.0.0.1
	nm.scaninfo()                       # get nmap scan informations {'tcp': {'services': '22-443', 'method': 'connect'}}
	nm.all_hosts()                      # get all hosts that were scanned
	nm['127.0.0.1'].hostname()          # get hostname for host 127.0.0.1
	nm['127.0.0.1'].state()             # get state of host 127.0.0.1 (up|down|unknown|skipped) 
	nm['127.0.0.1'].all_protocols()     # get all scanned protocols ['tcp', 'udp'] in (ip|tcp|udp|sctp)
	if ('tcp' in nm['127.0.0.1']):
	    list(nm['127.0.0.1']['tcp'].keys()) # get all ports for tcp protocol

	nm['127.0.0.1'].all_tcp()           # get all ports for tcp protocol (sorted version)
	nm['127.0.0.1'].all_udp()           # get all ports for udp protocol (sorted version)
	nm['127.0.0.1'].all_ip()            # get all ports for ip protocol (sorted version)
	nm['127.0.0.1'].all_sctp()          # get all ports for sctp protocol (sorted version)
	if nm['127.0.0.1'].has_tcp(22):     # is there any information for port 22/tcp on host 127.0.0.1
	    nm['127.0.0.1']['tcp'][22]          # get infos about port 22 in tcp on host 127.0.0.1
	    nm['127.0.0.1'].tcp(22)             # get infos about port 22 in tcp on host 127.0.0.1
	    nm['127.0.0.1']['tcp'][22]['state'] # get state of port 22/tcp on host 127.0.0.1 (open


	# a more usefull example :
	for host in nm.all_hosts():
	    print('----------------------------------------------------')
	    print('Host : %s (%s)' % (host, nm[host].hostname()))
	    print('State : %s' % nm[host].state())

	for proto in nm[host].all_protocols():
        	print('----------')
	        print('Protocol : %s' % proto)

        	lport = list(nm[host][proto].keys())
	        lport.sort()
        for port in lport:
            print('port : %s\tstate : %s' % (port, nm[host][proto][port]['state']))
	print('----------------------------------------------------')

# If you want to do a pingsweep on network 192.168.1.0/24:
#nm.scan(hosts='192.168.1.0/24', arguments='-n -sP -PE -PA21,23,80,3389')
#hosts_list = [(x, nm[x]['status']['state']) for x in nm.all_hosts()]
#for host, status in hosts_list:
#    print('{0}:{1}'.format(host, status))

#host = raw_input("Host name : ")
#get_ips = socket.gethostbyname(host) #it can get range or single ip
#hosts_list = str(get_ips) #changing it to str 
#Nscanner= nmap.PortScanner() #create a type scanner form nmap library
#Nscanner.scan(hosts= host, arguments='-PE -sn') #this function in the labrary calls nmap t



"""
nm = nmap.PortScanner()
nm.scan('127.0.0.1', '22-443')

nm.scan(hosts='X.X.X.X/24', arguments='-n -sP -PE')

nm = nmap.PortScanner()

hostlist = ' '.join(nm.all_hosts())
nm.scan(hosts=hostlist, arguments='-n -sP -PE')
#nm.command_line()

hostlist = ""
for item in nm.all_hosts():
    hostlist = item + ", " + hostlist
"""
