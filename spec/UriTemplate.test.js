import UriTemplate from '../src/UriTemplate.js';

describe('UriTemplateTemplate', () => {

  it('should expand a path variable', () => {
    let url = 'https://beta.familysearch.org/indexing-service/workflow/batches/user/{userid}';
    let template = new UriTemplate(url);

    expect(template.expand({userid: 'robhicks'}).toString()).toEqual('https://beta.familysearch.org/indexing-service/workflow/batches/user/robhicks');
  });

  it('should expand several path variables', () => {
    let url = 'https://beta.familysearch.org/indexing-service/workflow/project/{projectid}/batches/user/{userid}';
    let template = new UriTemplate(url);

    expect(template.expand({projectid: '123435555555', userid: 'robhicks'}).toString())
      .toEqual('https://beta.familysearch.org/indexing-service/workflow/project/123435555555/batches/user/robhicks');
  });

  it('should expand a query parameter variable', () => {
    let url = 'https://beta.familysearch.org/indexing-service/projects/list{?userid}';
    let template = new UriTemplate(url);

    expect(template.expand({userid: 'robhicks'}).toString()).toEqual('https://beta.familysearch.org/indexing-service/projects?userid=robhicks');
  });

  it('should expand a number of query parameter variables', () => {
    let url = 'https://beta.familysearch.org/indexing-service/projects/list{?userid,name,age}';
    let template = new UriTemplate(url);

    expect(template.expand({age: 29, name: 'Rob', userid: 'robhicks'}).toString())
      .toEqual('https://beta.familysearch.org/indexing-service/projects?userid=robhicks&name=Rob&age=29');
  });

});
