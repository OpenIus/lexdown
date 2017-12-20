#!/bin/bash
mkdir -p html
node ./bin/parser.js ./examples/rul/bge.lexdown > html/bundesgerichtsentscheid.html

mkdir -p docx
pandoc  -s -smart html/bundesgerichtsentscheid.html -o docx/bundesgerichtsentscheid.docx

mkdir -p pdf
wkhtmltopdf html/bundesgerichtsentscheid.html pdf/bundesgerichtsentscheid.pdf
