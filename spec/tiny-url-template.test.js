import TinyUrlTemplate from '../src/TinyUrlTemplate.js';

describe('TinyUrlTemplateTemplate', () => {

  it('should not expand a path variable if paramters are not provided', () => {
    let url = 'https://beta.familysearch.org/indexing-service/workflow/batches/user/{?userid}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand().toString()).toEqual('https://beta.familysearch.org/indexing-service/workflow/batches/user');
  });

  it('should not expand a path variable if paramters are not provided', () => {
    let url = 'https://boo.com{?includeuser,redirect}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand().toString()).toEqual('https://boo.com');
  });

  it('should expand a path variable', () => {
    let url = 'https://beta.familysearch.org/indexing-service/workflow/batches/user/{userid}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand({userid: 'robhicks'}).toString()).toEqual('https://beta.familysearch.org/indexing-service/workflow/batches/user/robhicks');
  });

  it('should expand several path variables', () => {
    let url = 'https://beta.familysearch.org/indexing-service/workflow/project/{projectid}/batches/user/{userid}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand({projectid: '123435555555', userid: 'robhicks'}).toString())
      .toEqual('https://beta.familysearch.org/indexing-service/workflow/project/123435555555/batches/user/robhicks');
  });

  it('should expand a query parameter variable', () => {
    let url = 'https://beta.familysearch.org/indexing-service/projects/list{?userid}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand({userid: 'robhicks'}).toString()).toEqual('https://beta.familysearch.org/indexing-service/projects/list?userid=robhicks');
  });

  it('should expand a number of query parameter variables', () => {
    let url = 'https://beta.familysearch.org/indexing-service/projects/list{?userid,name,age}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand({age: 29, name: 'Rob', userid: 'robhicks'}).toString())
      .toEqual('https://beta.familysearch.org/indexing-service/projects/list?userid=robhicks&name=Rob&age=29');
  });

  it('should expand a template', () => {
    let url = 'https://app.quotemedia.com/quotetools/getHistoryDownload.csv{?webmasterId,startDay,startMonth,startYear,endDay,endMonth,endYear,isRanged,symbol}';
    let template = new TinyUrlTemplate(url);

    expect(template.expand({
      webmasterId: 500,
      startDay: '01',
      startMonth: '01',
      startYear: 2017,
      endDay: 31,
      endMonth: '06',
      endYear: 2017,
      isRanged: false,
      symbol: 'aapl'
    }).toString()).toEqual('https://app.quotemedia.com/quotetools/getHistoryDownload.csv?webmasterId=500&startDay=01&startMonth=01&startYear=2017&endDay=31&endMonth=06&endYear=2017&isRanged=false&symbol=aapl');
  });

});
