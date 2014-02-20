var currentId = 0;
var selectedNode = null;

function escapeCharFactor(string) {
    return String(string).replace(/[\/\\\[\]{}()?+*|.\^$]/g, '\\$&');
}

function escapeCharClass(string) {
    return String(string).replace(/[\/\\\[\]\^\-]/g, '\\$&');
}

function getNodeNum(selectedNode) {
    var t = selectedNode.id.split('-');
    return t[1];
}

function showQuantifier(event) {
    var n = getNodeNum(event.target);
    var quantifier = gel('quantifier-' + n);
    if (quantifier.style.display == 'inline') {
        quantifier.style.display = 'none';
    } else {
        quantifier.style.display = 'inline';
    }
}

function refesh() {
    buildRegexp();
    testRegexp();
}

function buildRegexp() {
    var regexp = '';
    regexp += buildRegexpRecurs(gel('schema'));
    if (getValue('atStart')) {
        regexp = '^' + regexp;
    }
    if (getValue('atEnd')) {
        regexp += '$';
    }
    regexp = '/' + regexp + '/';
    if (getValue('optG')) {
        regexp += 'g';
    }
    if (getValue('optI')) {
        regexp += 'i';
    }
    if (getValue('optM')) {
        regexp += 'm';
    }
    gel('regexp').value = regexp;
}

function buildRegexpRecurs(nodeRoot) {
    var nodes = nodeRoot.childNodes;
    var regexp = '';
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ((node.nodeType == Node.ELEMENT_NODE) && (node.className == 'node')) {
            var n = getNodeNum(node);
            var v1 = gel('value-' + n) ? getValue('value-' + n) : null;
            var v2 = gel('value2-' + n) ? getValue('value2-' + n) : null;
            if (gel('type-' + n).value == "text") {
                regexp += escapeCharFactor(v1);
                regexp += buildQuantifier(getValue('min-' + n), getValue('max-' + n));
            } else if (gel('type-' + n).value == "class") {
                regexp += '[';
                if (v1) {
                    regexp += '^';
                }
                regexp += buildClass(gel('group-' + n));
                regexp += ']';
                regexp += buildQuantifier(getValue('min-' + n), getValue('max-' + n));
            } else if (gel('type-' + n).value == "or") {
                regexp += '(';
                regexp += buildRegexpRecurs(gel('group-' + n));
                regexp += ')|(';
                regexp += buildRegexpRecurs(gel('group2-' + n));
                regexp += ')';
            } else if (gel('type-' + n).value == "group") {
                regexp += '(';
                if (v1) {
                    regexp += '?:';
                }
                regexp += buildRegexpRecurs(gel('group-' + n));
                regexp += ')';
                regexp += buildQuantifier(getValue('min-' + n), getValue('max-' + n));
            }
        }
    }
    return regexp;
}

function buildClass(nodeRoot) {
    var nodes = nodeRoot.childNodes;
    var regexp = '';
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ((node.nodeType == Node.ELEMENT_NODE) && (node.className == 'nodeClass')) {
            var n = getNodeNum(node);
            var v1 = gel('value-' + n) ? getValue('value-' + n) : null;
            var v2 = gel('value2-' + n) ? getValue('value2-' + n) : null;
            if (gel('type-' + n).value == "charClass") {
                regexp += escapeCharClass(v1);
            } else if (gel('type-' + n).value == "predefinedClass") {
                regexp += v1;
            } else if (gel('type-' + n).value == "charRange") {
                regexp += v1 + '-' + v2;
            }
        }
    }
    return regexp;
}

function buildQuantifier(v1, v2) {
    var regexp = '';
    if (!v1) {
        v1 = 0;
    }
    if (v1 == 0 && v2 == 1) {
        regexp += '?';
    } else if (v1 == 0 && v2 == '') {
        regexp += '*';
    } else if (v1 == 1 && v2 == '') {
        regexp += '+';
    } else if (v1 == 1 && v2 == 1) {
        regexp += '';
    } else if (v1 == v2) {
        regexp += '{' + v1 + '}';
    } else {
        regexp += '{' + v1 + ',' + v2 + '}';
    }
    return regexp;
}

function testRegexp() {
    try {
        var theRegexp = eval(gel('regexp').value);
        var res = gel('test').value.match(theRegexp);
        if (res == null) {
            gel('errMsg').innerHTML = 'Nothing matches in the string.';
            gel('result').value = '';
        } else {
            gel('result').value = res.join('\n');
            gel('errMsg').innerHTML = '';
        }
        gel('regexp').className = 'regexpOk';
    } catch (e) {
        gel('errMsg').innerHTML = 'Some thing is wrong in the regexp. Error message: ' + e.message;
        gel('regexp').className = 'regexpFailed';
    }
    
}

function init() {
    selectedNode = gel('schema');
}

/***************** drag n drop *****************/

var dragged;

function drag(event) {
    event.dataTransfer.setData('text/plain', null);
}

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {
    
}, false);

document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    var source = dragged.parentNode;
    var dest = event.target;
    var elem = dragged;
    
    // move dragged elem to the selected drop target
    if (isValidMove(source, dest, elem)) {
        if (dest.style) {
            dest.style.background = "chartreuse";
        }
    } else {
        if (dest.style) {
            dest.style.background = "red";
        }
    }
}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    // var source = dragged.parentNode;
    var dest = event.target;
    // var elem = dragged;
    if (dest.style) {
        dest.style.background = "";
    }
    
}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    var source = dragged.parentNode;
    var dest = event.target;
    var elem = dragged;
    if (dest.style) {
        dest.style.background = "";
    }
    // move dragged elem to the selected drop target
    if (isValidMove(source, dest, elem)) {
        doMove(source, dest, elem);
    }
    
}, false);

function isValidMove(source, dest, elem) {
    if (dest == elem) {
        // dragged in the same node
        return false;
    }
    if ((dest.id == 'ressources') || (dest.parentNode.id == "ressources") || (dest.parentNode.parentNode.id == "ressources")) {
        return false;
    }
    // move dragged elem to the selected drop target
    if (dest.id == 'recycledBin') {
        if (source.id == "ressources") {
            return false;
        }
        return true;
    }
    if ((dest.className == "group") || (dest.parentNode.className == "group")) {
        if (elem.className == "node") {
            return true;
        }
    } else if ((dest.className == "groupClass") || (dest.parentNode.className == "groupClass")) {
        if (elem.className == "nodeClass") {
            return true;
        }
    }
    return false;
}

function doMove(source, dest, elem) {
    if (source.id == 'ressources') {
        var newNode = elem.cloneNode(true);
        currentId++;
        newNode.innerHTML = newNode.innerHTML.replace(new RegExp('XXX', 'g'), String(currentId));
        newNode.innerHTML = newNode.innerHTML.replace('disabled="disabled"', '');
        newNode.id = newNode.id.replace('XXX', String(currentId));
        newNode.setAttribute("style", "");
        elem = newNode;
    } else {
        source.removeChild(elem);
    }
    if (dest.id != 'recycledBin') {
        if ((dest.parentNode.className == "group") || (dest.parentNode.className == "groupClass")) {
            dest.parentNode.insertBefore(elem, dest);
        } else {
            dest.appendChild(elem);
        }
    }
    refesh();
}
