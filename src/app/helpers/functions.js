class HelperFunctions {}

HelperFunctions.checkNotNull = function(propValue) {
  return propValue != "undefined" && propValue != null && propValue != "";
};

HelperFunctions.longlatCheck = function(propValue) {
  return /^(^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6})$/.test(propValue);
};



export default HelperFunctions
