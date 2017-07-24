'use strict';

var TinyUrlTemplate = function TinyUrlTemplate(template) {
  this.uri = new TinyUri(template);
  this.path = this.uri.path.get();
  this.urlTemplateQuery = this.uri.query.getUrlTemplateQuery();
  return this;
};

TinyUrlTemplate.prototype.expand = function expand (obj) {
    var this$1 = this;
    if ( obj === void 0 ) obj = {};


  this.path.forEach(function (path, i) {
    var substitution = path.substring(path.lastIndexOf("{") + 1, path.lastIndexOf("}"));
    if (substitution) { this$1.uri.path.replace(obj[substitution], i); }
  });

  if (this.urlTemplateQuery) {
    var tEls = this.urlTemplateQuery.split(',');
    tEls.forEach(function (te) {
      if (typeof obj[te] !== 'undefined') {
        var o = {};
        o[te] = String(obj[te]);
         this$1.uri.query.add(o);
      }
    });
  }

  this.template = this.uri.toString();
  return this;

};

TinyUrlTemplate.prototype.toString = function toString () {
  return this.template;
};

module.exports = TinyUrlTemplate;
