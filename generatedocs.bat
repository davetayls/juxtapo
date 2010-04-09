@echo *
@echo **** generating docs ****
@echo *
java -jar tools\jsdoc-toolkit\jsrun.jar tools\jsdoc-toolkit\app\run.js -d=release\docs\ -a -t=tools\jsdoc-toolkit\templates\jsdoc release\core\juxtapo.dev.js
pause