currentId = 0;
selectedNode = null;

function getNodeNum(selectedNode) {
    var t = selectedNode.id.split('-');
    return t[1];
}

function showButtons(event, node) {
    selectedNode = node;
    var buttons = gel('buttons');
    buttons.style.left = event.pageX;
    buttons.style.top = event.pageY;
    buttons.style.display = 'block';
}

function addText() {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="text" />';
    html += '  Text <input type="text" id="value-' + n + '" value="abc" onkeyup="refesh()" />';
    html += '  <div onclick="showButtons(event, this.parentNode);" class="showButtons">#</div>';
    div.innerHTML += html;
    selectedNode.parentNode.insertBefore(div, selectedNode.nextSibling);
    closeButtons();
    refesh();
}

function addQuantifier() {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="quantifier" />';
    html += '  from <input type="text" id="value-' + n + '" value="1" size="2" onkeyup="refesh()" />times';
    html += '  to <input type="text" id="value2-' + n + '" value="2" size="2" onkeyup="refesh()" />times';
    html += '  <div onclick="showButtons(event, this.parentNode);" class="showButtons">#</div>';
    div.innerHTML += html;
    selectedNode.parentNode.insertBefore(div, selectedNode.nextSibling);
    closeButtons();
    refesh();
}

function addCharClass() {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="charClass" />';
    html += '  (Not<input type="checkbox" id="value2-' + n + '" value="1" onchange="refesh()" />)';
    html += '  one of theses char <input type="text" id="value-' + n + '" value="0123456789ABCDEF" onkeyup="refesh()" />';
    html += '  <div onclick="showButtons(event, this.parentNode);" class="showButtons">#</div>';
    div.innerHTML += html;
    selectedNode.parentNode.insertBefore(div, selectedNode.nextSibling);
    closeButtons();
    refesh();
}

function addCharRange() {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="charRange" />';
    html += '  from char <input type="text" id="value-' + n + '" value="a" size="2" onkeyup="refesh()" />';
    html += '  to char <input type="text" id="value2-' + n + '" value="z" size="2" onkeyup="refesh()" />';
    html += '  <div onclick="showButtons(event, this.parentNode);" class="showButtons">#</div>';
    div.innerHTML += html;
    selectedNode.parentNode.insertBefore(div, selectedNode.nextSibling);
    closeButtons();
    refesh();
}

function addOr() {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="or" />';
    html += '  OR ';
    html += '  <div onclick="showButtons(event, this.parentNode);" class="showButtons">#</div>';
    div.innerHTML += html;
    selectedNode.parentNode.insertBefore(div, selectedNode.nextSibling);
    selectedNode = div;
    addText();
    closeButtons();
    refesh();
}

function addGroup() {
    currentId++;
    var n = currentId;
    var div = document.createElement("div");
    div.setAttribute('id', 'node-' + n);
    div.setAttribute('class', 'node');
    var html = '';
    html += '  <input type="hidden" id="type-' + n + '" value="group" />';
    html += '  Group (not<input type="checkbox" id="value-' + n + '" value="1" onchange="refesh()" /> capturing)';
    html += '  <div onclick="showButtons(event, this.parentNode);" class="showButtons">#</div>';
    html += '  <div id="group-' + n + '" class="group"><div></div></div>';
    div.innerHTML += html;
    selectedNode.parentNode.insertBefore(div, selectedNode.nextSibling);
    selectedNode = gel('group-' + n).firstChild;
    addText();
    closeButtons();
    refesh();
}

function del() {
    selectedNode.parentNode.removeChild(selectedNode);
    closeButtons();
    refesh();
}

function closeButtons() {
    gel('buttons').style.display = 'none';
}

function refesh() {
    buildRegexp();
}

function buildRegexp() {
    var regexp = '';
    regexp += buildRegexpRecurs(gel('schema').childNodes);
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

function buildRegexpRecurs(nodes) {
    var regexp = '';
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.nodeType == Node.ELEMENT_NODE && node.id) {
            var n = getNodeNum(node);
            var v1 = gel('value-' + n) ? getValue('value-' + n) : null;
            var v2 = gel('value2-' + n) ? getValue('value2-' + n) : null;
            if (gel('type-' + n).value == "text") {
                regexp += v1;
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
                if (v2) {
                    regexp += '[^' + v1 + ']';
                } else {
                    regexp += '[' + v1 + ']';
                }
            } else if (gel('type-' + n).value == "charRange") {
                regexp += '[' + v1 + '-' + v2 + ']';
            } else if (gel('type-' + n).value == "or") {
                regexp += '|';
            } else if (gel('type-' + n).value == "group") {
                regexp += '(';
                if (v1) {
                    regexp += '?:';
                }
                regexp += buildRegexpRecurs(gel('group-' + n).childNodes);
                regexp += ')';
            }
        }
    }
    return regexp;
}

function init() {
    selectedNode = gel('schema').firstChild;
    addText();
}
