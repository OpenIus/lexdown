#!/bin/bash
function loop() {
  current_dir="$1"
  base_dir="$2"
    for element in "$current_dir"/*
    do
        if [ -d "$element" ]; then
            loop "$element" "$base_dir"
        elif [ -e "$element" ]; then
            echo $element
            # foo=${i#$prefix}
            # foo=${foo%$suffix}
            subpath=${element#$base_dir}
            echo $subpath
            # wkhtmltopdf tst.html test.pdf
            # pandoc  -s -smart tst.html -o test.pdf
        else
            echo "$element"" - Folder Empty"
        fi
    done
}



loop "$PWD" "$PWD"


# for file in */ ; do 
#   if [[ -d "$file" && ! -L "$file" ]]; then # ignore symlinks and dirs
#     echo "$file is a directory"; 
#   fi; 
# done
