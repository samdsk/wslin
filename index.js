const fs = require('fs');
const Collector = require('./lib/colletor');
const { AppLog } = require('./lib/utils');

const main = async () => {
    AppLog('Starting...')

    const results = await Collector()

    const json = JSON.stringify(results)

    try {
        AppLog("Writing results to file 'results.json'")

        fs.writeFileSync('results.json',json)
        fs.close()
        
    } catch (err) {
        console.error(err);
    }
}

main()