html = {};

html.entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

html.escapeXml = function(string) {
    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
};

html.gel = function(id, node) {
    if (node) {
        return node.querySelector("[id='" + id + "']");
    } else {
        return document.getElementById(id);
    }
};

html.getSel = function(id, node) {
  var e = html.gel(id, node);
  return e.options[e.selectedIndex].value;
}

html.setSel = function(id, value, node) {
  var e = html.gel(id, node);
  for (var i, j = 0; i = e.options[j]; j++) {
    if (i.value == value) {
      e.selectedIndex = j;
      break;
    }
  }
}
html.getValue = function(id, node) {
  var e = html.gel(id, node);
  if (e.tagName == 'SELECT') {
    return html.getSel(id);
  } else if (e.tagName == 'INPUT') {
    if (e.type == 'checkbox') {
      return e.checked;
    } else {
      return e.value;
    }
  } else if (e.tagName == 'TEXTAREA') {
    return e.value;
  }
  throw "unknown field type " + e.tagName;
};

html.setValue = function(id, value, node) {
  var e = html.gel(id, node);
  if (e.tagName == 'SELECT') {
    return html.setSel(id, value, node);
  } else if (e.tagName == 'INPUT') {
    if (e.type == 'checkbox') {
      return e.checked = value ? true : false;
    } else {
      return e.value = value;
    }
  } else if (e.tagName == 'TEXTAREA') {
    return e.value = value;
  }
  throw "unknown field type" + e.tagName;
};

html.clearSelect = function(htmlSelect) {
    for (var i = (htmlSelect.length - 1); i >= 0; i--) {
        htmlSelect.remove(i);
    }
};

html.loadSelect = function(htmlSelect, object) {
    html.clearSelect(id);
    for ( var index in object) {
        var option = document.createElement("option");
        option.text = object[index];
        option.value = index;
        htmlSelect.add(option);
    }
};

html.hasCssClass = function(htmlElem, className) {
    if (htmlElem.className) {
        var tabClasses = htmlElem.className.split(' ');
        if (tabClasses.indexOf(className) === -1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

html.addCssClass = function(htmlElem, className) {
    if (htmlElem.className) {
        if (!html.hasCssClass(htmlElem, className)) {
            htmlElem.className += ' ' + className;
        }
    } else {
        htmlElem.className = className;
    }
};

html.removeCssClass = function(htmlElem, className) {
    if (htmlElem.className) {
        var tabClasses = htmlElem.className.split(' ');
        var index = tabClasses.indexOf(className);
        if (index >= 0) {
            tabClasses.splice(index, 1);
            htmlElem.className = tabClasses.join(' ');
        }
    }
};
