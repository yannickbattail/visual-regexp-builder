var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}

function gel(id, node) {
    if (node) {
        return node.querySelector("[id='" + id + "']");
    } else {
        return document.getElementById(id);
    }
}

function getSel(id, node) {
    var e = gel(id, node);
    return e.options[e.selectedIndex].value;
}

function getValue(id, node) {
    var e = gel(id, node);
    if (e.tagName == 'SELECT') {
        return getSel(id);
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
}

function setValue(id, value, node) {
    var e = gel(id, node);
    if (e.tagName == 'SELECT') {
        return setSel(id, value, node);
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
}

function setSel(id, value, node) {
    var e = gel(id, node);
    for (var i, j = 0; i = e.options[j]; j++) {
        if (i.value == value) {
            e.selectedIndex = j;
            break;
        }
    }
}
