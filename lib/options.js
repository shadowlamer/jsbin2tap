const argv = require('minimist')(process.argv.slice(2));
const options = [
    {
        description: 'output TAP file',
        long: 'output',
        short: 'o',
        default: 'out.tap'
    },
    {
        description: 'start address of binary file',
        long: 'address',
        short: 'a',
        default: 32768
    },
    {
        description: 'append tap at end of file',
        long: 'append',
        short: 'p',
        default: false
    },
    {
        description: 'print usage information',
        long: 'help',
        short: 'h',
        default: false
    },
    {
        description: 'print version information',
        long: 'version',
        short: 'v',
        default: false
    }
]

class Options {
    constructor() {
        this.options = options;
    }

    get(long) {
        const option = options.find( option => (option.long === long));
        return (undefined !== option) ? (argv[option.short] || argv[option.long] || option.default) : undefined;
    }

    getInput() {
        return argv['_'];
    }

    info() {
        console.log('Options:')
        options.forEach(option => {
            console.log(`\t-${option.short.padEnd(2)}| --${option.long.padEnd(20)}\t${option.description} [${option.default}]`);
        })
    }
}

module.exports = new Options();