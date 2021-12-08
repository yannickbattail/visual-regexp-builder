const html = require('./html.util');

test('escapeXml() not escaped char', () => {
  expect(html.escapeXml("abcd1234567890`~^!@#$*()_+{}´|?-=[ ]\\,./")).toBe("abcd1234567890`~^!@#$*()_+{}´|?-=[ ]\\,./");
});

test('escapeXml() escaped xml chars', () => {
  expect(html.escapeXml("&<>\"'/")).toBe("&amp;&lt;&gt;&quot;&#39;/");
});

test('escapeXml() escaped xml tags', () => {
  expect(html.escapeXml('<span class="animaux">chien & chat</span>')).toBe("&lt;span class=&quot;animaux&quot;&gt;chien &amp; chat&lt;/span&gt;");
});
/*
test('gel()', () => {
  const div = document.createElement('DIV');
  div.innerHTML = '<span id="chat">cat</span>'
  expect(html.getSel('chat')).toBe(div.firstChild);
});
*/
