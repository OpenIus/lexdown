#!/bin/bash
function loop() { 
    for i in "$1"/*
    do
        if [ -d "$i" ]; then
            loop "$i"
        elif [ -e "$i" ]; then
            echo $i
            # wkhtmltopdf tst.html test.pdf
            # pandoc  -s -smart tst.html -o test.pdf
        else
            echo "$i"" - Folder Empty"
        fi
    done
}

loop "$PWD"
