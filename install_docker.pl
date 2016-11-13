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

        print "\n[+] Install Docker as Swarm ( client or manager )?\n";
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

        if ( $input == "1" ){

                install_docker();
                $not_done = 1;

        } elsif ( $input == "2" ) {

                $not_done = 0;
        } elsif ( $input == "3" ) {
                learn_docker();
        } elsif ( $input == "q" ) {

        } else {

        }
        #       print "\n[+] Installing Docker as Swarm Client";

}

print "\nDone";

#################### functions ####################

sub get_system_info {

        ## Keep this executing linearly

        ## returns string, and hash of data
        my $OS = `uname -s`;
        my $arch = `uname -m`;
        my $docker_loc = `which docker`;
        my $docker_installed = ( $docker_loc =~ m/docker/ ) ? 1 : 0;

        ## needs dig
        my $public_ip = `dig +short myip.opendns.com \@resolver1.opendns.com`;
        ## error code for this?

        my $output = "\n[+] System Information \n";
        $output .= "\n   - OS: $OS ";
        $output .= "  - Arch: $arch";
        $output .= "   - Public IP: $public_ip";

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

                #$output .= "\n   - docker-machine: ";
                print "docker-machine installed";
        }

        return { log => $output, OS => $OS, arch => $arch };
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


        my $extras = `apt-get install -y linux-image-extra-\$(uname -r) linux-image-extra-virtual curl virtualbox`;
        ## TODO low - check if successful
        ## unable to locate docker-engine?
        print $extras;

        my $docker_engine = `apt-get install -y docker-engine`;
        print $docker_engine;

        ## add ssl parameter to curl TODO
        my $docker_curl = `curl https://get.docker.com/ | sh;`;
        print $docker_curl;

        if( $docker_curl =~ m/dpkg/ ) {
           my $run = `sudo dpkg --configure -a`;
           print $run;
        }

        #print `apt-cache policy docker-engine`;
        #print `apt-get install docker-engine`;


        ## add user
        print `sudo usermod -aG docker \$USER`;

        ## failed

        ## Install docker-machine

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
        
	=head RESOURCES
                https://www.docker.com/products/docker-swarm#/overview
                https://www.upcloud.com/support/how-to-configure-docker-swarm/
=cut

1;

