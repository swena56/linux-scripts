#!/usr/bin/perl

use strict;
use warnings;

use WWW::Scripter;
use Data::Dumper;

my $w = new WWW::Scripter;

$w->use_plugin('JavaScript');
#$w->use_plugin('Ajax');  # packaged separately
  
$w->get('https://pwr.dominos.com/PWR/Login.aspx');
#$w->eval(' alert("Hello from JavaScript") ');

#print Dumper($w->document->getElementsByTagName('div'));

print $w->content;

 
my $filename = '/var/www/html/index.html';
open(my $fh, '>', $filename) or die "Could not open file '$filename' $!";
print $fh $w->content;
close $fh;
print "done\n";
