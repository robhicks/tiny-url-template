import uriTemplateGlobalModifiers from './uriTemplateGlobalModifiers.js';
import uriTemplateSuffices from './uriTemplateSuffices.js';

export default function uriTemplateSubstitution(spec) {

  let modifier = "";
  if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
    modifier = spec.charAt(0);
    spec = spec.substring(1);
  }
  let separator = "";
  let prefix = "";
  let shouldEscape = true;
  let showvariables = false;
  let trimEmptyString = false;
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

  let varNames = [];
  let varList = spec.split(",");
  let varSpecs = [];
  let varSpecMap = {};
  for (let i = 0; i < varList.length; i++) {
    let varName = varList[i];
    let truncate = null;
    if (varName.indexOf(":") !== -1) {
      let parts = varName.split(":");
      varName = parts[0];
      truncate = parseInt(parts[1], 10);
    }
    let suffices = {};
    while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
      suffices[varName.charAt(varName.length - 1)] = true;
      varName = varName.substring(0, varName.length - 1);
    }
    let varSpec = {
      truncate: truncate,
      name: varName,
      suffices: suffices
    };
    varSpecs.push(varSpec);
    varSpecMap[varName] = varSpec;
    varNames.push(varName);
  }

}
