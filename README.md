# jsbin2tap

Adds binary data to ZX Spectrum tape files.

### Usage

#### Without installation
```
npm start -- [options] input.bin
```

#### With installation
```
sudo npm install -g jsbin2tap
jsbin2tap [options] input.bin
```

#### As npm module
```
npm install --save jsbin2tap
```
...and then from JS...
```
const fs = require('fs');
const tape = require('jsbin2tap');
...
tape.writeBytesBlock(buf, blockName, startAddress);
fs.writeSync(outputFile, tape.getBuffer());
```