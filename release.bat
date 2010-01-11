del release\*.* /Q/S
copy core\*.js release\
copy core\*.css release\
copy core\readme.txt release\
xcopy sample\*.* release\sample\ /e
jsCombiner "C:\Projects\juxtapo\release\"
pause