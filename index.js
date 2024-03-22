const puppeteer = require('puppeteer');
const LINK = ""
//"https://www.linkedin.com/jobs/search/?currentJobId=3839015857&geoId=103330119&keywords=software+engineer&location=Italy"

const puppet = async () => {
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:false,
        userDataDir:"./tmp"
    });

    const page = await browser.newPage();

    await page.goto(LINK)

    const jobs = await page.$$('ul.jobs-search__results-list')

    console.log("len: "+jobs.length)

    for(const job  of jobs){
        const title = await page.evaluate( e => e.querySelector(".job-card-container__link").textContent, job)
        console.log(title);
    }


}

puppet();

// https://www.linkedin.com/jobs/search/?currentJobId=3839015856&geoId=103350119&keywords=software+engineer&location=Italy&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true