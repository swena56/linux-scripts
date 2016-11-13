#!/usr/bin/perl

use strict;
use warnings;

###################### Main ######################

my $not_done = 1;
my $invalid_input = 0;
my $title = " ####### Docker Installation Toolkit ####### \n";
my $sys_info = "none";

while( $not_done ){

        system 'clear';

        print $title;
        $sys_info = get_system_info();
        print $sys_info->{log};

        print "\n  1) Install Docker ";
        print "\n  2) Install Docker tab-complete [ unimplemented ] ";
        # start and stop docker
        # uninstall docker

        print "\n  3) Learn docker ";   # make this not show up if its not installed
        print "\n  4) Setup Swarm Client";
        print "\n  5) Setup Swarm Manager";
        print "\n  6) Send Job";
        print "\n  0) quit";
        print "\n\nSelection: ";

        my $input = <STDIN>;
	

	if( !$sys_info->{is_docker_installed} ) {
                install_docker();
	}

        if ( $input == "1" ){
		
                install_docker();

                $not_done = 1;

        } elsif ( $input == "2" ) {
		install_docker_tab_complete();
                $not_done = 0;
        } elsif ( $input == "3" ) {
                learn_docker();
        } elsif ( $input == "q" || $input == "0" ) {
		$not_done = 0;
        } else {

        }
        #       print "\n[+] Installing Docker as Swarm Client";

}

print "\nDone\n";

#################### functions ####################

sub get_system_info {

        ## Keep this executing linearly

        ## returns string, and hash of data
        my $OS = `uname -s`;
        my $arch = `uname -m`;
        my $docker_loc = `which docker`;
        my $docker_installed = ( $docker_loc =~ m/docker/ ) ? 1 : 0;
	my $last_run_container = `docker ps -l -q`;
	#docker ps -l -q

        ## needs dig
        my $public_ip = `dig +short myip.opendns.com \@resolver1.opendns.com`;
        ## error code for this?

        my $output = "\n[+] System Information \n";
        $output .= "\n   - OS: $OS ";
        $output .= "  - Arch: $arch";
        $output .= "   - Public IP: $public_ip";
	
	#is tab complete installed?

        if( $docker_installed ){

                my $docker_version =  `docker -v`;
                my $init_docker = `/etc/init.d/docker status`;
                my $service_docker = `service docker status`;

                #* Docker is managed via upstart, try using service docker
                #start/running
                $output .= "   - $docker_version";
                $output .= "   - $docker_loc";
                $output .= "   - Status: " . $service_docker if ( $service_docker =~ m/running/ );

        } else {

           $output .= "\n   Docker not found! ";
        }

        ## Is docker-machine installed?
        if( `which docker-machine` =~ m/docker-machine/ ){

                $output .= "   - docker-machine: " . `which docker-machine`;
        }

        return { log => $output, OS => $OS, arch => $arch, is_docker_installed => $docker_installed };
}

sub install_docker {

        my $success = 0;

        print "\n[+] Installing Docker\n";

        print "\nfetching update\n";
        my $apt_update = `apt-get update`;
        print $apt_update;

        if ( $apt_update =~ "Permission denied" ){
            print "Permission denied... sudo?";
        }
        ## check if we need sudo, inform the user to run this as sudo

        my $extras = `apt-get install -y linux-image-extra-\$(uname -r) linux-image-extra-virtual curl virtualbox python-pip`;
        ## TODO low - check if successful
        print $extras;
	`pip install docker-compose`;
        #my $docker_engine = `apt-get install -y docker-engine`;
        #print $docker_engine;

        ## add ssl parameter to curl TODO
        my $docker_curl = `curl https://get.docker.com/ | sh;`;
        print $docker_curl;

        if( $docker_curl =~ m/dpkg/ ) {
           my $run = `sudo dpkg --configure -a`;
           print $run;
        }
	#sudo modprobe aufs
	# /var/lib/docker/aufs might need to be removed
	# may need to reboot after this

        #print `apt-cache policy docker-engine`;
        #print `apt-get install docker-engine`;
	print "Adding tab complete for docker";
	print `curl -L https://raw.githubusercontent.com/docker/compose/\$(docker-compose version --short)/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose`;
        ## add user
        print `sudo usermod -aG docker \$USER`;

	install_additional_tools();
        ## failed

        ## Install docker-machine
	print `sudo groupadd docker`;
	print `sudo usermod -aG docker \$USER`;
        ## create docker local VM
        #`docker-machine create -d virtualbox docker-local-vm`;
        #`eval "$(docker-machine env docker-local-vm)”`
        #eval $(docker-machine env --swarm swarm-master)

        print "\nPress any key to continue";
        my $key = <STDIN>;
}

sub start_docker {

        ## start docker process
        print `/etc/init.d/docker start`;
        print `service docker start`;

        ## start docker daemon
        print `/etc/init.d/docker stop`;
        print `service docker stop`;

        ## verify that it is running
        print `/etc/init.d/docker status`;
        print `service docker status`;

}

sub setup_swarm_manager {}

sub setup_swarm_client {}

sub install_dependencies {

        ## check dependencies

        ## install docker-machine

        ## install virtualbox
}

sub install_docker_tab_complete {
	print "Adding tab complete for docker";
       my $instal =  `curl -L https://raw.githubusercontent.com/docker/compose/\$(docker-compose version --short)/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose`;
	print $instal;
`wget https://raw.githubusercontent.com/docker/docker/master/contrib/completion/bash/docker -O ~/.docker-completion.sh`;
`wget https://raw.githubusercontent.com/docker/compose/$(docker-compose --version | awk 'NR==1{print \$NF}')/contrib/completion/bash/docker-compose -O ~/.docker-compose-completion.sh`;
`wget https://raw.githubusercontent.com/docker/machine/master/contrib/completion/bash/docker-machine.bash -O ~/.docker-machine-completion.sh`;

`. ~/.docker-completion.sh`;
`. ~/.docker-machine-completion.sh`;
`. ~/.docker-compose-completion.sh`;
## add to bash_profile
#source ~/.bash_rc

}

sub install_additional_tools {

        ## ranger htop virtualbox
        #curl -L https://raw.githubusercontent.com/docker/compose/$(docker-compose version --short)/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose

        #docker-machine version
        if( `which docker-machine` !~ m/docker-machine/ ){

                my $uname_s = `uname -s`;
                my $uname_m = `uname -m`;
                my $install_docker_machine = `curl -L https://github.com/docker/machine/releases/download/v0.8.2/docker-machine-$uname_s-$uname_m >/usr/local/bin/docker-machine && chmod +x /usr/local/bin/docker-machine`;
                print $install_docker_machine;
                print `which docker-machine`;
                print `ls -lr /usr/local/bin/docker-machine`;
                print `docker-machine version`;
        }
}

sub docker_on_osx {

	`brew install boot2docker`;
	`boot2docker init`;
	`boot2docker up`;
	#brew install python
	#brew install libyaml
	#pip install shyaml


}

=pod

        =head Docker Notes

        docker-machine create -d virtualbox docker-local-vm
        eval "$(docker-machine env docker-local-vm)”

        eval $(docker-machine env --swarm swarm-master)

        rm /var/run/docker.pid

        docker swarm init --advertise-addr IP

        docker info
        docker ps
        docker-compose

        swarm-bench

        Docker AWS

        docker run -d -p 8500:8500 --name=consul progrium/consul -server -bootstrap

	sudo usermod -aG docker $(whoami)

	# use docker.io for older versions of ubuntu
	sudo docker daemon
	apt-get install docker.io 
        
	docker run -d ubuntu /bin/sh -c "while true; do echo hello world; sleep 1; done"
	docker stop `dl`
	docker start `dl`
	docker restart `dl`
	docker attach `dl`
	docker rm `dl`
	docker ps
	docker inspect `dl`
	docker top `dl`

	Port forwarding example from localhost:8080 to port 80 inside boot2docker-vm:

	VBoxManage controlvm boot2docker-vm natpf1 "web,tcp,127.0.0.1,8080,,80"
	When all is ready clone this git repository:

	git clone https://github.com/komljen/dockerfile-examples.git && cd dockerfile-examples

	#docker hashcat
	hihouhou/hashcat
 
	linking a mysql sever to a docker container

# install on ubuntu 14.04
wget -qO- https://get.docker.io/gpg | apt-key add -
echo "deb http://get.docker.io/ubuntu docker main" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get -y install lxc-docker

	=head RESOURCES
                https://www.docker.com/products/docker-swarm#/overview
                https://www.upcloud.com/support/how-to-configure-docker-swarm/
=cut

1;

