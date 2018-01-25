<?php

$username = readline ("Email: ");
$password = readline ("Password: ");

if( $username == null || $password == null ){

	echo "Need valid creds\n";
	exit;
}

$url="https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/&ss=1&scc=1&ltmpl=default&ltmplcache=2"; 
$cookie="cookie.txt"; 

$post_array = array(
    "Email"=>$username,
    "Passwd"=>$password
);

$ch = curl_init(); 
curl_setopt ($ch, CURLOPT_URL, $url); 
curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
curl_setopt ($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6"); 
curl_setopt ($ch, CURLOPT_TIMEOUT, 60); 
curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 0); 
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt ($ch, CURLOPT_COOKIEJAR, $cookie); 
curl_setopt ($ch, CURLOPT_REFERER, $url); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_array);
curl_setopt ($ch, CURLOPT_POST, 1); 
$result = curl_exec ($ch); 
echo $result;  
curl_close($ch);

//requires a document length

?>
