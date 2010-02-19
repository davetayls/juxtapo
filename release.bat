@echo off

@echo *
@echo **** removing old release ****
@echo *
del release\*.* /Q/S

@echo *
@echo **** copying core files ****
@echo *
xcopy core\*.js release\core\ /e
xcopy core\*.css release\core\ /e
xcopy core\*.jpg release\core\ /e
xcopy core\*.png release\core\ /e
xcopy core\*.gif release\core\ /e

@echo *
@echo **** copying readme and lib files ****
@echo *
copy readme.txt release\
copy release-notes.txt release\
xcopy lib\*.* release\lib\ /e

@echo *
@echo **** copying sample ****
@echo *
xcopy sample\*.* release\sample\ /e

@echo *
@echo **** copying plugins ****
@echo *
xcopy plugins\*.* release\plugins\ /e

@echo *
@echo **** combining javascript core ****
@echo *
C:\Projects\juxtapo-0.4\combiner\win\commandline\jsCombiner "C:\Projects\juxtapo-0.4\release\core\"
copy release\core\juxtapo.js release\core\juxtapo.dev.js

@echo *
@echo **** generating docs ****
@echo *
java -jar tools\jsdoc-toolkit\jsrun.jar tools\jsdoc-toolkit\app\run.js -d=release\docs\ -a -t=tools\jsdoc-toolkit\templates\jsdoc release\core\juxtapo.js

@echo *
@echo **** building compiled js ****
@echo *
java -jar tools\compiler\compiler.jar --js=release\core\juxtapo.js --js_output_file=release\core\juxtapo.comp.js

@echo *
@echo **** combining javascript compiled ****
@echo *
copy tools\juxtapo.compiled.js release\core\juxtapo.js
copy core\juxtapo_headcomment.js release\core\
C:\Projects\juxtapo-0.4\combiner\win\commandline\jsCombiner "C:\Projects\juxtapo-0.4\release\core\"


pause