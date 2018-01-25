#!/usr/bin/perl
# Script to reflect the information POSTed to it.

# It's a good habit to always use the strict module.
use strict;

# Put the information sent to the script 
#   into the variable $queryString
my $queryString = '';
read(STDIN,$queryString,$ENV{CONTENT_LENGTH});

# Start the web page.
print "Content-type: text/html\n\n<html><body><pre>";

# Split the variable $queryString into name-value 
#   pairs and print each pair.
for( split(/&/,$queryString) )
{
   $_ =~ tr/+/ /;
   my ($n,$v) = split(/=/,$_,2);
   $n =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C",hex($1))/eg;
   $v =~ s/%([a-fA-F0-9][a-fA-F0-9])/pack("C",hex($1))/eg;
   print "$n=$v\n";
}

# End the web page.
print '</pre></body></html>';

# end of script
