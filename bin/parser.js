#!/usr/local/bin/node

const fs = require('fs')
const parser = require('../')

var filename = process.argv[2]
var contents = fs.readFileSync(filename, { encoding: 'utf8' })

parser(contents, null, (err, contents) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(contents)
})
