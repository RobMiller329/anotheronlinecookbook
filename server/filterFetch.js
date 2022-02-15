let processFilter = {};

processFilter = (urlString) =>
{
    const urlArray = urlString.split("&");
    let statementArray = ['%', '%', '%', '%', '%'];

    for(let i = 0; i < urlArray.length; i++)
    {
        if(urlArray[i].startsWith("name"))
        {
            statementArray[0] = '%' + urlArray[i].substr(5) + '%';
        }

        if(urlArray[i].startsWith("protein"))
        {
            statementArray[1] = '%' + urlArray[i].substr(8) + '%';
        }

        if(urlArray[i].startsWith("cuisine"))
        {
            statementArray[2] = '%' + urlArray[i].substr(8) + '%';
        }

        if(urlArray[i].startsWith("source"))
        {
            statementArray[3] = '%' + urlArray[i].substr(7) + '%';
        }

        if(urlArray[i].startsWith("author"))
        {
            statementArray[4] = '%' + urlArray[i].substr(7) + '%';
        }
    }

    return(statementArray);
}

module.exports = processFilter;
