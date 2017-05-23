export default class UrlTemplate {
  constructor(template) {
    this.uri = new Uri(template);
    return this;
  }

  expand(obj = {}) {
    console.log("this.uri.host()", this.uri.host());
    console.log("this.uri.toString()", this.uri.toString())
    this.path = this.uri.path.get();
    console.log("this.path", this.path)
    this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery();
    // console.log("this.urlTemplateQuery", this.urlTemplateQuery)
    this.path.forEach((path, i) => {
      let substitution = path.substring(path.lastIndexOf("{") + 1, path.lastIndexOf("}"));
      console.log("substitution", substitution)
      if (substitution) this.uri.path.replace(obj[substitution], i);
    });

    if (this.urlTemplateQuery) {
      let tEls = this.urlTemplateQuery.split(',');
      tEls.forEach((te) => {
        console.log("te", te)
        if (obj[te]) {
          let o = {};
          o[te] = obj[te];
           this.uri.query.add(o);
        }
      });
    }

    this.template = this.uri.toString();
    console.log("this.template", this.template)
    return this;

  }

  toString() {
    return this.template;
  }
}
