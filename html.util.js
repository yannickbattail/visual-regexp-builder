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

html.getValue = function(htmlElem, node) {
    if (htmlElem.tagName == 'SELECT') {
        return htmlElem.options[e.selectedIndex].value;
    } else if (htmlElem.tagName == 'INPUT') {
        if (htmlElem.type == 'checkbox') {
            return htmlElem.checked;
        } else {
            return htmlElem.value;
        }
    } else if (htmlElem.tagName == 'TEXTAREA') {
        return htmlElem.value;
    }
    throw "unknown field type " + htmlElem.tagName;
};

html.setValue = function(htmlElem, value) {
    if (htmlElem.tagName == 'SELECT') {
        for (var i = 0; i < htmlElem.options.length; i++) {
            var option = htmlElem.options[i];
            if (option.value == value) {
                htmlElem.selectedIndex = i;
                return value;
            }
        }
        return null;
    } else if (htmlElem.tagName == 'INPUT') {
        if (htmlElem.type == 'checkbox') {
            if ((value === "true") || (value === true) || (value === "1") || (value === 1)) {
                return htmlElem.checked = true;
            } else {
                return htmlElem.checked = false;
            }
        } else {
            return htmlElem.value = value;
        }
    } else if (htmlElem.tagName == 'TEXTAREA') {
        return htmlElem.value = value;
    }
    throw "unknown field type" + htmlElem.tagName;
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
        if (!hasCssClass(htmlElem, className)) {
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
