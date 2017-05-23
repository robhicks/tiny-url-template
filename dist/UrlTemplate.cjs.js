'use strict';

var UrlTemplate = function UrlTemplate(template) {
  this.uri = new Uri(template);
  return this;
};

UrlTemplate.prototype.expand = function expand (obj) {
    var this$1 = this;
    if ( obj === void 0 ) obj = {};

  console.log("this.uri.host()", this.uri.host());
  console.log("this.uri.toString()", this.uri.toString());
  this.path = this.uri.path.get();
  console.log("this.path", this.path);
  this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery();
  // console.log("this.urlTemplateQuery", this.urlTemplateQuery)
  this.path.forEach(function (path, i) {
    var substitution = path.substring(path.lastIndexOf("{") + 1, path.lastIndexOf("}"));
    console.log("substitution", substitution);
    if (substitution) { this$1.uri.path.replace(obj[substitution], i); }
  });

  if (this.urlTemplateQuery) {
    var tEls = this.urlTemplateQuery.split(',');
    tEls.forEach(function (te) {
      console.log("te", te);
      if (obj[te]) {
        var o = {};
        o[te] = obj[te];
         this$1.uri.query.add(o);
      }
    });
  }

  this.template = this.uri.toString();
  console.log("this.template", this.template);
  return this;

};

UrlTemplate.prototype.toString = function toString () {
  return this.template;
};

module.exports = UrlTemplate;
