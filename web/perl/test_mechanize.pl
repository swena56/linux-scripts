#!/usr/bin/perl
 
use WWW::Mechanize::Firefox;
my $mech = WWW::Mechanize::Firefox->new();
$mech->get('http://google.com');

$mech->eval_in_page('alert("Hello Firefox")');
my $png = $mech->content_as_png();

print $png;
exit;


my $filename = '/var/www/html/index.html';
open(my $fh, '>', $filename) or die "Could not open file '$filename' $!";
print $fh $w->content;
close $fh;
print "done\n";


