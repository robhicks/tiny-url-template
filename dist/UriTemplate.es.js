var uriTemplateGlobalModifiers = {
  "+": true,
  "#": true,
  ".": true,
  "/": true,
  ";": true,
  "?": true,
  "&": true
};

var uriTemplateSuffices = {
  "*": true
};

function uriTemplateSubstitution(spec) {

  var modifier = "";
  if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
    modifier = spec.charAt(0);
    spec = spec.substring(1);
  }
  var separator = "";
  var prefix = "";
  var shouldEscape = true;
  var showvariables = false;
  var trimEmptyString = false;
  if (modifier === '+') {
    shouldEscape = false;
  } else if (modifier === ".") {
    prefix = ".";
    separator = ".";
  } else if (modifier === "/") {
    prefix = "/";
    separator = "/";
  } else if (modifier === '#') {
    prefix = "#";
    shouldEscape = false;
  } else if (modifier === ';') {
    prefix = ";";
    separator = ";";
    showvariables = true;
    trimEmptyString = true;
  } else if (modifier === '?') {
    prefix = "?";
    separator = "&";
    showvariables = true;
  } else if (modifier === '&') {
    prefix = "&";
    separator = "&";
    showvariables = true;
  }

  var varNames = [];
  var varList = spec.split(",");
  var varSpecs = [];
  var varSpecMap = {};
  for (var i = 0; i < varList.length; i++) {
    var varName = varList[i];
    var truncate = null;
    if (varName.indexOf(":") !== -1) {
      var parts = varName.split(":");
      varName = parts[0];
      truncate = parseInt(parts[1], 10);
    }
    var suffices = {};
    while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
      suffices[varName.charAt(varName.length - 1)] = true;
      varName = varName.substring(0, varName.length - 1);
    }
    var varSpec = {
      truncate: truncate,
      name: varName,
      suffices: suffices
    };
    varSpecs.push(varSpec);
    varSpecMap[varName] = varSpec;
    varNames.push(varName);
  }

}

var UriTemplate = function UriTemplate(template) {
  var this$1 = this;

  this.template = template;
  this.parts = template.split('{');
  this.textParts = [this.parts.shift()];
  this.prefixes = [];
  this.substitutions = [];
  this.unSubstitutions = [];
  this.varNames = [];

  while (this.parts.length > 0) {
    var part = this$1.parts.shift();
    var spec = part.split("}")[0];
    var remainder = part.substring(spec.length + 1);
    var funcs = uriTemplateSubstitution(spec);
    this$1.substitutions.push(funcs.substitution);
    this$1.unSubstitutions.push(funcs.unSubstitution);
    this$1.prefixes.push(funcs.prefix);
    this$1.textParts.push(remainder);
    this$1.varNames = this$1.varNames.concat(funcs.substitution.varNames);
  }

  return this;
};

UriTemplate.prototype.expand = function expand (valFn) {
    var this$1 = this;

  if (typeof valFn !== 'function') {
    var val = JSON.parse(JSON.stringify(valFn));
    valFn = function (varName) { return val[varName]; };
  }

  var result = this.textParts[0];
  for (var i = 0; i < this.substitutions.length; i++) {
    var sub = this$1.substitutions[i];
    result += sub(valFn);
    result += this$1.textParts[i + 1];
  }
  return result;
};

UriTemplate.prototype.toString = function toString () {
  return this.template;
};
