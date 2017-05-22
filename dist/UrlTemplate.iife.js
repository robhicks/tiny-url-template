var UrlTemplate = (function () {
'use strict';

var UriTemplate = function UriTemplate(template) {
  this.uri = new Uri(template);
  return this;
};

UriTemplate.prototype.expand = function expand (obj) {
    var this$1 = this;

  this.path = this.uri.path.get();
  this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery();
  this.path.forEach(function (path, i) {
    var substitution = path.substring(path.lastIndexOf("{") + 1, path.lastIndexOf("}"));
    if (substitution) { this$1.uri.path.replace(obj[substitution], i); }
  });

  if (this.urlTemplateQuery) {
    var tEls = this.urlTemplateQuery.split(',');
    tEls.forEach(function (te) {
      if (obj[te]) {
        var o = {};
        o[te] = obj[te];
         this$1.uri.query.add(o);
      }
    });
  }

  this.template = this.uri.toString();
  return this;

};

UriTemplate.prototype.toString = function toString () {
  return this.template;
};

return UriTemplate;

}());
