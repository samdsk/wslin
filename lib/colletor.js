const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');

const {AppLog, sleep, CreateLink} = require('./utils.js');
const DetailsCollector = require('./details.js');

const LIMIT = 3;

const Collector = async (role,location) => {
    puppeteer.use(stealthPlugin())

    const LINK = CreateLink(role,location)

    const browser = await puppeteer.launch({
        headless:false,        
    });

    const page = await browser.newPage();

    await page.goto(LINK, {timeout: 60000, waitUntil: 'domcontentloaded'}) 

    sleep(5000)

    const jobs = await page.$$('ul.jobs-search__results-list li')

    AppLog("Found "+jobs.length+" links")   

    const results = []
    let count = 0;

    for(const job  of jobs){        
        if(count >= LIMIT) break;
        try {

            const details_page_link = await page.evaluate(e => e.querySelector('a.base-card__full-link').href,job) || null
            
            AppLog("Extracted link "+details_page_link)

            if(details_page_link){
                const result = await DetailsCollector(details_page_link, browser)
                results.push(result)
            }
            
            await sleep(5000)
            
        } catch (err) {
            console.error(err);
        } 

        count++;
    }

    AppLog("Closing browser");
    // await browser.close();

    AppLog("Generated "+results.length+" results")

    return results
}

module.exports = Collector