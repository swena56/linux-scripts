#!/usr/bin/perl
# Script to emulate a browser for posting to a 
#   CGI program with method="POST".

# Specify the URL of the page to post to.
my $store_id = "1951";
my $URLtoPostTo = "https://pwr.dominos.com/PWR/RealTimeOrderDetail.aspx?PrintMode=true&FilterCode=sr_${store_id}&FilterDesc=Store-${store_id}";
$URLtoPostTo = "https://pwr.dominos.com/PWR/RealTimeOrderDetail.aspx?FilterCode=sr_${store_id}&FilterDesc=Store-${store_id}";

$URLtoPostTo = "https://pwr.dominos.com/PWR/Login.aspx";

print $URLtoPostTo . "\n";

# Specify the information to post, the form field name on 
#   the left of the => symbol and the value on the right.
my %Fields = (
   "txtUsername" => "Buesinj",
   "txtPassword" => "Dominos\@1951",
);
# As seen above, "@" must be escaped when quoted.

# If you want to specify a browser name, 
#   do so between the quotation marks. 
#   Otherwise, nothing between the quotes.
my $BrowserName = "PWR Sync";

# It's a good habit to always use the strict module.
use strict;

# Modules with routines for making the browser.
use LWP::UserAgent;
use HTTP::Request::Common;

# Create the browser that will post the information.
my $Browser = new LWP::UserAgent;

# Insert the browser name, if specified.
if($BrowserName) { $Browser->agent($BrowserName); }

# Post the information to the CGI program.
my $Page = $Browser->request(POST $URLtoPostTo,\%Fields);

# Print the returned page (or an error message).
print "Content-type: text/html\n\n";
if ($Page->is_success) { 
	print $Page->content; 
}
else { 
	print $Page->message; 
	print $Page->content; 
}

print "Done\n";
# end of script

