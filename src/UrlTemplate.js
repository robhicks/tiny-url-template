export default class UrlTemplate {
  constructor(template) {
    this.uri = new Uri(template);
    return this;
  }

  expand(obj) {
    this.path = this.uri.path.get();
    this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery();
    this.path.forEach((path, i) => {
      let substitution = path.substring(path.lastIndexOf("{") + 1, path.lastIndexOf("}"));
      if (substitution) this.uri.path.replace(obj[substitution], i);
    });

    if (this.urlTemplateQuery) {
      let tEls = this.urlTemplateQuery.split(',');
      tEls.forEach((te) => {
        if (obj[te]) {
          let o = {};
          o[te] = obj[te];
           this.uri.query.add(o);
        }
      });
    }

    this.template = this.uri.toString();
    return this;

  }

  toString() {
    return this.template;
  }
}
