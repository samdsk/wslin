const fs = require('fs');
const Collector = require('./lib/colletor');
const { AppLog } = require('./lib/utils');

const main = async () => {
    AppLog('Starting...')

    try {
        const results = await Collector("data scientist", "italy")

        const json = JSON.stringify(results)
    
        AppLog("Writing results to file 'results.json'")

        fs.writeFileSync('results.json',json)
        
    } catch (err) {
        console.error(err);
    }
}

main()