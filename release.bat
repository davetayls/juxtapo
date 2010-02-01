del release\*.* /Q/S
xcopy core\*.js release\core\ /e
xcopy core\*.css release\core\ /e
copy readme.txt release\
xcopy lib\*.* release\lib\ /e
xcopy sample\*.* release\sample\ /e
jsCombiner "C:\Projects\juxtapo-0.4\release\core\"

xcopy plugins\*.* release\plugins\ /e

pause