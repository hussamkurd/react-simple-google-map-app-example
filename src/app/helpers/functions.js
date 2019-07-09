class HelperFunctions {}

HelperFunctions.checkNotNull = function(propValue) {
  return propValue != "undefined" && propValue != null && propValue != "";
};

HelperFunctions.longlatCheck = function(propValue) {
  return /^(^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6})$/.test(propValue);
};
HelperFunctions.validateCoordinates = function(link, lat, long) {
  return new Promise((resolve, reject) => {
    fetch(link + "?lat=" + lat + "&long=" + long, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Cookie: ""
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(error => {
        resolve(false);
      });
  });
};

export default HelperFunctions;
