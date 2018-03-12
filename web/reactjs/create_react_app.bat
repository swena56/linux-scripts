SET mypath=%~dp0
echo %~dp1
echo %mypath%

dir %USERPROFILE%\my-app\src 
dir %mypath%\components

junction %USERPROFILE%\my-app\src\components %mypath%\components
#mklink /d %USERPROFILE%\my-app\src\components %mypath%\components
explorer %USERPROFILE%\my-app\src
pause
exit
dir


#npx create-react-app my-app
#cd my-app
#npm start
 


# symbolic links for windows
mklink /D %USERPROFILE%\my-app\src\components %mypath%\components