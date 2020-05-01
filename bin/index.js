#!/usr/bin/env node

const fs = require('fs');
const options = require('../lib/options');
const tape = require('../lib/tape');
const pjson = require('../package.json');

const VERSION = `${pjson.name} ${pjson.version}`;

if (options.get('version')) {
    showVersion();
    process.exit(0);
}

if (options.get('help') || 0 === options.getInput().length) {
    showUsage();
    process.exit(0);
}

const outputFileName = options.get('output');
const outputFile = fs.openSync(outputFileName, options.get('append')?'a+':'w')
const blockName = outputFileName.split('.')[0];

const inputFileName = options.getInput()[0];
const inputFile = fs.openSync(inputFileName, 'r');

const startAddress = options.get('address');

const readBuf = Buffer.alloc(tape.getAvailable());
const numBytesRead = fs.readSync(inputFile, readBuf, 0, readBuf.length, 0);
const buf = Buffer.alloc(numBytesRead);
readBuf.copy(buf, 0, 0, numBytesRead);
tape.writeBytesBlock(buf, blockName, startAddress);

fs.writeSync(outputFile, tape.getBuffer());

fs.closeSync(inputFile);
fs.closeSync(outputFile);

function showVersion () {
    console.log(VERSION);
}

function showUsage () {
    showVersion();
    console.log(`Usage: npm start -- [options] file.bin`);
    options.info();
}
