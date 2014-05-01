/********************************************************************
APG - an ABNF Parser Generator
Copyright (C) 2009 Coast to Coast Research, Inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see
<http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
or write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

author: Lowell Thomas
lowell@coasttocoastresearch.com
http://www.coasttocoastresearch.com

*********************************************************************/
function ABNFOpcodes()
{
    // SUMMARY
    // string table length: 116
    //               rules: 26
    //             opcodes: 190

    // string table
    this.stringTable = [];
    this.stringTable[0] = 94;
    this.stringTable[1] = 36;
    this.stringTable[2] = 40;
    this.stringTable[3] = 41;
    this.stringTable[4] = 63;
    this.stringTable[5] = 58;
    this.stringTable[6] = 61;
    this.stringTable[7] = 33;
    this.stringTable[8] = 91;
    this.stringTable[9] = 93;
    this.stringTable[10] = 94;
    this.stringTable[11] = 92;
    this.stringTable[12] = 68;
    this.stringTable[13] = 92;
    this.stringTable[14] = 83;
    this.stringTable[15] = 92;
    this.stringTable[16] = 87;
    this.stringTable[17] = 92;
    this.stringTable[18] = 100;
    this.stringTable[19] = 92;
    this.stringTable[20] = 115;
    this.stringTable[21] = 92;
    this.stringTable[22] = 119;
    this.stringTable[23] = 46;
    this.stringTable[24] = 45;
    this.stringTable[25] = 63;
    this.stringTable[26] = 42;
    this.stringTable[27] = 43;
    this.stringTable[28] = 45;
    this.stringTable[29] = 37;
    this.stringTable[30] = 97;
    this.stringTable[31] = 99;
    this.stringTable[32] = 100;
    this.stringTable[33] = 114;
    this.stringTable[34] = 108;
    this.stringTable[35] = 112;
    this.stringTable[36] = 115;
    this.stringTable[37] = 117;
    this.stringTable[38] = 119;
    this.stringTable[39] = 120;
    this.stringTable[40] = 122;
    this.stringTable[41] = 37;
    this.stringTable[42] = 97;
    this.stringTable[43] = 99;
    this.stringTable[44] = 100;
    this.stringTable[45] = 114;
    this.stringTable[46] = 108;
    this.stringTable[47] = 112;
    this.stringTable[48] = 115;
    this.stringTable[49] = 117;
    this.stringTable[50] = 119;
    this.stringTable[51] = 120;
    this.stringTable[52] = 122;
    this.stringTable[53] = 123;
    this.stringTable[54] = 125;
    this.stringTable[55] = 35;
    this.stringTable[56] = 47;
    this.stringTable[57] = 92;
    this.stringTable[58] = 38;
    this.stringTable[59] = 33;
    this.stringTable[60] = 39;
    this.stringTable[61] = 124;
    this.stringTable[62] = 44;
    this.stringTable[63] = 58;
    this.stringTable[64] = 59;
    this.stringTable[65] = 60;
    this.stringTable[66] = 61;
    this.stringTable[67] = 62;
    this.stringTable[68] = 64;
    this.stringTable[69] = 95;
    this.stringTable[70] = 96;
    this.stringTable[71] = 126;
    this.stringTable[72] = 123;
    this.stringTable[73] = 125;
    this.stringTable[74] = 40;
    this.stringTable[75] = 41;
    this.stringTable[76] = 36;
    this.stringTable[77] = 43;
    this.stringTable[78] = 42;
    this.stringTable[79] = 63;
    this.stringTable[80] = 124;
    this.stringTable[81] = 35;
    this.stringTable[82] = 47;
    this.stringTable[83] = 92;
    this.stringTable[84] = 38;
    this.stringTable[85] = 33;
    this.stringTable[86] = 39;
    this.stringTable[87] = 44;
    this.stringTable[88] = 58;
    this.stringTable[89] = 59;
    this.stringTable[90] = 60;
    this.stringTable[91] = 61;
    this.stringTable[92] = 62;
    this.stringTable[93] = 64;
    this.stringTable[94] = 95;
    this.stringTable[95] = 96;
    this.stringTable[96] = 126;
    this.stringTable[97] = 91;
    this.stringTable[98] = 93;
    this.stringTable[99] = 94;
    this.stringTable[100] = 40;
    this.stringTable[101] = 41;
    this.stringTable[102] = 63;
    this.stringTable[103] = 43;
    this.stringTable[104] = 42;
    this.stringTable[105] = 46;
    this.stringTable[106] = 94;
    this.stringTable[107] = 36;
    this.stringTable[108] = 37;
    this.stringTable[109] = 32;
    this.stringTable[110] = 45;
    this.stringTable[111] = 91;
    this.stringTable[112] = 37;
    this.stringTable[113] = 93;
    this.stringTable[114] = 94;
    this.stringTable[115] = 32;

    // rule identifiers
    this.ruleIds = [];
    this.ruleIds.regexpliteral = 0;
    this.ruleIds.regexpatstart = 1;
    this.ruleIds.regexpatend = 2;
    this.ruleIds.regexpsequence = 3;
    this.ruleIds.regexpfactorword = 4;
    this.ruleIds.regexpgroup = 5;
    this.ruleIds.regexpgroupcapture = 6;
    this.ruleIds.regexpclass = 7;
    this.ruleIds.regexpclassnegative = 8;
    this.ruleIds.regexppredifinedclass = 9;
    this.ruleIds.regexpcharrange = 10;
    this.ruleIds.regexpcharstart = 11;
    this.ruleIds.regexpcharend = 12;
    this.ruleIds.regexpclassword = 13;
    this.ruleIds.regexpquantifier = 14;
    this.ruleIds.regexpclassescape = 15;
    this.ruleIds.regexpescape = 16;
    this.ruleIds.charfactor = 17;
    this.ruleIds.charclass = 18;
    this.ruleIds.charspecialfactor = 19;
    this.ruleIds.charspecial = 20;
    this.ruleIds.min = 21;
    this.ruleIds.max = 22;
    this.ruleIds.hexdig = 23;
    this.ruleIds.digit = 24;
    this.ruleIds.alpha = 25;

    // rule identifiers (alphabetical)
    this.ruleIds[0] = 25; // ALPHA
    this.ruleIds[1] = 18; // charclass
    this.ruleIds[2] = 17; // charfactor
    this.ruleIds[3] = 20; // charspecial
    this.ruleIds[4] = 19; // charspecialfactor
    this.ruleIds[5] = 24; // DIGIT
    this.ruleIds[6] = 23; // HEXDIG
    this.ruleIds[7] = 22; // max
    this.ruleIds[8] = 21; // min
    this.ruleIds[9] = 2; // regexpatend
    this.ruleIds[10] = 1; // regexpatstart
    this.ruleIds[11] = 12; // regexpcharend
    this.ruleIds[12] = 10; // regexpcharrange
    this.ruleIds[13] = 11; // regexpcharstart
    this.ruleIds[14] = 7; // regexpclass
    this.ruleIds[15] = 15; // regexpclassescape
    this.ruleIds[16] = 8; // regexpclassnegative
    this.ruleIds[17] = 13; // regexpclassword
    this.ruleIds[18] = 16; // regexpescape
    this.ruleIds[19] = 4; // regexpfactorword
    this.ruleIds[20] = 5; // regexpgroup
    this.ruleIds[21] = 6; // regexpgroupcapture
    this.ruleIds[22] = 0; // regexpliteral
    this.ruleIds[23] = 9; // regexppredifinedclass
    this.ruleIds[24] = 14; // regexpquantifier
    this.ruleIds[25] = 3; // regexpsequence

    // rules
    this.rules = [];
    this.rules[0] = [];
    this.rules[0].rule = 'regexpliteral';
    this.rules[0].lower = 'regexpliteral';
    this.rules[0].syntax = null;
    this.rules[0].semantic = null;
    this.rules[0].opcodeIndex = 0;

    this.rules[1] = [];
    this.rules[1].rule = 'regexpatstart';
    this.rules[1].lower = 'regexpatstart';
    this.rules[1].syntax = null;
    this.rules[1].semantic = null;
    this.rules[1].opcodeIndex = 6;

    this.rules[2] = [];
    this.rules[2].rule = 'regexpatend';
    this.rules[2].lower = 'regexpatend';
    this.rules[2].syntax = null;
    this.rules[2].semantic = null;
    this.rules[2].opcodeIndex = 7;

    this.rules[3] = [];
    this.rules[3].rule = 'regexpsequence';
    this.rules[3].lower = 'regexpsequence';
    this.rules[3].syntax = null;
    this.rules[3].semantic = null;
    this.rules[3].opcodeIndex = 8;

    this.rules[4] = [];
    this.rules[4].rule = 'regexpfactorword';
    this.rules[4].lower = 'regexpfactorword';
    this.rules[4].syntax = null;
    this.rules[4].semantic = null;
    this.rules[4].opcodeIndex = 16;

    this.rules[5] = [];
    this.rules[5].rule = 'regexpgroup';
    this.rules[5].lower = 'regexpgroup';
    this.rules[5].syntax = null;
    this.rules[5].semantic = null;
    this.rules[5].opcodeIndex = 20;

    this.rules[6] = [];
    this.rules[6].rule = 'regexpgroupcapture';
    this.rules[6].lower = 'regexpgroupcapture';
    this.rules[6].syntax = null;
    this.rules[6].semantic = null;
    this.rules[6].opcodeIndex = 26;

    this.rules[7] = [];
    this.rules[7].rule = 'regexpclass';
    this.rules[7].lower = 'regexpclass';
    this.rules[7].syntax = null;
    this.rules[7].semantic = null;
    this.rules[7].opcodeIndex = 33;

    this.rules[8] = [];
    this.rules[8].rule = 'regexpclassnegative';
    this.rules[8].lower = 'regexpclassnegative';
    this.rules[8].syntax = null;
    this.rules[8].semantic = null;
    this.rules[8].opcodeIndex = 45;

    this.rules[9] = [];
    this.rules[9].rule = 'regexppredifinedclass';
    this.rules[9].lower = 'regexppredifinedclass';
    this.rules[9].syntax = null;
    this.rules[9].semantic = null;
    this.rules[9].opcodeIndex = 46;

    this.rules[10] = [];
    this.rules[10].rule = 'regexpcharrange';
    this.rules[10].lower = 'regexpcharrange';
    this.rules[10].syntax = null;
    this.rules[10].semantic = null;
    this.rules[10].opcodeIndex = 54;

    this.rules[11] = [];
    this.rules[11].rule = 'regexpcharstart';
    this.rules[11].lower = 'regexpcharstart';
    this.rules[11].syntax = null;
    this.rules[11].semantic = null;
    this.rules[11].opcodeIndex = 58;

    this.rules[12] = [];
    this.rules[12].rule = 'regexpcharend';
    this.rules[12].lower = 'regexpcharend';
    this.rules[12].syntax = null;
    this.rules[12].semantic = null;
    this.rules[12].opcodeIndex = 61;

    this.rules[13] = [];
    this.rules[13].rule = 'regexpclassword';
    this.rules[13].lower = 'regexpclassword';
    this.rules[13].syntax = null;
    this.rules[13].semantic = null;
    this.rules[13].opcodeIndex = 64;

    this.rules[14] = [];
    this.rules[14].rule = 'regexpquantifier';
    this.rules[14].lower = 'regexpquantifier';
    this.rules[14].syntax = null;
    this.rules[14].semantic = null;
    this.rules[14].opcodeIndex = 68;

    this.rules[15] = [];
    this.rules[15].rule = 'regexpclassescape';
    this.rules[15].lower = 'regexpclassescape';
    this.rules[15].syntax = null;
    this.rules[15].semantic = null;
    this.rules[15].opcodeIndex = 73;

    this.rules[16] = [];
    this.rules[16].rule = 'regexpescape';
    this.rules[16].lower = 'regexpescape';
    this.rules[16].syntax = null;
    this.rules[16].semantic = null;
    this.rules[16].opcodeIndex = 89;

    this.rules[17] = [];
    this.rules[17].rule = 'charfactor';
    this.rules[17].lower = 'charfactor';
    this.rules[17].syntax = null;
    this.rules[17].semantic = null;
    this.rules[17].opcodeIndex = 105;

    this.rules[18] = [];
    this.rules[18].rule = 'charclass';
    this.rules[18].lower = 'charclass';
    this.rules[18].syntax = null;
    this.rules[18].semantic = null;
    this.rules[18].opcodeIndex = 128;

    this.rules[19] = [];
    this.rules[19].rule = 'charspecialfactor';
    this.rules[19].lower = 'charspecialfactor';
    this.rules[19].syntax = null;
    this.rules[19].semantic = null;
    this.rules[19].opcodeIndex = 157;

    this.rules[20] = [];
    this.rules[20].rule = 'charspecial';
    this.rules[20].lower = 'charspecial';
    this.rules[20].syntax = null;
    this.rules[20].semantic = null;
    this.rules[20].opcodeIndex = 171;

    this.rules[21] = [];
    this.rules[21].rule = 'min';
    this.rules[21].lower = 'min';
    this.rules[21].syntax = null;
    this.rules[21].semantic = null;
    this.rules[21].opcodeIndex = 178;

    this.rules[22] = [];
    this.rules[22].rule = 'max';
    this.rules[22].lower = 'max';
    this.rules[22].syntax = null;
    this.rules[22].semantic = null;
    this.rules[22].opcodeIndex = 180;

    this.rules[23] = [];
    this.rules[23].rule = 'HEXDIG';
    this.rules[23].lower = 'hexdig';
    this.rules[23].syntax = null;
    this.rules[23].semantic = null;
    this.rules[23].opcodeIndex = 182;

    this.rules[24] = [];
    this.rules[24].rule = 'DIGIT';
    this.rules[24].lower = 'digit';
    this.rules[24].syntax = null;
    this.rules[24].semantic = null;
    this.rules[24].opcodeIndex = 186;

    this.rules[25] = [];
    this.rules[25].rule = 'ALPHA';
    this.rules[25].lower = 'alpha';
    this.rules[25].syntax = null;
    this.rules[25].semantic = null;
    this.rules[25].opcodeIndex = 187;

    // opcodes
    this.opcodes = [];
    this.opcodes[0] = [];
    this.opcodes[0].opNext = 6;
    this.opcodes[0].type = CAT;

    this.opcodes[1] = [];
    this.opcodes[1].opNext = 3;
    this.opcodes[1].type = REP;
    this.opcodes[1].min = 0;
    this.opcodes[1].max = 1;

    this.opcodes[2] = [];
    this.opcodes[2].opNext = 3;
    this.opcodes[2].type = RNM;
    this.opcodes[2].ruleIndex = 1;

    this.opcodes[3] = [];
    this.opcodes[3].opNext = 4;
    this.opcodes[3].type = RNM;
    this.opcodes[3].ruleIndex = 3;

    this.opcodes[4] = [];
    this.opcodes[4].opNext = 6;
    this.opcodes[4].type = REP;
    this.opcodes[4].min = 0;
    this.opcodes[4].max = 1;

    this.opcodes[5] = [];
    this.opcodes[5].opNext = 6;
    this.opcodes[5].type = RNM;
    this.opcodes[5].ruleIndex = 2;

    this.opcodes[6] = [];
    this.opcodes[6].opNext = 7;
    this.opcodes[6].type = TLS;
    this.opcodes[6].length = 1;
    this.opcodes[6].stringIndex = 0;

    this.opcodes[7] = [];
    this.opcodes[7].opNext = 8;
    this.opcodes[7].type = TLS;
    this.opcodes[7].length = 1;
    this.opcodes[7].stringIndex = 1;

    this.opcodes[8] = [];
    this.opcodes[8].opNext = 16;
    this.opcodes[8].type = REP;
    this.opcodes[8].min = 1;
    this.opcodes[8].max = Infinity;

    this.opcodes[9] = [];
    this.opcodes[9].opNext = 16;
    this.opcodes[9].type = CAT;

    this.opcodes[10] = [];
    this.opcodes[10].opNext = 14;
    this.opcodes[10].type = ALT;

    this.opcodes[11] = [];
    this.opcodes[11].opNext = 12;
    this.opcodes[11].type = RNM;
    this.opcodes[11].ruleIndex = 7;

    this.opcodes[12] = [];
    this.opcodes[12].opNext = 13;
    this.opcodes[12].type = RNM;
    this.opcodes[12].ruleIndex = 5;

    this.opcodes[13] = [];
    this.opcodes[13].opNext = 14;
    this.opcodes[13].type = RNM;
    this.opcodes[13].ruleIndex = 4;

    this.opcodes[14] = [];
    this.opcodes[14].opNext = 16;
    this.opcodes[14].type = REP;
    this.opcodes[14].min = 0;
    this.opcodes[14].max = 1;

    this.opcodes[15] = [];
    this.opcodes[15].opNext = 16;
    this.opcodes[15].type = RNM;
    this.opcodes[15].ruleIndex = 14;

    this.opcodes[16] = [];
    this.opcodes[16].opNext = 20;
    this.opcodes[16].type = REP;
    this.opcodes[16].min = 1;
    this.opcodes[16].max = Infinity;

    this.opcodes[17] = [];
    this.opcodes[17].opNext = 20;
    this.opcodes[17].type = ALT;

    this.opcodes[18] = [];
    this.opcodes[18].opNext = 19;
    this.opcodes[18].type = RNM;
    this.opcodes[18].ruleIndex = 17;

    this.opcodes[19] = [];
    this.opcodes[19].opNext = 20;
    this.opcodes[19].type = RNM;
    this.opcodes[19].ruleIndex = 16;

    this.opcodes[20] = [];
    this.opcodes[20].opNext = 26;
    this.opcodes[20].type = CAT;

    this.opcodes[21] = [];
    this.opcodes[21].opNext = 22;
    this.opcodes[21].type = TLS;
    this.opcodes[21].length = 1;
    this.opcodes[21].stringIndex = 2;

    this.opcodes[22] = [];
    this.opcodes[22].opNext = 24;
    this.opcodes[22].type = REP;
    this.opcodes[22].min = 0;
    this.opcodes[22].max = 1;

    this.opcodes[23] = [];
    this.opcodes[23].opNext = 24;
    this.opcodes[23].type = RNM;
    this.opcodes[23].ruleIndex = 6;

    this.opcodes[24] = [];
    this.opcodes[24].opNext = 25;
    this.opcodes[24].type = RNM;
    this.opcodes[24].ruleIndex = 3;

    this.opcodes[25] = [];
    this.opcodes[25].opNext = 26;
    this.opcodes[25].type = TLS;
    this.opcodes[25].length = 1;
    this.opcodes[25].stringIndex = 3;

    this.opcodes[26] = [];
    this.opcodes[26].opNext = 33;
    this.opcodes[26].type = CAT;

    this.opcodes[27] = [];
    this.opcodes[27].opNext = 28;
    this.opcodes[27].type = TLS;
    this.opcodes[27].length = 1;
    this.opcodes[27].stringIndex = 4;

    this.opcodes[28] = [];
    this.opcodes[28].opNext = 33;
    this.opcodes[28].type = REP;
    this.opcodes[28].min = 0;
    this.opcodes[28].max = 1;

    this.opcodes[29] = [];
    this.opcodes[29].opNext = 33;
    this.opcodes[29].type = ALT;

    this.opcodes[30] = [];
    this.opcodes[30].opNext = 31;
    this.opcodes[30].type = TLS;
    this.opcodes[30].length = 1;
    this.opcodes[30].stringIndex = 5;

    this.opcodes[31] = [];
    this.opcodes[31].opNext = 32;
    this.opcodes[31].type = TLS;
    this.opcodes[31].length = 1;
    this.opcodes[31].stringIndex = 6;

    this.opcodes[32] = [];
    this.opcodes[32].opNext = 33;
    this.opcodes[32].type = TLS;
    this.opcodes[32].length = 1;
    this.opcodes[32].stringIndex = 7;

    this.opcodes[33] = [];
    this.opcodes[33].opNext = 45;
    this.opcodes[33].type = ALT;

    this.opcodes[34] = [];
    this.opcodes[34].opNext = 35;
    this.opcodes[34].type = RNM;
    this.opcodes[34].ruleIndex = 9;

    this.opcodes[35] = [];
    this.opcodes[35].opNext = 45;
    this.opcodes[35].type = CAT;

    this.opcodes[36] = [];
    this.opcodes[36].opNext = 37;
    this.opcodes[36].type = TLS;
    this.opcodes[36].length = 1;
    this.opcodes[36].stringIndex = 8;

    this.opcodes[37] = [];
    this.opcodes[37].opNext = 39;
    this.opcodes[37].type = REP;
    this.opcodes[37].min = 0;
    this.opcodes[37].max = 1;

    this.opcodes[38] = [];
    this.opcodes[38].opNext = 39;
    this.opcodes[38].type = RNM;
    this.opcodes[38].ruleIndex = 8;

    this.opcodes[39] = [];
    this.opcodes[39].opNext = 44;
    this.opcodes[39].type = REP;
    this.opcodes[39].min = 1;
    this.opcodes[39].max = Infinity;

    this.opcodes[40] = [];
    this.opcodes[40].opNext = 44;
    this.opcodes[40].type = ALT;

    this.opcodes[41] = [];
    this.opcodes[41].opNext = 42;
    this.opcodes[41].type = RNM;
    this.opcodes[41].ruleIndex = 9;

    this.opcodes[42] = [];
    this.opcodes[42].opNext = 43;
    this.opcodes[42].type = RNM;
    this.opcodes[42].ruleIndex = 10;

    this.opcodes[43] = [];
    this.opcodes[43].opNext = 44;
    this.opcodes[43].type = RNM;
    this.opcodes[43].ruleIndex = 13;

    this.opcodes[44] = [];
    this.opcodes[44].opNext = 45;
    this.opcodes[44].type = TLS;
    this.opcodes[44].length = 1;
    this.opcodes[44].stringIndex = 9;

    this.opcodes[45] = [];
    this.opcodes[45].opNext = 46;
    this.opcodes[45].type = TLS;
    this.opcodes[45].length = 1;
    this.opcodes[45].stringIndex = 10;

    this.opcodes[46] = [];
    this.opcodes[46].opNext = 54;
    this.opcodes[46].type = ALT;

    this.opcodes[47] = [];
    this.opcodes[47].opNext = 48;
    this.opcodes[47].type = TLS;
    this.opcodes[47].length = 2;
    this.opcodes[47].stringIndex = 11;

    this.opcodes[48] = [];
    this.opcodes[48].opNext = 49;
    this.opcodes[48].type = TLS;
    this.opcodes[48].length = 2;
    this.opcodes[48].stringIndex = 13;

    this.opcodes[49] = [];
    this.opcodes[49].opNext = 50;
    this.opcodes[49].type = TLS;
    this.opcodes[49].length = 2;
    this.opcodes[49].stringIndex = 15;

    this.opcodes[50] = [];
    this.opcodes[50].opNext = 51;
    this.opcodes[50].type = TLS;
    this.opcodes[50].length = 2;
    this.opcodes[50].stringIndex = 17;

    this.opcodes[51] = [];
    this.opcodes[51].opNext = 52;
    this.opcodes[51].type = TLS;
    this.opcodes[51].length = 2;
    this.opcodes[51].stringIndex = 19;

    this.opcodes[52] = [];
    this.opcodes[52].opNext = 53;
    this.opcodes[52].type = TLS;
    this.opcodes[52].length = 2;
    this.opcodes[52].stringIndex = 21;

    this.opcodes[53] = [];
    this.opcodes[53].opNext = 54;
    this.opcodes[53].type = TLS;
    this.opcodes[53].length = 1;
    this.opcodes[53].stringIndex = 23;

    this.opcodes[54] = [];
    this.opcodes[54].opNext = 58;
    this.opcodes[54].type = CAT;

    this.opcodes[55] = [];
    this.opcodes[55].opNext = 56;
    this.opcodes[55].type = RNM;
    this.opcodes[55].ruleIndex = 11;

    this.opcodes[56] = [];
    this.opcodes[56].opNext = 57;
    this.opcodes[56].type = TLS;
    this.opcodes[56].length = 1;
    this.opcodes[56].stringIndex = 24;

    this.opcodes[57] = [];
    this.opcodes[57].opNext = 58;
    this.opcodes[57].type = RNM;
    this.opcodes[57].ruleIndex = 12;

    this.opcodes[58] = [];
    this.opcodes[58].opNext = 61;
    this.opcodes[58].type = ALT;

    this.opcodes[59] = [];
    this.opcodes[59].opNext = 60;
    this.opcodes[59].type = RNM;
    this.opcodes[59].ruleIndex = 18;

    this.opcodes[60] = [];
    this.opcodes[60].opNext = 61;
    this.opcodes[60].type = RNM;
    this.opcodes[60].ruleIndex = 15;

    this.opcodes[61] = [];
    this.opcodes[61].opNext = 64;
    this.opcodes[61].type = ALT;

    this.opcodes[62] = [];
    this.opcodes[62].opNext = 63;
    this.opcodes[62].type = RNM;
    this.opcodes[62].ruleIndex = 18;

    this.opcodes[63] = [];
    this.opcodes[63].opNext = 64;
    this.opcodes[63].type = RNM;
    this.opcodes[63].ruleIndex = 15;

    this.opcodes[64] = [];
    this.opcodes[64].opNext = 68;
    this.opcodes[64].type = REP;
    this.opcodes[64].min = 1;
    this.opcodes[64].max = Infinity;

    this.opcodes[65] = [];
    this.opcodes[65].opNext = 68;
    this.opcodes[65].type = ALT;

    this.opcodes[66] = [];
    this.opcodes[66].opNext = 67;
    this.opcodes[66].type = RNM;
    this.opcodes[66].ruleIndex = 18;

    this.opcodes[67] = [];
    this.opcodes[67].opNext = 68;
    this.opcodes[67].type = RNM;
    this.opcodes[67].ruleIndex = 15;

    this.opcodes[68] = [];
    this.opcodes[68].opNext = 73;
    this.opcodes[68].type = ALT;

    this.opcodes[69] = [];
    this.opcodes[69].opNext = 70;
    this.opcodes[69].type = TLS;
    this.opcodes[69].length = 1;
    this.opcodes[69].stringIndex = 25;

    this.opcodes[70] = [];
    this.opcodes[70].opNext = 71;
    this.opcodes[70].type = TLS;
    this.opcodes[70].length = 1;
    this.opcodes[70].stringIndex = 26;

    this.opcodes[71] = [];
    this.opcodes[71].opNext = 72;
    this.opcodes[71].type = TLS;
    this.opcodes[71].length = 1;
    this.opcodes[71].stringIndex = 27;

    this.opcodes[72] = [];
    this.opcodes[72].opNext = 73;
    this.opcodes[72].type = TLS;
    this.opcodes[72].length = 1;
    this.opcodes[72].stringIndex = 28;

    this.opcodes[73] = [];
    this.opcodes[73].opNext = 89;
    this.opcodes[73].type = CAT;

    this.opcodes[74] = [];
    this.opcodes[74].opNext = 75;
    this.opcodes[74].type = TLS;
    this.opcodes[74].length = 1;
    this.opcodes[74].stringIndex = 29;

    this.opcodes[75] = [];
    this.opcodes[75].opNext = 89;
    this.opcodes[75].type = ALT;

    this.opcodes[76] = [];
    this.opcodes[76].opNext = 77;
    this.opcodes[76].type = TLS;
    this.opcodes[76].length = 1;
    this.opcodes[76].stringIndex = 30;

    this.opcodes[77] = [];
    this.opcodes[77].opNext = 78;
    this.opcodes[77].type = TLS;
    this.opcodes[77].length = 1;
    this.opcodes[77].stringIndex = 31;

    this.opcodes[78] = [];
    this.opcodes[78].opNext = 79;
    this.opcodes[78].type = TLS;
    this.opcodes[78].length = 1;
    this.opcodes[78].stringIndex = 32;

    this.opcodes[79] = [];
    this.opcodes[79].opNext = 80;
    this.opcodes[79].type = TLS;
    this.opcodes[79].length = 1;
    this.opcodes[79].stringIndex = 33;

    this.opcodes[80] = [];
    this.opcodes[80].opNext = 81;
    this.opcodes[80].type = TLS;
    this.opcodes[80].length = 1;
    this.opcodes[80].stringIndex = 34;

    this.opcodes[81] = [];
    this.opcodes[81].opNext = 82;
    this.opcodes[81].type = TLS;
    this.opcodes[81].length = 1;
    this.opcodes[81].stringIndex = 35;

    this.opcodes[82] = [];
    this.opcodes[82].opNext = 83;
    this.opcodes[82].type = TLS;
    this.opcodes[82].length = 1;
    this.opcodes[82].stringIndex = 36;

    this.opcodes[83] = [];
    this.opcodes[83].opNext = 84;
    this.opcodes[83].type = TLS;
    this.opcodes[83].length = 1;
    this.opcodes[83].stringIndex = 37;

    this.opcodes[84] = [];
    this.opcodes[84].opNext = 85;
    this.opcodes[84].type = TLS;
    this.opcodes[84].length = 1;
    this.opcodes[84].stringIndex = 38;

    this.opcodes[85] = [];
    this.opcodes[85].opNext = 86;
    this.opcodes[85].type = TLS;
    this.opcodes[85].length = 1;
    this.opcodes[85].stringIndex = 39;

    this.opcodes[86] = [];
    this.opcodes[86].opNext = 87;
    this.opcodes[86].type = TLS;
    this.opcodes[86].length = 1;
    this.opcodes[86].stringIndex = 40;

    this.opcodes[87] = [];
    this.opcodes[87].opNext = 88;
    this.opcodes[87].type = RNM;
    this.opcodes[87].ruleIndex = 20;

    this.opcodes[88] = [];
    this.opcodes[88].opNext = 89;
    this.opcodes[88].type = RNM;
    this.opcodes[88].ruleIndex = 24;

    this.opcodes[89] = [];
    this.opcodes[89].opNext = 105;
    this.opcodes[89].type = CAT;

    this.opcodes[90] = [];
    this.opcodes[90].opNext = 91;
    this.opcodes[90].type = TLS;
    this.opcodes[90].length = 1;
    this.opcodes[90].stringIndex = 41;

    this.opcodes[91] = [];
    this.opcodes[91].opNext = 105;
    this.opcodes[91].type = ALT;

    this.opcodes[92] = [];
    this.opcodes[92].opNext = 93;
    this.opcodes[92].type = TLS;
    this.opcodes[92].length = 1;
    this.opcodes[92].stringIndex = 42;

    this.opcodes[93] = [];
    this.opcodes[93].opNext = 94;
    this.opcodes[93].type = TLS;
    this.opcodes[93].length = 1;
    this.opcodes[93].stringIndex = 43;

    this.opcodes[94] = [];
    this.opcodes[94].opNext = 95;
    this.opcodes[94].type = TLS;
    this.opcodes[94].length = 1;
    this.opcodes[94].stringIndex = 44;

    this.opcodes[95] = [];
    this.opcodes[95].opNext = 96;
    this.opcodes[95].type = TLS;
    this.opcodes[95].length = 1;
    this.opcodes[95].stringIndex = 45;

    this.opcodes[96] = [];
    this.opcodes[96].opNext = 97;
    this.opcodes[96].type = TLS;
    this.opcodes[96].length = 1;
    this.opcodes[96].stringIndex = 46;

    this.opcodes[97] = [];
    this.opcodes[97].opNext = 98;
    this.opcodes[97].type = TLS;
    this.opcodes[97].length = 1;
    this.opcodes[97].stringIndex = 47;

    this.opcodes[98] = [];
    this.opcodes[98].opNext = 99;
    this.opcodes[98].type = TLS;
    this.opcodes[98].length = 1;
    this.opcodes[98].stringIndex = 48;

    this.opcodes[99] = [];
    this.opcodes[99].opNext = 100;
    this.opcodes[99].type = TLS;
    this.opcodes[99].length = 1;
    this.opcodes[99].stringIndex = 49;

    this.opcodes[100] = [];
    this.opcodes[100].opNext = 101;
    this.opcodes[100].type = TLS;
    this.opcodes[100].length = 1;
    this.opcodes[100].stringIndex = 50;

    this.opcodes[101] = [];
    this.opcodes[101].opNext = 102;
    this.opcodes[101].type = TLS;
    this.opcodes[101].length = 1;
    this.opcodes[101].stringIndex = 51;

    this.opcodes[102] = [];
    this.opcodes[102].opNext = 103;
    this.opcodes[102].type = TLS;
    this.opcodes[102].length = 1;
    this.opcodes[102].stringIndex = 52;

    this.opcodes[103] = [];
    this.opcodes[103].opNext = 104;
    this.opcodes[103].type = RNM;
    this.opcodes[103].ruleIndex = 19;

    this.opcodes[104] = [];
    this.opcodes[104].opNext = 105;
    this.opcodes[104].type = RNM;
    this.opcodes[104].ruleIndex = 24;

    this.opcodes[105] = [];
    this.opcodes[105].opNext = 128;
    this.opcodes[105].type = ALT;

    this.opcodes[106] = [];
    this.opcodes[106].opNext = 107;
    this.opcodes[106].type = RNM;
    this.opcodes[106].ruleIndex = 25;

    this.opcodes[107] = [];
    this.opcodes[107].opNext = 108;
    this.opcodes[107].type = RNM;
    this.opcodes[107].ruleIndex = 24;

    this.opcodes[108] = [];
    this.opcodes[108].opNext = 109;
    this.opcodes[108].type = TLS;
    this.opcodes[108].length = 1;
    this.opcodes[108].stringIndex = 53;

    this.opcodes[109] = [];
    this.opcodes[109].opNext = 110;
    this.opcodes[109].type = TLS;
    this.opcodes[109].length = 1;
    this.opcodes[109].stringIndex = 54;

    this.opcodes[110] = [];
    this.opcodes[110].opNext = 111;
    this.opcodes[110].type = TLS;
    this.opcodes[110].length = 1;
    this.opcodes[110].stringIndex = 55;

    this.opcodes[111] = [];
    this.opcodes[111].opNext = 112;
    this.opcodes[111].type = TLS;
    this.opcodes[111].length = 1;
    this.opcodes[111].stringIndex = 56;

    this.opcodes[112] = [];
    this.opcodes[112].opNext = 113;
    this.opcodes[112].type = TLS;
    this.opcodes[112].length = 1;
    this.opcodes[112].stringIndex = 57;

    this.opcodes[113] = [];
    this.opcodes[113].opNext = 114;
    this.opcodes[113].type = TLS;
    this.opcodes[113].length = 1;
    this.opcodes[113].stringIndex = 58;

    this.opcodes[114] = [];
    this.opcodes[114].opNext = 115;
    this.opcodes[114].type = TLS;
    this.opcodes[114].length = 1;
    this.opcodes[114].stringIndex = 59;

    this.opcodes[115] = [];
    this.opcodes[115].opNext = 116;
    this.opcodes[115].type = TLS;
    this.opcodes[115].length = 1;
    this.opcodes[115].stringIndex = 60;

    this.opcodes[116] = [];
    this.opcodes[116].opNext = 117;
    this.opcodes[116].type = TLS;
    this.opcodes[116].length = 1;
    this.opcodes[116].stringIndex = 61;

    this.opcodes[117] = [];
    this.opcodes[117].opNext = 118;
    this.opcodes[117].type = TLS;
    this.opcodes[117].length = 1;
    this.opcodes[117].stringIndex = 62;

    this.opcodes[118] = [];
    this.opcodes[118].opNext = 119;
    this.opcodes[118].type = TLS;
    this.opcodes[118].length = 1;
    this.opcodes[118].stringIndex = 63;

    this.opcodes[119] = [];
    this.opcodes[119].opNext = 120;
    this.opcodes[119].type = TLS;
    this.opcodes[119].length = 1;
    this.opcodes[119].stringIndex = 64;

    this.opcodes[120] = [];
    this.opcodes[120].opNext = 121;
    this.opcodes[120].type = TLS;
    this.opcodes[120].length = 1;
    this.opcodes[120].stringIndex = 65;

    this.opcodes[121] = [];
    this.opcodes[121].opNext = 122;
    this.opcodes[121].type = TLS;
    this.opcodes[121].length = 1;
    this.opcodes[121].stringIndex = 66;

    this.opcodes[122] = [];
    this.opcodes[122].opNext = 123;
    this.opcodes[122].type = TLS;
    this.opcodes[122].length = 1;
    this.opcodes[122].stringIndex = 67;

    this.opcodes[123] = [];
    this.opcodes[123].opNext = 124;
    this.opcodes[123].type = TLS;
    this.opcodes[123].length = 1;
    this.opcodes[123].stringIndex = 68;

    this.opcodes[124] = [];
    this.opcodes[124].opNext = 125;
    this.opcodes[124].type = TLS;
    this.opcodes[124].length = 1;
    this.opcodes[124].stringIndex = 69;

    this.opcodes[125] = [];
    this.opcodes[125].opNext = 126;
    this.opcodes[125].type = TLS;
    this.opcodes[125].length = 1;
    this.opcodes[125].stringIndex = 70;

    this.opcodes[126] = [];
    this.opcodes[126].opNext = 127;
    this.opcodes[126].type = TLS;
    this.opcodes[126].length = 1;
    this.opcodes[126].stringIndex = 71;

    this.opcodes[127] = [];
    this.opcodes[127].opNext = 128;
    this.opcodes[127].type = TRG;
    this.opcodes[127].min = 65;
    this.opcodes[127].max = 65;

    this.opcodes[128] = [];
    this.opcodes[128].opNext = 157;
    this.opcodes[128].type = ALT;

    this.opcodes[129] = [];
    this.opcodes[129].opNext = 130;
    this.opcodes[129].type = RNM;
    this.opcodes[129].ruleIndex = 25;

    this.opcodes[130] = [];
    this.opcodes[130].opNext = 131;
    this.opcodes[130].type = RNM;
    this.opcodes[130].ruleIndex = 24;

    this.opcodes[131] = [];
    this.opcodes[131].opNext = 132;
    this.opcodes[131].type = TLS;
    this.opcodes[131].length = 1;
    this.opcodes[131].stringIndex = 72;

    this.opcodes[132] = [];
    this.opcodes[132].opNext = 133;
    this.opcodes[132].type = TLS;
    this.opcodes[132].length = 1;
    this.opcodes[132].stringIndex = 73;

    this.opcodes[133] = [];
    this.opcodes[133].opNext = 134;
    this.opcodes[133].type = TLS;
    this.opcodes[133].length = 1;
    this.opcodes[133].stringIndex = 74;

    this.opcodes[134] = [];
    this.opcodes[134].opNext = 135;
    this.opcodes[134].type = TLS;
    this.opcodes[134].length = 1;
    this.opcodes[134].stringIndex = 75;

    this.opcodes[135] = [];
    this.opcodes[135].opNext = 136;
    this.opcodes[135].type = TLS;
    this.opcodes[135].length = 1;
    this.opcodes[135].stringIndex = 76;

    this.opcodes[136] = [];
    this.opcodes[136].opNext = 137;
    this.opcodes[136].type = TLS;
    this.opcodes[136].length = 1;
    this.opcodes[136].stringIndex = 77;

    this.opcodes[137] = [];
    this.opcodes[137].opNext = 138;
    this.opcodes[137].type = TLS;
    this.opcodes[137].length = 1;
    this.opcodes[137].stringIndex = 78;

    this.opcodes[138] = [];
    this.opcodes[138].opNext = 139;
    this.opcodes[138].type = TLS;
    this.opcodes[138].length = 1;
    this.opcodes[138].stringIndex = 79;

    this.opcodes[139] = [];
    this.opcodes[139].opNext = 140;
    this.opcodes[139].type = TLS;
    this.opcodes[139].length = 1;
    this.opcodes[139].stringIndex = 80;

    this.opcodes[140] = [];
    this.opcodes[140].opNext = 141;
    this.opcodes[140].type = TLS;
    this.opcodes[140].length = 1;
    this.opcodes[140].stringIndex = 81;

    this.opcodes[141] = [];
    this.opcodes[141].opNext = 142;
    this.opcodes[141].type = TLS;
    this.opcodes[141].length = 1;
    this.opcodes[141].stringIndex = 82;

    this.opcodes[142] = [];
    this.opcodes[142].opNext = 143;
    this.opcodes[142].type = TLS;
    this.opcodes[142].length = 1;
    this.opcodes[142].stringIndex = 83;

    this.opcodes[143] = [];
    this.opcodes[143].opNext = 144;
    this.opcodes[143].type = TLS;
    this.opcodes[143].length = 1;
    this.opcodes[143].stringIndex = 84;

    this.opcodes[144] = [];
    this.opcodes[144].opNext = 145;
    this.opcodes[144].type = TLS;
    this.opcodes[144].length = 1;
    this.opcodes[144].stringIndex = 85;

    this.opcodes[145] = [];
    this.opcodes[145].opNext = 146;
    this.opcodes[145].type = TLS;
    this.opcodes[145].length = 1;
    this.opcodes[145].stringIndex = 86;

    this.opcodes[146] = [];
    this.opcodes[146].opNext = 147;
    this.opcodes[146].type = TLS;
    this.opcodes[146].length = 1;
    this.opcodes[146].stringIndex = 87;

    this.opcodes[147] = [];
    this.opcodes[147].opNext = 148;
    this.opcodes[147].type = TLS;
    this.opcodes[147].length = 1;
    this.opcodes[147].stringIndex = 88;

    this.opcodes[148] = [];
    this.opcodes[148].opNext = 149;
    this.opcodes[148].type = TLS;
    this.opcodes[148].length = 1;
    this.opcodes[148].stringIndex = 89;

    this.opcodes[149] = [];
    this.opcodes[149].opNext = 150;
    this.opcodes[149].type = TLS;
    this.opcodes[149].length = 1;
    this.opcodes[149].stringIndex = 90;

    this.opcodes[150] = [];
    this.opcodes[150].opNext = 151;
    this.opcodes[150].type = TLS;
    this.opcodes[150].length = 1;
    this.opcodes[150].stringIndex = 91;

    this.opcodes[151] = [];
    this.opcodes[151].opNext = 152;
    this.opcodes[151].type = TLS;
    this.opcodes[151].length = 1;
    this.opcodes[151].stringIndex = 92;

    this.opcodes[152] = [];
    this.opcodes[152].opNext = 153;
    this.opcodes[152].type = TLS;
    this.opcodes[152].length = 1;
    this.opcodes[152].stringIndex = 93;

    this.opcodes[153] = [];
    this.opcodes[153].opNext = 154;
    this.opcodes[153].type = TLS;
    this.opcodes[153].length = 1;
    this.opcodes[153].stringIndex = 94;

    this.opcodes[154] = [];
    this.opcodes[154].opNext = 155;
    this.opcodes[154].type = TLS;
    this.opcodes[154].length = 1;
    this.opcodes[154].stringIndex = 95;

    this.opcodes[155] = [];
    this.opcodes[155].opNext = 156;
    this.opcodes[155].type = TLS;
    this.opcodes[155].length = 1;
    this.opcodes[155].stringIndex = 96;

    this.opcodes[156] = [];
    this.opcodes[156].opNext = 157;
    this.opcodes[156].type = TRG;
    this.opcodes[156].min = 65;
    this.opcodes[156].max = 65;

    this.opcodes[157] = [];
    this.opcodes[157].opNext = 171;
    this.opcodes[157].type = ALT;

    this.opcodes[158] = [];
    this.opcodes[158].opNext = 159;
    this.opcodes[158].type = TLS;
    this.opcodes[158].length = 1;
    this.opcodes[158].stringIndex = 97;

    this.opcodes[159] = [];
    this.opcodes[159].opNext = 160;
    this.opcodes[159].type = TLS;
    this.opcodes[159].length = 1;
    this.opcodes[159].stringIndex = 98;

    this.opcodes[160] = [];
    this.opcodes[160].opNext = 161;
    this.opcodes[160].type = TLS;
    this.opcodes[160].length = 1;
    this.opcodes[160].stringIndex = 99;

    this.opcodes[161] = [];
    this.opcodes[161].opNext = 162;
    this.opcodes[161].type = TLS;
    this.opcodes[161].length = 1;
    this.opcodes[161].stringIndex = 100;

    this.opcodes[162] = [];
    this.opcodes[162].opNext = 163;
    this.opcodes[162].type = TLS;
    this.opcodes[162].length = 1;
    this.opcodes[162].stringIndex = 101;

    this.opcodes[163] = [];
    this.opcodes[163].opNext = 164;
    this.opcodes[163].type = TLS;
    this.opcodes[163].length = 1;
    this.opcodes[163].stringIndex = 102;

    this.opcodes[164] = [];
    this.opcodes[164].opNext = 165;
    this.opcodes[164].type = TLS;
    this.opcodes[164].length = 1;
    this.opcodes[164].stringIndex = 103;

    this.opcodes[165] = [];
    this.opcodes[165].opNext = 166;
    this.opcodes[165].type = TLS;
    this.opcodes[165].length = 1;
    this.opcodes[165].stringIndex = 104;

    this.opcodes[166] = [];
    this.opcodes[166].opNext = 167;
    this.opcodes[166].type = TLS;
    this.opcodes[166].length = 1;
    this.opcodes[166].stringIndex = 105;

    this.opcodes[167] = [];
    this.opcodes[167].opNext = 168;
    this.opcodes[167].type = TLS;
    this.opcodes[167].length = 1;
    this.opcodes[167].stringIndex = 106;

    this.opcodes[168] = [];
    this.opcodes[168].opNext = 169;
    this.opcodes[168].type = TLS;
    this.opcodes[168].length = 1;
    this.opcodes[168].stringIndex = 107;

    this.opcodes[169] = [];
    this.opcodes[169].opNext = 170;
    this.opcodes[169].type = TLS;
    this.opcodes[169].length = 1;
    this.opcodes[169].stringIndex = 108;

    this.opcodes[170] = [];
    this.opcodes[170].opNext = 171;
    this.opcodes[170].type = TLS;
    this.opcodes[170].length = 1;
    this.opcodes[170].stringIndex = 109;

    this.opcodes[171] = [];
    this.opcodes[171].opNext = 178;
    this.opcodes[171].type = ALT;

    this.opcodes[172] = [];
    this.opcodes[172].opNext = 173;
    this.opcodes[172].type = TLS;
    this.opcodes[172].length = 1;
    this.opcodes[172].stringIndex = 110;

    this.opcodes[173] = [];
    this.opcodes[173].opNext = 174;
    this.opcodes[173].type = TLS;
    this.opcodes[173].length = 1;
    this.opcodes[173].stringIndex = 111;

    this.opcodes[174] = [];
    this.opcodes[174].opNext = 175;
    this.opcodes[174].type = TLS;
    this.opcodes[174].length = 1;
    this.opcodes[174].stringIndex = 112;

    this.opcodes[175] = [];
    this.opcodes[175].opNext = 176;
    this.opcodes[175].type = TLS;
    this.opcodes[175].length = 1;
    this.opcodes[175].stringIndex = 113;

    this.opcodes[176] = [];
    this.opcodes[176].opNext = 177;
    this.opcodes[176].type = TLS;
    this.opcodes[176].length = 1;
    this.opcodes[176].stringIndex = 114;

    this.opcodes[177] = [];
    this.opcodes[177].opNext = 178;
    this.opcodes[177].type = TLS;
    this.opcodes[177].length = 1;
    this.opcodes[177].stringIndex = 115;

    this.opcodes[178] = [];
    this.opcodes[178].opNext = 180;
    this.opcodes[178].type = REP;
    this.opcodes[178].min = 1;
    this.opcodes[178].max = Infinity;

    this.opcodes[179] = [];
    this.opcodes[179].opNext = 180;
    this.opcodes[179].type = RNM;
    this.opcodes[179].ruleIndex = 24;

    this.opcodes[180] = [];
    this.opcodes[180].opNext = 182;
    this.opcodes[180].type = REP;
    this.opcodes[180].min = 1;
    this.opcodes[180].max = Infinity;

    this.opcodes[181] = [];
    this.opcodes[181].opNext = 182;
    this.opcodes[181].type = RNM;
    this.opcodes[181].ruleIndex = 24;

    this.opcodes[182] = [];
    this.opcodes[182].opNext = 186;
    this.opcodes[182].type = ALT;

    this.opcodes[183] = [];
    this.opcodes[183].opNext = 184;
    this.opcodes[183].type = RNM;
    this.opcodes[183].ruleIndex = 24;

    this.opcodes[184] = [];
    this.opcodes[184].opNext = 185;
    this.opcodes[184].type = TRG;
    this.opcodes[184].min = 97;
    this.opcodes[184].max = 101;

    this.opcodes[185] = [];
    this.opcodes[185].opNext = 186;
    this.opcodes[185].type = TRG;
    this.opcodes[185].min = 65;
    this.opcodes[185].max = 69;

    this.opcodes[186] = [];
    this.opcodes[186].opNext = 187;
    this.opcodes[186].type = TRG;
    this.opcodes[186].min = 48;
    this.opcodes[186].max = 57;

    this.opcodes[187] = [];
    this.opcodes[187].opNext = 190;
    this.opcodes[187].type = ALT;

    this.opcodes[188] = [];
    this.opcodes[188].opNext = 189;
    this.opcodes[188].type = TRG;
    this.opcodes[188].min = 65;
    this.opcodes[188].max = 90;

    this.opcodes[189] = [];
    this.opcodes[189].opNext = 190;
    this.opcodes[189].type = TRG;
    this.opcodes[189].min = 97;
    this.opcodes[189].max = 122;

}
