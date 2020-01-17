export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function createSVG(tag, attributes, styles) {
  var styles = styles || {};
  var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (var attrName in attributes) {
    el.setAttribute(attrName, attributes[attrName]);
  }
  for (var styleName in styles) {
    el.style[styleName] = styles[styleName];
  }
  return el;
}

export function getCathet(cathet, hypotenuse) {
  return parseFloat(
    Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(cathet, 2)).toFixed(3)
  );
}

export function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
