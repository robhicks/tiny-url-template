import uriTemplateSubstitution from './uriTemplateSubstitution.js';

class UriTemplate {
  constructor(template) {
    this.template = template;
    this.parts = template.split('{');
    this.textParts = [this.parts.shift()];
    this.prefixes = [];
    this.substitutions = [];
    this.unSubstitutions = [];
    this.varNames = [];

    while (this.parts.length > 0) {
      let part = this.parts.shift();
      let spec = part.split("}")[0];
      let remainder = part.substring(spec.length + 1);
      let funcs = uriTemplateSubstitution(spec);
      this.substitutions.push(funcs.substitution);
      this.unSubstitutions.push(funcs.unSubstitution);
      this.prefixes.push(funcs.prefix);
      this.textParts.push(remainder);
      this.varNames = this.varNames.concat(funcs.substitution.varNames);
    }

    return this;
  }

  expand(valFn) {
    if (typeof valFn !== 'function') {
      let val = JSON.parse(JSON.stringify(valFn));
      valFn = (varName) => val[varName];
    }

    let result = this.textParts[0];
    for (let i = 0; i < this.substitutions.length; i++) {
      let sub = this.substitutions[i];
      result += sub(valFn);
      result += this.textParts[i + 1];
    }
    return result;
  }

  toString() {
    return this.template;
  }
}
