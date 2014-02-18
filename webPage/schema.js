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
function getParent() {
    
}

var predefinedClasses = {
    "\\d": "digit",
    "\\s": "whitespace",
    "\\w": "word character",
    "\\t": "tab",
    "\\n": "new line",
    "\\r": "carriage return",
    "\\f": "form feed",
    // "\\b": "word boundary",
    "\\b": "backspace",
    "a-z": "alpha lowercase",
    "A-Z": "alpha uppercase",
    "a-zA-Z": "alpha upper and lower case",
    "a-zA-Z0-9": "alphanum",
    "a-f0-9": "headecimal lowercase",
    "A-F0-9": "headecimal uppercase",
    "a-fA-F0-9": "headecimal upper and lower case"
};

function closeButtons() {
    gel('buttons').style.display = 'none';
}

function showButtons(event, node) {
    selectedNode = node;
    var buttons = gel('buttons');
    buttons.style.display = 'block';
    buttons.style.left = '' + event.pageX + 'px';
    buttons.style.top = '' + event.pageY + 'px';
    event.stopPropagation();
}

function addGeneric(type) {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    div.setAttribute('ondragstart', 'drag(event)');
    div.setAttribute('draggable', true);
    div.innerHTML += type(n);
    selectedNode.appendChild(div);
    closeButtons();
    refesh();
}

function addText(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="text" />';
    html += '  Text <input type="text" id="value-' + n + '" value="abc" onkeyup="refesh()" />';
    // html += ' <div onclick="showButtons(event, this.parentNode);" class="showButtons">+</div>';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    return html;
}

function addQuantifier(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="quantifier" />';
    html += '  from <input type="text" id="value-' + n + '" value="1" size="2" onkeyup="refesh()" />times';
    html += '  to <input type="text" id="value2-' + n + '" value="2" size="2" onkeyup="refesh()" />times';
    // html += ' <div onclick="showButtons(event, this.parentNode);" class="showButtons">+</div>';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    return html;
}

function addCharClass(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="charClass" />';
    html += '  (Not<input type="checkbox" id="value2-' + n + '" value="1" onchange="refesh()" />)';
    html += '  one of theses char <input type="text" id="value-' + n + '" value="0123456789ABCDEF" onkeyup="refesh()" />';
    // html += ' <div onclick="showButtons(event, this.parentNode);" class="showButtons">+</div>';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    return html;
}

function addPredefinedClass(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="predefinedClass" />';
    html += '  (Not<input type="checkbox" id="value2-' + n + '" value="1" onchange="refesh()" />)';
    html += '  one char <select id="value-' + n + '" onchange="refesh()">';
    for ( var val in predefinedClasses) {
        var display = predefinedClasses[val];
        html += '  <option value="' + val + '">' + display + '</option>';
    }
    html += '  </select>';
    // html += ' <div onclick="showButtons(event, this.parentNode);" class="showButtons">+</div>';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    return html;
}

function addCharRange(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="charRange" />';
    html += '  from char <input type="text" id="value-' + n + '" value="a" size="2" onkeyup="refesh()" />';
    html += '  to char <input type="text" id="value2-' + n + '" value="z" size="2" onkeyup="refesh()" />';
    // html += ' <div onclick="showButtons(event, this.parentNode);" class="showButtons">+</div>';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    return html;
}

function addOr(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="or" />';
    html += '  OR ';
    // html += ' <div onclick="showButtons(event, this.parentNode);" class="showButtons">+</div>';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    return html;
}

function addGroup(n) {
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="group" />';
    html += '  Group (not<input type="checkbox" id="value-' + n + '" value="1" onchange="refesh()" /> capturing)';
    html += '  <button onclick="delMe(event, this.parentNode);" class="delButtons">X</button>';
    html += '  <button onclick="showButtons(event, gel(\'group-' + n + '\'));" class="showButtons">Add element</button>';
    html += '  <div id="group-' + n + '" class="group"></div>';
    return html;
}

function delMe(event, node) {
    selectedNode = node;
    del();
}
function del() {
    selectedNode.parentNode.removeChild(selectedNode);
    closeButtons();
    refesh();
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
            } else if (gel('type-' + n).value == "quantifier") {
                if (!v1) {
                    v1 = 0;
                }
                if (v1 == 0 && v2 == 1) {
                    regexp += '?';
                } else if (v1 == 0 && v2 == '') {
                    regexp += '*';
                } else if (v1 == 1 && v2 == '') {
                    regexp += '+';
                } else if (v1 == v2) {
                    regexp += '{' + v1 + '}';
                } else {
                    regexp += '{' + v1 + ',' + v2 + '}';
                }
            } else if (gel('type-' + n).value == "charClass") {
                regexp += '[';
                if (v2) {
                    regexp += '^';
                }
                regexp += escapeCharClass(v1);
                regexp += ']';
            } else if (gel('type-' + n).value == "predefinedClass") {
                var r = '';
                if (v2) {
                    if ((v1 == '\\d') || (v1 == '\\s') || (v1 == '\\w')) {
                        r = v1.toUpperCase();
                    } else {
                        r += '^' + v1 + '';
                    }
                } else {
                    r = v1;
                }
                regexp = '[' + r + ']';
            } else if (gel('type-' + n).value == "charRange") {
                regexp += '[' + v1 + '-' + v2 + ']';
            } else if (gel('type-' + n).value == "or") {
                regexp += '|';
            } else if (gel('type-' + n).value == "group") {
                regexp += '(';
                if (v1) {
                    regexp += '?:';
                }
                regexp += buildRegexpRecurs(gel('group-' + n));
                regexp += ')';
            }
        }
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
    } catch (e) {
        gel('errMsg').innerHTML = 'Some thing is wrong in the regexp. Error message: ' + e.message;
    }
    
}

function init() {
    selectedNode = gel('schema');
    addGeneric(addText);
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
    if (event.target.className == "group") {
        event.target.style.background = "chartreuse";
    }
    if (event.target.parentNode.className == "group") {
        event.target.style.background = "chartreuse";
    }
    
}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "group") {
        event.target.style.background = "";
    }
    if (event.target.parentNode.className == "group") {
        event.target.style.background = "";
    }
    
}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    if (event.target == dragged) {
        event.target.style.background = "";
        // dragged in the same node
        return;
    }
    // move dragged elem to the selected drop target
    if (event.target.className == "group") {
        event.target.style.background = "";
        if (dragged.parentNode.id == 'pieces') {
            var newNode = dragged.cloneNode(true);
            currentId++;
            newNode.innerHTML = newNode.innerHTML.replace(new RegExp('XXX', 'g'), String(currentId));
            newNode.id = newNode.id.replace('XXX', String(currentId));
            for (var i = 0; i < newNode.getElementsByTagName('BUTTON').length; i++) {
                var child = newNode.getElementsByTagName('BUTTON')[i];
                child.disabled = false;
            }
            newNode.setAttribute("style","");
            dragged = newNode;
        } else {
            dragged.parentNode.removeChild(dragged);
        }
        if (event.target.id != 'recycledBin') {
            event.target.appendChild(dragged);
        }
        refesh();
    } else if (event.target.parentNode.className == "group") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.parentNode.insertBefore(dragged, event.target);
        // event.target.appendChild(dragged);
        refesh();
    }
    
}, false);
