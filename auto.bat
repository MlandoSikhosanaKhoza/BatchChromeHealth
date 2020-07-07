@echo off
color a

:editClient
echo Welcome to Momentum health
echo ________________________________________

echo Please type the following options:
:begin
echo ----------------------------------------
echo N: New client
echo X: Exit momentum
set /p Inp="Enter value here: "
IF "%Inp%" == "N" (
	echo New client
	Goto newClient
)
IF "%Inp%" == "E" (
	echo Edit client details
	Goto editClient
)
IF "%Inp%" == "X" (
	echo =====================================
	echo Exiting momentum
	Sleep 3
	Goto exitMomentum
) ELSE (
	Goto begin
)



:newClient
echo _________________________________________
SET /p C_NAME="Enter the client name: "
SET /p C_SURNAME="Enter the client surname: "
SET /p C_ID="Enter the client ID: "
SET /p C_MOBILE="Enter the clients mobile number: "
SET /p C_ADDRESS="Enter the clients address: "
SET /p C_EYE="Does the client where glasses?(Y/ N or other): "
SET /p C_CHRONIC="Does the client have a chronic condition?( Y/ N or other): "
SET /p C_WHEELCHAIR="Does the client go on a wheelchair?(Y / N or other ): "
echo ,{ "Name" : "%C_NAME%", "Surname" : "%C_SURNAME%", "ID": "%C_ID%", "mobile":"%C_MOBILE%", "address": "%C_ADDRESS%", "eye":"%C_EYE%", "chronic": "%C_CHRONIC%", "wheelchair":"%C_WHEELCHAIR%" } >> JSON.txt
Goto begin
:exitMomentum