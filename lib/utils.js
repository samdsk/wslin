const AppLog = (message) => {
    const prefix = "### APP -"
    const time = `[${(new Date()).toLocaleTimeString()}]`
    console.log(prefix,time,':',message);
}

const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

const CreateLink = (role, location) => {
    return`https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`
}

module.exports = {AppLog,sleep,CreateLink}
