#!/bin/bash
function loop() {
  original="$2"
    for i in "$1"/*
    do
        if [ -d "$i" ]; then
            loop "$i" "$2"
        elif [ -e "$i" ]; then
            echo $i
            # foo=${i#$prefix}
            # foo=${foo%$suffix}
            # echo $original
            tmp=${i#$original}
            echo $tmp
            # wkhtmltopdf tst.html test.pdf
            # pandoc  -s -smart tst.html -o test.pdf
        else
            echo "$i"" - Folder Empty"
        fi
    done
}

loop "$PWD" "$PWD"


# for file in */ ; do 
#   if [[ -d "$file" && ! -L "$file" ]]; then # ignore symlinks and dirs
#     echo "$file is a directory"; 
#   fi; 
# done
