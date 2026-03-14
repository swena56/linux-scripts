## Download Openssh
# powershell script

if (-Not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')) {
 if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000) {
  $CommandLine = "-File `"" + $MyInvocation.MyCommand.Path + "`" " + $MyInvocation.UnboundArguments
  Start-Process -FilePath PowerShell.exe -Verb Runas -ArgumentList $CommandLine
  Exit
 }
}

set-executionpolicy remotesigned

$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if( !($currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) ){
	Write-Warning "Not Running as admin"
	Start-Sleep -Seconds 10
	exit
}

$url = "https://github.com/PowerShell/Win32-OpenSSH/releases/download/v7.6.1.0p1-Beta/OpenSSH-Win64.zip"

$start_time = Get-Date
$output = "OpenSSH-Win64.zip"
$AllProtocols = [System.Net.SecurityProtocolType]'Ssl3,Tls,Tls11,Tls12'
[System.Net.ServicePointManager]::SecurityProtocol = $AllProtocols

$CurrentProgressPref = $ProgressPreference;
$ProgressPreference = "SilentlyContinue";
Invoke-WebRequest -Uri $url -OutFile $output
$ProgressPreference = $CurrentProgressPref;

Write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"

# verify file existence
Start-Sleep -Seconds 1.5

if( !(Test-Path $output -PathType Leaf) ){
	Write-Warning "$output does not exist"
	exit
}

## Extract Zip
Expand-Archive "OpenSSH-Win64.zip" -DestinationPath "C:\Program Files\"

## rename folder
$localPath = "C:\Program Files\OpenSSH-Win64"

#create new path name with timestamp
$newpath ="OpenSSH" -f $localPath, (Get-Date).AddDays(-1)

#rename old dir if exist and recreate localpath
Rename-Item -path $localpath -newName $newpath -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $localPath

del $localPath

cd "C:\Program Files\OpenSSH"

## create fire wall exception
$doesRuleExist = Get-NetFirewallPortFilter | Where Localport -match 22 | Get-NetFirewallRule | % Displayname
if( $doesRuleExist -eq $null ){
	New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
	Write-Warning "Created Firewall rule for sshd"
}

## install openssh
Get-ExecutionPolicy
Set-ExecutionPolicy unrestricted
./install-sshd.ps1

## startup set to automatic
Set-Service sshd -StartupType Automatic
Set-Service ssh-agent -StartupType Automatic

net start sshd
