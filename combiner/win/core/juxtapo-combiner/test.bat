del test /s/q
md test
del test\*.js
copy *.js test\
bin\Debug\juxtapo-combiner -root:"test\" -vars:JUXTAPO_VERSION=0.7;VARTWO=blah
REM bin\Debug\juxtapo-combiner "test\"
pause