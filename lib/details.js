const {AppLog,sleep} = require('./utils.js')

const DetailsCollector = async (LINK, browser) => {
    const result = {
        link : "",
        title : "",
        company : "",
        details : ""
    }

    const page = await browser.newPage();
    await page.goto(LINK, {timeout: 60000, waitUntil: 'domcontentloaded'})

    result.link = LINK

    try{
        const details_section = await page.$('div.details')
        

        if(details_section){
            AppLog("Details section found")

            const title = await page.evaluate(e => e.querySelector('h1.top-card-layout__title').textContent,details_section) || null
            const company = await page.evaluate(e => e.querySelector('.topcard__org-name-link').textContent,details_section) || null
            const details = await page.$$('.description__text .show-more-less-html__markup p')

            AppLog("Found "+details.length+" details")
            let collected_details = ""
            
            for(const detail of details){                           
                let temp = await page.evaluate(e => e.textContent,detail)

                if(temp)
                    collected_details += "\n"+temp
            }
        
            AppLog("Link "+LINK)
            AppLog("Title "+title)
            AppLog("Company "+company)

            
            result.title = title.replace(/\s\s+/g, ' ').trim()
            result.company = company.replace(/\s\s+/g, ' ').trim()
            result.details = collected_details.replace(/\s\s+/g, ' ').trim()

        }

    }catch(err){
        console.error(err);
    }

    await sleep(5000)
    AppLog("Closing page");
    // await page.close();

    return result
}

module.exports = DetailsCollector

