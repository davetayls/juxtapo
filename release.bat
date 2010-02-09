del release\*.* /Q/S
xcopy core\*.js release\core\ /e
xcopy core\*.sdoc release\core\ /e
xcopy core\*.css release\core\ /e
xcopy core\*.jpg release\core\ /e
xcopy core\*.png release\core\ /e
xcopy core\*.gif release\core\ /e
copy readme.txt release\
xcopy lib\*.* release\lib\ /e
xcopy sample\*.* release\sample\ /e
jsCombiner "C:\Projects\juxtapo-0.4\release\core\"

xcopy plugins\*.* release\plugins\ /e

java -jar tools\jsdoc-toolkit\jsrun.jar tools\jsdoc-toolkit\app\run.js -d=release\docs\ -a -t=tools\jsdoc-toolkit\templates\jsdoc release\core\juxtapo.js

pause