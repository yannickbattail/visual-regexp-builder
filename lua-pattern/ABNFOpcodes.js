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
    // string table length: 117
    //               rules: 27
    //             opcodes: 199

    // string table
    this.stringTable = [];
    this.stringTable[0] = 94;
    this.stringTable[1] = 36;
    this.stringTable[2] = 124;
    this.stringTable[3] = 40;
    this.stringTable[4] = 41;
    this.stringTable[5] = 63;
    this.stringTable[6] = 58;
    this.stringTable[7] = 61;
    this.stringTable[8] = 33;
    this.stringTable[9] = 91;
    this.stringTable[10] = 93;
    this.stringTable[11] = 94;
    this.stringTable[12] = 92;
    this.stringTable[13] = 68;
    this.stringTable[14] = 92;
    this.stringTable[15] = 83;
    this.stringTable[16] = 92;
    this.stringTable[17] = 87;
    this.stringTable[18] = 92;
    this.stringTable[19] = 100;
    this.stringTable[20] = 92;
    this.stringTable[21] = 115;
    this.stringTable[22] = 92;
    this.stringTable[23] = 119;
    this.stringTable[24] = 46;
    this.stringTable[25] = 45;
    this.stringTable[26] = 63;
    this.stringTable[27] = 42;
    this.stringTable[28] = 43;
    this.stringTable[29] = 45;
    this.stringTable[30] = 37;
    this.stringTable[31] = 97;
    this.stringTable[32] = 99;
    this.stringTable[33] = 100;
    this.stringTable[34] = 114;
    this.stringTable[35] = 108;
    this.stringTable[36] = 112;
    this.stringTable[37] = 115;
    this.stringTable[38] = 117;
    this.stringTable[39] = 119;
    this.stringTable[40] = 120;
    this.stringTable[41] = 122;
    this.stringTable[42] = 37;
    this.stringTable[43] = 97;
    this.stringTable[44] = 99;
    this.stringTable[45] = 100;
    this.stringTable[46] = 114;
    this.stringTable[47] = 108;
    this.stringTable[48] = 112;
    this.stringTable[49] = 115;
    this.stringTable[50] = 117;
    this.stringTable[51] = 119;
    this.stringTable[52] = 120;
    this.stringTable[53] = 122;
    this.stringTable[54] = 123;
    this.stringTable[55] = 125;
    this.stringTable[56] = 35;
    this.stringTable[57] = 47;
    this.stringTable[58] = 92;
    this.stringTable[59] = 38;
    this.stringTable[60] = 33;
    this.stringTable[61] = 39;
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
    this.stringTable[105] = 124;
    this.stringTable[106] = 46;
    this.stringTable[107] = 94;
    this.stringTable[108] = 36;
    this.stringTable[109] = 37;
    this.stringTable[110] = 32;
    this.stringTable[111] = 45;
    this.stringTable[112] = 91;
    this.stringTable[113] = 37;
    this.stringTable[114] = 93;
    this.stringTable[115] = 94;
    this.stringTable[116] = 32;

    // rule identifiers
    this.ruleIds = [];
    this.ruleIds.regexpliteral = 0;
    this.ruleIds.regexpatstart = 1;
    this.ruleIds.regexpatend = 2;
    this.ruleIds.regexpalternative = 3;
    this.ruleIds.regexpsequence = 4;
    this.ruleIds.regexpfactorword = 5;
    this.ruleIds.regexpgroup = 6;
    this.ruleIds.regexpgroupcapture = 7;
    this.ruleIds.regexpclass = 8;
    this.ruleIds.regexpclassnegative = 9;
    this.ruleIds.regexppredifinedclass = 10;
    this.ruleIds.regexpcharrange = 11;
    this.ruleIds.regexpcharstart = 12;
    this.ruleIds.regexpcharend = 13;
    this.ruleIds.regexpclassword = 14;
    this.ruleIds.regexpquantifier = 15;
    this.ruleIds.regexpclassescape = 16;
    this.ruleIds.regexpescape = 17;
    this.ruleIds.charfactor = 18;
    this.ruleIds.charclass = 19;
    this.ruleIds.charspecialfactor = 20;
    this.ruleIds.charspecial = 21;
    this.ruleIds.min = 22;
    this.ruleIds.max = 23;
    this.ruleIds.hexdig = 24;
    this.ruleIds.digit = 25;
    this.ruleIds.alpha = 26;

    // rule identifiers (alphabetical)
    this.ruleIds[0] = 26; // ALPHA
    this.ruleIds[1] = 19; // charclass
    this.ruleIds[2] = 18; // charfactor
    this.ruleIds[3] = 21; // charspecial
    this.ruleIds[4] = 20; // charspecialfactor
    this.ruleIds[5] = 25; // DIGIT
    this.ruleIds[6] = 24; // HEXDIG
    this.ruleIds[7] = 23; // max
    this.ruleIds[8] = 22; // min
    this.ruleIds[9] = 3; // regexpalternative
    this.ruleIds[10] = 2; // regexpatend
    this.ruleIds[11] = 1; // regexpatstart
    this.ruleIds[12] = 13; // regexpcharend
    this.ruleIds[13] = 11; // regexpcharrange
    this.ruleIds[14] = 12; // regexpcharstart
    this.ruleIds[15] = 8; // regexpclass
    this.ruleIds[16] = 16; // regexpclassescape
    this.ruleIds[17] = 9; // regexpclassnegative
    this.ruleIds[18] = 14; // regexpclassword
    this.ruleIds[19] = 17; // regexpescape
    this.ruleIds[20] = 5; // regexpfactorword
    this.ruleIds[21] = 6; // regexpgroup
    this.ruleIds[22] = 7; // regexpgroupcapture
    this.ruleIds[23] = 0; // regexpliteral
    this.ruleIds[24] = 10; // regexppredifinedclass
    this.ruleIds[25] = 15; // regexpquantifier
    this.ruleIds[26] = 4; // regexpsequence

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
    this.rules[1].opcodeIndex = 10;

    this.rules[2] = [];
    this.rules[2].rule = 'regexpatend';
    this.rules[2].lower = 'regexpatend';
    this.rules[2].syntax = null;
    this.rules[2].semantic = null;
    this.rules[2].opcodeIndex = 11;

    this.rules[3] = [];
    this.rules[3].rule = 'regexpalternative';
    this.rules[3].lower = 'regexpalternative';
    this.rules[3].syntax = null;
    this.rules[3].semantic = null;
    this.rules[3].opcodeIndex = 12;

    this.rules[4] = [];
    this.rules[4].rule = 'regexpsequence';
    this.rules[4].lower = 'regexpsequence';
    this.rules[4].syntax = null;
    this.rules[4].semantic = null;
    this.rules[4].opcodeIndex = 13;

    this.rules[5] = [];
    this.rules[5].rule = 'regexpfactorword';
    this.rules[5].lower = 'regexpfactorword';
    this.rules[5].syntax = null;
    this.rules[5].semantic = null;
    this.rules[5].opcodeIndex = 21;

    this.rules[6] = [];
    this.rules[6].rule = 'regexpgroup';
    this.rules[6].lower = 'regexpgroup';
    this.rules[6].syntax = null;
    this.rules[6].semantic = null;
    this.rules[6].opcodeIndex = 25;

    this.rules[7] = [];
    this.rules[7].rule = 'regexpgroupcapture';
    this.rules[7].lower = 'regexpgroupcapture';
    this.rules[7].syntax = null;
    this.rules[7].semantic = null;
    this.rules[7].opcodeIndex = 35;

    this.rules[8] = [];
    this.rules[8].rule = 'regexpclass';
    this.rules[8].lower = 'regexpclass';
    this.rules[8].syntax = null;
    this.rules[8].semantic = null;
    this.rules[8].opcodeIndex = 42;

    this.rules[9] = [];
    this.rules[9].rule = 'regexpclassnegative';
    this.rules[9].lower = 'regexpclassnegative';
    this.rules[9].syntax = null;
    this.rules[9].semantic = null;
    this.rules[9].opcodeIndex = 54;

    this.rules[10] = [];
    this.rules[10].rule = 'regexppredifinedclass';
    this.rules[10].lower = 'regexppredifinedclass';
    this.rules[10].syntax = null;
    this.rules[10].semantic = null;
    this.rules[10].opcodeIndex = 55;

    this.rules[11] = [];
    this.rules[11].rule = 'regexpcharrange';
    this.rules[11].lower = 'regexpcharrange';
    this.rules[11].syntax = null;
    this.rules[11].semantic = null;
    this.rules[11].opcodeIndex = 63;

    this.rules[12] = [];
    this.rules[12].rule = 'regexpcharstart';
    this.rules[12].lower = 'regexpcharstart';
    this.rules[12].syntax = null;
    this.rules[12].semantic = null;
    this.rules[12].opcodeIndex = 67;

    this.rules[13] = [];
    this.rules[13].rule = 'regexpcharend';
    this.rules[13].lower = 'regexpcharend';
    this.rules[13].syntax = null;
    this.rules[13].semantic = null;
    this.rules[13].opcodeIndex = 70;

    this.rules[14] = [];
    this.rules[14].rule = 'regexpclassword';
    this.rules[14].lower = 'regexpclassword';
    this.rules[14].syntax = null;
    this.rules[14].semantic = null;
    this.rules[14].opcodeIndex = 73;

    this.rules[15] = [];
    this.rules[15].rule = 'regexpquantifier';
    this.rules[15].lower = 'regexpquantifier';
    this.rules[15].syntax = null;
    this.rules[15].semantic = null;
    this.rules[15].opcodeIndex = 77;

    this.rules[16] = [];
    this.rules[16].rule = 'regexpclassescape';
    this.rules[16].lower = 'regexpclassescape';
    this.rules[16].syntax = null;
    this.rules[16].semantic = null;
    this.rules[16].opcodeIndex = 82;

    this.rules[17] = [];
    this.rules[17].rule = 'regexpescape';
    this.rules[17].lower = 'regexpescape';
    this.rules[17].syntax = null;
    this.rules[17].semantic = null;
    this.rules[17].opcodeIndex = 98;

    this.rules[18] = [];
    this.rules[18].rule = 'charfactor';
    this.rules[18].lower = 'charfactor';
    this.rules[18].syntax = null;
    this.rules[18].semantic = null;
    this.rules[18].opcodeIndex = 114;

    this.rules[19] = [];
    this.rules[19].rule = 'charclass';
    this.rules[19].lower = 'charclass';
    this.rules[19].syntax = null;
    this.rules[19].semantic = null;
    this.rules[19].opcodeIndex = 136;

    this.rules[20] = [];
    this.rules[20].rule = 'charspecialfactor';
    this.rules[20].lower = 'charspecialfactor';
    this.rules[20].syntax = null;
    this.rules[20].semantic = null;
    this.rules[20].opcodeIndex = 165;

    this.rules[21] = [];
    this.rules[21].rule = 'charspecial';
    this.rules[21].lower = 'charspecial';
    this.rules[21].syntax = null;
    this.rules[21].semantic = null;
    this.rules[21].opcodeIndex = 180;

    this.rules[22] = [];
    this.rules[22].rule = 'min';
    this.rules[22].lower = 'min';
    this.rules[22].syntax = null;
    this.rules[22].semantic = null;
    this.rules[22].opcodeIndex = 187;

    this.rules[23] = [];
    this.rules[23].rule = 'max';
    this.rules[23].lower = 'max';
    this.rules[23].syntax = null;
    this.rules[23].semantic = null;
    this.rules[23].opcodeIndex = 189;

    this.rules[24] = [];
    this.rules[24].rule = 'HEXDIG';
    this.rules[24].lower = 'hexdig';
    this.rules[24].syntax = null;
    this.rules[24].semantic = null;
    this.rules[24].opcodeIndex = 191;

    this.rules[25] = [];
    this.rules[25].rule = 'DIGIT';
    this.rules[25].lower = 'digit';
    this.rules[25].syntax = null;
    this.rules[25].semantic = null;
    this.rules[25].opcodeIndex = 195;

    this.rules[26] = [];
    this.rules[26].rule = 'ALPHA';
    this.rules[26].lower = 'alpha';
    this.rules[26].syntax = null;
    this.rules[26].semantic = null;
    this.rules[26].opcodeIndex = 196;

    // opcodes
    this.opcodes = [];
    this.opcodes[0] = [];
    this.opcodes[0].opNext = 10;
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
    this.opcodes[3].ruleIndex = 4;

    this.opcodes[4] = [];
    this.opcodes[4].opNext = 8;
    this.opcodes[4].type = REP;
    this.opcodes[4].min = 0;
    this.opcodes[4].max = Infinity;

    this.opcodes[5] = [];
    this.opcodes[5].opNext = 8;
    this.opcodes[5].type = CAT;

    this.opcodes[6] = [];
    this.opcodes[6].opNext = 7;
    this.opcodes[6].type = RNM;
    this.opcodes[6].ruleIndex = 3;

    this.opcodes[7] = [];
    this.opcodes[7].opNext = 8;
    this.opcodes[7].type = RNM;
    this.opcodes[7].ruleIndex = 4;

    this.opcodes[8] = [];
    this.opcodes[8].opNext = 10;
    this.opcodes[8].type = REP;
    this.opcodes[8].min = 0;
    this.opcodes[8].max = 1;

    this.opcodes[9] = [];
    this.opcodes[9].opNext = 10;
    this.opcodes[9].type = RNM;
    this.opcodes[9].ruleIndex = 2;

    this.opcodes[10] = [];
    this.opcodes[10].opNext = 11;
    this.opcodes[10].type = TLS;
    this.opcodes[10].length = 1;
    this.opcodes[10].stringIndex = 0;

    this.opcodes[11] = [];
    this.opcodes[11].opNext = 12;
    this.opcodes[11].type = TLS;
    this.opcodes[11].length = 1;
    this.opcodes[11].stringIndex = 1;

    this.opcodes[12] = [];
    this.opcodes[12].opNext = 13;
    this.opcodes[12].type = TLS;
    this.opcodes[12].length = 1;
    this.opcodes[12].stringIndex = 2;

    this.opcodes[13] = [];
    this.opcodes[13].opNext = 21;
    this.opcodes[13].type = REP;
    this.opcodes[13].min = 1;
    this.opcodes[13].max = Infinity;

    this.opcodes[14] = [];
    this.opcodes[14].opNext = 21;
    this.opcodes[14].type = CAT;

    this.opcodes[15] = [];
    this.opcodes[15].opNext = 19;
    this.opcodes[15].type = ALT;

    this.opcodes[16] = [];
    this.opcodes[16].opNext = 17;
    this.opcodes[16].type = RNM;
    this.opcodes[16].ruleIndex = 8;

    this.opcodes[17] = [];
    this.opcodes[17].opNext = 18;
    this.opcodes[17].type = RNM;
    this.opcodes[17].ruleIndex = 6;

    this.opcodes[18] = [];
    this.opcodes[18].opNext = 19;
    this.opcodes[18].type = RNM;
    this.opcodes[18].ruleIndex = 5;

    this.opcodes[19] = [];
    this.opcodes[19].opNext = 21;
    this.opcodes[19].type = REP;
    this.opcodes[19].min = 0;
    this.opcodes[19].max = 1;

    this.opcodes[20] = [];
    this.opcodes[20].opNext = 21;
    this.opcodes[20].type = RNM;
    this.opcodes[20].ruleIndex = 15;

    this.opcodes[21] = [];
    this.opcodes[21].opNext = 25;
    this.opcodes[21].type = REP;
    this.opcodes[21].min = 1;
    this.opcodes[21].max = Infinity;

    this.opcodes[22] = [];
    this.opcodes[22].opNext = 25;
    this.opcodes[22].type = ALT;

    this.opcodes[23] = [];
    this.opcodes[23].opNext = 24;
    this.opcodes[23].type = RNM;
    this.opcodes[23].ruleIndex = 18;

    this.opcodes[24] = [];
    this.opcodes[24].opNext = 25;
    this.opcodes[24].type = RNM;
    this.opcodes[24].ruleIndex = 17;

    this.opcodes[25] = [];
    this.opcodes[25].opNext = 35;
    this.opcodes[25].type = CAT;

    this.opcodes[26] = [];
    this.opcodes[26].opNext = 27;
    this.opcodes[26].type = TLS;
    this.opcodes[26].length = 1;
    this.opcodes[26].stringIndex = 3;

    this.opcodes[27] = [];
    this.opcodes[27].opNext = 29;
    this.opcodes[27].type = REP;
    this.opcodes[27].min = 0;
    this.opcodes[27].max = 1;

    this.opcodes[28] = [];
    this.opcodes[28].opNext = 29;
    this.opcodes[28].type = RNM;
    this.opcodes[28].ruleIndex = 7;

    this.opcodes[29] = [];
    this.opcodes[29].opNext = 30;
    this.opcodes[29].type = RNM;
    this.opcodes[29].ruleIndex = 4;

    this.opcodes[30] = [];
    this.opcodes[30].opNext = 34;
    this.opcodes[30].type = REP;
    this.opcodes[30].min = 0;
    this.opcodes[30].max = Infinity;

    this.opcodes[31] = [];
    this.opcodes[31].opNext = 34;
    this.opcodes[31].type = CAT;

    this.opcodes[32] = [];
    this.opcodes[32].opNext = 33;
    this.opcodes[32].type = RNM;
    this.opcodes[32].ruleIndex = 3;

    this.opcodes[33] = [];
    this.opcodes[33].opNext = 34;
    this.opcodes[33].type = RNM;
    this.opcodes[33].ruleIndex = 4;

    this.opcodes[34] = [];
    this.opcodes[34].opNext = 35;
    this.opcodes[34].type = TLS;
    this.opcodes[34].length = 1;
    this.opcodes[34].stringIndex = 4;

    this.opcodes[35] = [];
    this.opcodes[35].opNext = 42;
    this.opcodes[35].type = CAT;

    this.opcodes[36] = [];
    this.opcodes[36].opNext = 37;
    this.opcodes[36].type = TLS;
    this.opcodes[36].length = 1;
    this.opcodes[36].stringIndex = 5;

    this.opcodes[37] = [];
    this.opcodes[37].opNext = 42;
    this.opcodes[37].type = REP;
    this.opcodes[37].min = 0;
    this.opcodes[37].max = 1;

    this.opcodes[38] = [];
    this.opcodes[38].opNext = 42;
    this.opcodes[38].type = ALT;

    this.opcodes[39] = [];
    this.opcodes[39].opNext = 40;
    this.opcodes[39].type = TLS;
    this.opcodes[39].length = 1;
    this.opcodes[39].stringIndex = 6;

    this.opcodes[40] = [];
    this.opcodes[40].opNext = 41;
    this.opcodes[40].type = TLS;
    this.opcodes[40].length = 1;
    this.opcodes[40].stringIndex = 7;

    this.opcodes[41] = [];
    this.opcodes[41].opNext = 42;
    this.opcodes[41].type = TLS;
    this.opcodes[41].length = 1;
    this.opcodes[41].stringIndex = 8;

    this.opcodes[42] = [];
    this.opcodes[42].opNext = 54;
    this.opcodes[42].type = ALT;

    this.opcodes[43] = [];
    this.opcodes[43].opNext = 44;
    this.opcodes[43].type = RNM;
    this.opcodes[43].ruleIndex = 10;

    this.opcodes[44] = [];
    this.opcodes[44].opNext = 54;
    this.opcodes[44].type = CAT;

    this.opcodes[45] = [];
    this.opcodes[45].opNext = 46;
    this.opcodes[45].type = TLS;
    this.opcodes[45].length = 1;
    this.opcodes[45].stringIndex = 9;

    this.opcodes[46] = [];
    this.opcodes[46].opNext = 48;
    this.opcodes[46].type = REP;
    this.opcodes[46].min = 0;
    this.opcodes[46].max = 1;

    this.opcodes[47] = [];
    this.opcodes[47].opNext = 48;
    this.opcodes[47].type = RNM;
    this.opcodes[47].ruleIndex = 9;

    this.opcodes[48] = [];
    this.opcodes[48].opNext = 53;
    this.opcodes[48].type = REP;
    this.opcodes[48].min = 1;
    this.opcodes[48].max = Infinity;

    this.opcodes[49] = [];
    this.opcodes[49].opNext = 53;
    this.opcodes[49].type = ALT;

    this.opcodes[50] = [];
    this.opcodes[50].opNext = 51;
    this.opcodes[50].type = RNM;
    this.opcodes[50].ruleIndex = 10;

    this.opcodes[51] = [];
    this.opcodes[51].opNext = 52;
    this.opcodes[51].type = RNM;
    this.opcodes[51].ruleIndex = 11;

    this.opcodes[52] = [];
    this.opcodes[52].opNext = 53;
    this.opcodes[52].type = RNM;
    this.opcodes[52].ruleIndex = 14;

    this.opcodes[53] = [];
    this.opcodes[53].opNext = 54;
    this.opcodes[53].type = TLS;
    this.opcodes[53].length = 1;
    this.opcodes[53].stringIndex = 10;

    this.opcodes[54] = [];
    this.opcodes[54].opNext = 55;
    this.opcodes[54].type = TLS;
    this.opcodes[54].length = 1;
    this.opcodes[54].stringIndex = 11;

    this.opcodes[55] = [];
    this.opcodes[55].opNext = 63;
    this.opcodes[55].type = ALT;

    this.opcodes[56] = [];
    this.opcodes[56].opNext = 57;
    this.opcodes[56].type = TLS;
    this.opcodes[56].length = 2;
    this.opcodes[56].stringIndex = 12;

    this.opcodes[57] = [];
    this.opcodes[57].opNext = 58;
    this.opcodes[57].type = TLS;
    this.opcodes[57].length = 2;
    this.opcodes[57].stringIndex = 14;

    this.opcodes[58] = [];
    this.opcodes[58].opNext = 59;
    this.opcodes[58].type = TLS;
    this.opcodes[58].length = 2;
    this.opcodes[58].stringIndex = 16;

    this.opcodes[59] = [];
    this.opcodes[59].opNext = 60;
    this.opcodes[59].type = TLS;
    this.opcodes[59].length = 2;
    this.opcodes[59].stringIndex = 18;

    this.opcodes[60] = [];
    this.opcodes[60].opNext = 61;
    this.opcodes[60].type = TLS;
    this.opcodes[60].length = 2;
    this.opcodes[60].stringIndex = 20;

    this.opcodes[61] = [];
    this.opcodes[61].opNext = 62;
    this.opcodes[61].type = TLS;
    this.opcodes[61].length = 2;
    this.opcodes[61].stringIndex = 22;

    this.opcodes[62] = [];
    this.opcodes[62].opNext = 63;
    this.opcodes[62].type = TLS;
    this.opcodes[62].length = 1;
    this.opcodes[62].stringIndex = 24;

    this.opcodes[63] = [];
    this.opcodes[63].opNext = 67;
    this.opcodes[63].type = CAT;

    this.opcodes[64] = [];
    this.opcodes[64].opNext = 65;
    this.opcodes[64].type = RNM;
    this.opcodes[64].ruleIndex = 12;

    this.opcodes[65] = [];
    this.opcodes[65].opNext = 66;
    this.opcodes[65].type = TLS;
    this.opcodes[65].length = 1;
    this.opcodes[65].stringIndex = 25;

    this.opcodes[66] = [];
    this.opcodes[66].opNext = 67;
    this.opcodes[66].type = RNM;
    this.opcodes[66].ruleIndex = 13;

    this.opcodes[67] = [];
    this.opcodes[67].opNext = 70;
    this.opcodes[67].type = ALT;

    this.opcodes[68] = [];
    this.opcodes[68].opNext = 69;
    this.opcodes[68].type = RNM;
    this.opcodes[68].ruleIndex = 19;

    this.opcodes[69] = [];
    this.opcodes[69].opNext = 70;
    this.opcodes[69].type = RNM;
    this.opcodes[69].ruleIndex = 16;

    this.opcodes[70] = [];
    this.opcodes[70].opNext = 73;
    this.opcodes[70].type = ALT;

    this.opcodes[71] = [];
    this.opcodes[71].opNext = 72;
    this.opcodes[71].type = RNM;
    this.opcodes[71].ruleIndex = 19;

    this.opcodes[72] = [];
    this.opcodes[72].opNext = 73;
    this.opcodes[72].type = RNM;
    this.opcodes[72].ruleIndex = 16;

    this.opcodes[73] = [];
    this.opcodes[73].opNext = 77;
    this.opcodes[73].type = REP;
    this.opcodes[73].min = 1;
    this.opcodes[73].max = Infinity;

    this.opcodes[74] = [];
    this.opcodes[74].opNext = 77;
    this.opcodes[74].type = ALT;

    this.opcodes[75] = [];
    this.opcodes[75].opNext = 76;
    this.opcodes[75].type = RNM;
    this.opcodes[75].ruleIndex = 19;

    this.opcodes[76] = [];
    this.opcodes[76].opNext = 77;
    this.opcodes[76].type = RNM;
    this.opcodes[76].ruleIndex = 16;

    this.opcodes[77] = [];
    this.opcodes[77].opNext = 82;
    this.opcodes[77].type = ALT;

    this.opcodes[78] = [];
    this.opcodes[78].opNext = 79;
    this.opcodes[78].type = TLS;
    this.opcodes[78].length = 1;
    this.opcodes[78].stringIndex = 26;

    this.opcodes[79] = [];
    this.opcodes[79].opNext = 80;
    this.opcodes[79].type = TLS;
    this.opcodes[79].length = 1;
    this.opcodes[79].stringIndex = 27;

    this.opcodes[80] = [];
    this.opcodes[80].opNext = 81;
    this.opcodes[80].type = TLS;
    this.opcodes[80].length = 1;
    this.opcodes[80].stringIndex = 28;

    this.opcodes[81] = [];
    this.opcodes[81].opNext = 82;
    this.opcodes[81].type = TLS;
    this.opcodes[81].length = 1;
    this.opcodes[81].stringIndex = 29;

    this.opcodes[82] = [];
    this.opcodes[82].opNext = 98;
    this.opcodes[82].type = CAT;

    this.opcodes[83] = [];
    this.opcodes[83].opNext = 84;
    this.opcodes[83].type = TLS;
    this.opcodes[83].length = 1;
    this.opcodes[83].stringIndex = 30;

    this.opcodes[84] = [];
    this.opcodes[84].opNext = 98;
    this.opcodes[84].type = ALT;

    this.opcodes[85] = [];
    this.opcodes[85].opNext = 86;
    this.opcodes[85].type = TLS;
    this.opcodes[85].length = 1;
    this.opcodes[85].stringIndex = 31;

    this.opcodes[86] = [];
    this.opcodes[86].opNext = 87;
    this.opcodes[86].type = TLS;
    this.opcodes[86].length = 1;
    this.opcodes[86].stringIndex = 32;

    this.opcodes[87] = [];
    this.opcodes[87].opNext = 88;
    this.opcodes[87].type = TLS;
    this.opcodes[87].length = 1;
    this.opcodes[87].stringIndex = 33;

    this.opcodes[88] = [];
    this.opcodes[88].opNext = 89;
    this.opcodes[88].type = TLS;
    this.opcodes[88].length = 1;
    this.opcodes[88].stringIndex = 34;

    this.opcodes[89] = [];
    this.opcodes[89].opNext = 90;
    this.opcodes[89].type = TLS;
    this.opcodes[89].length = 1;
    this.opcodes[89].stringIndex = 35;

    this.opcodes[90] = [];
    this.opcodes[90].opNext = 91;
    this.opcodes[90].type = TLS;
    this.opcodes[90].length = 1;
    this.opcodes[90].stringIndex = 36;

    this.opcodes[91] = [];
    this.opcodes[91].opNext = 92;
    this.opcodes[91].type = TLS;
    this.opcodes[91].length = 1;
    this.opcodes[91].stringIndex = 37;

    this.opcodes[92] = [];
    this.opcodes[92].opNext = 93;
    this.opcodes[92].type = TLS;
    this.opcodes[92].length = 1;
    this.opcodes[92].stringIndex = 38;

    this.opcodes[93] = [];
    this.opcodes[93].opNext = 94;
    this.opcodes[93].type = TLS;
    this.opcodes[93].length = 1;
    this.opcodes[93].stringIndex = 39;

    this.opcodes[94] = [];
    this.opcodes[94].opNext = 95;
    this.opcodes[94].type = TLS;
    this.opcodes[94].length = 1;
    this.opcodes[94].stringIndex = 40;

    this.opcodes[95] = [];
    this.opcodes[95].opNext = 96;
    this.opcodes[95].type = TLS;
    this.opcodes[95].length = 1;
    this.opcodes[95].stringIndex = 41;

    this.opcodes[96] = [];
    this.opcodes[96].opNext = 97;
    this.opcodes[96].type = RNM;
    this.opcodes[96].ruleIndex = 21;

    this.opcodes[97] = [];
    this.opcodes[97].opNext = 98;
    this.opcodes[97].type = RNM;
    this.opcodes[97].ruleIndex = 25;

    this.opcodes[98] = [];
    this.opcodes[98].opNext = 114;
    this.opcodes[98].type = CAT;

    this.opcodes[99] = [];
    this.opcodes[99].opNext = 100;
    this.opcodes[99].type = TLS;
    this.opcodes[99].length = 1;
    this.opcodes[99].stringIndex = 42;

    this.opcodes[100] = [];
    this.opcodes[100].opNext = 114;
    this.opcodes[100].type = ALT;

    this.opcodes[101] = [];
    this.opcodes[101].opNext = 102;
    this.opcodes[101].type = TLS;
    this.opcodes[101].length = 1;
    this.opcodes[101].stringIndex = 43;

    this.opcodes[102] = [];
    this.opcodes[102].opNext = 103;
    this.opcodes[102].type = TLS;
    this.opcodes[102].length = 1;
    this.opcodes[102].stringIndex = 44;

    this.opcodes[103] = [];
    this.opcodes[103].opNext = 104;
    this.opcodes[103].type = TLS;
    this.opcodes[103].length = 1;
    this.opcodes[103].stringIndex = 45;

    this.opcodes[104] = [];
    this.opcodes[104].opNext = 105;
    this.opcodes[104].type = TLS;
    this.opcodes[104].length = 1;
    this.opcodes[104].stringIndex = 46;

    this.opcodes[105] = [];
    this.opcodes[105].opNext = 106;
    this.opcodes[105].type = TLS;
    this.opcodes[105].length = 1;
    this.opcodes[105].stringIndex = 47;

    this.opcodes[106] = [];
    this.opcodes[106].opNext = 107;
    this.opcodes[106].type = TLS;
    this.opcodes[106].length = 1;
    this.opcodes[106].stringIndex = 48;

    this.opcodes[107] = [];
    this.opcodes[107].opNext = 108;
    this.opcodes[107].type = TLS;
    this.opcodes[107].length = 1;
    this.opcodes[107].stringIndex = 49;

    this.opcodes[108] = [];
    this.opcodes[108].opNext = 109;
    this.opcodes[108].type = TLS;
    this.opcodes[108].length = 1;
    this.opcodes[108].stringIndex = 50;

    this.opcodes[109] = [];
    this.opcodes[109].opNext = 110;
    this.opcodes[109].type = TLS;
    this.opcodes[109].length = 1;
    this.opcodes[109].stringIndex = 51;

    this.opcodes[110] = [];
    this.opcodes[110].opNext = 111;
    this.opcodes[110].type = TLS;
    this.opcodes[110].length = 1;
    this.opcodes[110].stringIndex = 52;

    this.opcodes[111] = [];
    this.opcodes[111].opNext = 112;
    this.opcodes[111].type = TLS;
    this.opcodes[111].length = 1;
    this.opcodes[111].stringIndex = 53;

    this.opcodes[112] = [];
    this.opcodes[112].opNext = 113;
    this.opcodes[112].type = RNM;
    this.opcodes[112].ruleIndex = 20;

    this.opcodes[113] = [];
    this.opcodes[113].opNext = 114;
    this.opcodes[113].type = RNM;
    this.opcodes[113].ruleIndex = 25;

    this.opcodes[114] = [];
    this.opcodes[114].opNext = 136;
    this.opcodes[114].type = ALT;

    this.opcodes[115] = [];
    this.opcodes[115].opNext = 116;
    this.opcodes[115].type = RNM;
    this.opcodes[115].ruleIndex = 26;

    this.opcodes[116] = [];
    this.opcodes[116].opNext = 117;
    this.opcodes[116].type = RNM;
    this.opcodes[116].ruleIndex = 25;

    this.opcodes[117] = [];
    this.opcodes[117].opNext = 118;
    this.opcodes[117].type = TLS;
    this.opcodes[117].length = 1;
    this.opcodes[117].stringIndex = 54;

    this.opcodes[118] = [];
    this.opcodes[118].opNext = 119;
    this.opcodes[118].type = TLS;
    this.opcodes[118].length = 1;
    this.opcodes[118].stringIndex = 55;

    this.opcodes[119] = [];
    this.opcodes[119].opNext = 120;
    this.opcodes[119].type = TLS;
    this.opcodes[119].length = 1;
    this.opcodes[119].stringIndex = 56;

    this.opcodes[120] = [];
    this.opcodes[120].opNext = 121;
    this.opcodes[120].type = TLS;
    this.opcodes[120].length = 1;
    this.opcodes[120].stringIndex = 57;

    this.opcodes[121] = [];
    this.opcodes[121].opNext = 122;
    this.opcodes[121].type = TLS;
    this.opcodes[121].length = 1;
    this.opcodes[121].stringIndex = 58;

    this.opcodes[122] = [];
    this.opcodes[122].opNext = 123;
    this.opcodes[122].type = TLS;
    this.opcodes[122].length = 1;
    this.opcodes[122].stringIndex = 59;

    this.opcodes[123] = [];
    this.opcodes[123].opNext = 124;
    this.opcodes[123].type = TLS;
    this.opcodes[123].length = 1;
    this.opcodes[123].stringIndex = 60;

    this.opcodes[124] = [];
    this.opcodes[124].opNext = 125;
    this.opcodes[124].type = TLS;
    this.opcodes[124].length = 1;
    this.opcodes[124].stringIndex = 61;

    this.opcodes[125] = [];
    this.opcodes[125].opNext = 126;
    this.opcodes[125].type = TLS;
    this.opcodes[125].length = 1;
    this.opcodes[125].stringIndex = 62;

    this.opcodes[126] = [];
    this.opcodes[126].opNext = 127;
    this.opcodes[126].type = TLS;
    this.opcodes[126].length = 1;
    this.opcodes[126].stringIndex = 63;

    this.opcodes[127] = [];
    this.opcodes[127].opNext = 128;
    this.opcodes[127].type = TLS;
    this.opcodes[127].length = 1;
    this.opcodes[127].stringIndex = 64;

    this.opcodes[128] = [];
    this.opcodes[128].opNext = 129;
    this.opcodes[128].type = TLS;
    this.opcodes[128].length = 1;
    this.opcodes[128].stringIndex = 65;

    this.opcodes[129] = [];
    this.opcodes[129].opNext = 130;
    this.opcodes[129].type = TLS;
    this.opcodes[129].length = 1;
    this.opcodes[129].stringIndex = 66;

    this.opcodes[130] = [];
    this.opcodes[130].opNext = 131;
    this.opcodes[130].type = TLS;
    this.opcodes[130].length = 1;
    this.opcodes[130].stringIndex = 67;

    this.opcodes[131] = [];
    this.opcodes[131].opNext = 132;
    this.opcodes[131].type = TLS;
    this.opcodes[131].length = 1;
    this.opcodes[131].stringIndex = 68;

    this.opcodes[132] = [];
    this.opcodes[132].opNext = 133;
    this.opcodes[132].type = TLS;
    this.opcodes[132].length = 1;
    this.opcodes[132].stringIndex = 69;

    this.opcodes[133] = [];
    this.opcodes[133].opNext = 134;
    this.opcodes[133].type = TLS;
    this.opcodes[133].length = 1;
    this.opcodes[133].stringIndex = 70;

    this.opcodes[134] = [];
    this.opcodes[134].opNext = 135;
    this.opcodes[134].type = TLS;
    this.opcodes[134].length = 1;
    this.opcodes[134].stringIndex = 71;

    this.opcodes[135] = [];
    this.opcodes[135].opNext = 136;
    this.opcodes[135].type = TRG;
    this.opcodes[135].min = 65;
    this.opcodes[135].max = 65;

    this.opcodes[136] = [];
    this.opcodes[136].opNext = 165;
    this.opcodes[136].type = ALT;

    this.opcodes[137] = [];
    this.opcodes[137].opNext = 138;
    this.opcodes[137].type = RNM;
    this.opcodes[137].ruleIndex = 26;

    this.opcodes[138] = [];
    this.opcodes[138].opNext = 139;
    this.opcodes[138].type = RNM;
    this.opcodes[138].ruleIndex = 25;

    this.opcodes[139] = [];
    this.opcodes[139].opNext = 140;
    this.opcodes[139].type = TLS;
    this.opcodes[139].length = 1;
    this.opcodes[139].stringIndex = 72;

    this.opcodes[140] = [];
    this.opcodes[140].opNext = 141;
    this.opcodes[140].type = TLS;
    this.opcodes[140].length = 1;
    this.opcodes[140].stringIndex = 73;

    this.opcodes[141] = [];
    this.opcodes[141].opNext = 142;
    this.opcodes[141].type = TLS;
    this.opcodes[141].length = 1;
    this.opcodes[141].stringIndex = 74;

    this.opcodes[142] = [];
    this.opcodes[142].opNext = 143;
    this.opcodes[142].type = TLS;
    this.opcodes[142].length = 1;
    this.opcodes[142].stringIndex = 75;

    this.opcodes[143] = [];
    this.opcodes[143].opNext = 144;
    this.opcodes[143].type = TLS;
    this.opcodes[143].length = 1;
    this.opcodes[143].stringIndex = 76;

    this.opcodes[144] = [];
    this.opcodes[144].opNext = 145;
    this.opcodes[144].type = TLS;
    this.opcodes[144].length = 1;
    this.opcodes[144].stringIndex = 77;

    this.opcodes[145] = [];
    this.opcodes[145].opNext = 146;
    this.opcodes[145].type = TLS;
    this.opcodes[145].length = 1;
    this.opcodes[145].stringIndex = 78;

    this.opcodes[146] = [];
    this.opcodes[146].opNext = 147;
    this.opcodes[146].type = TLS;
    this.opcodes[146].length = 1;
    this.opcodes[146].stringIndex = 79;

    this.opcodes[147] = [];
    this.opcodes[147].opNext = 148;
    this.opcodes[147].type = TLS;
    this.opcodes[147].length = 1;
    this.opcodes[147].stringIndex = 80;

    this.opcodes[148] = [];
    this.opcodes[148].opNext = 149;
    this.opcodes[148].type = TLS;
    this.opcodes[148].length = 1;
    this.opcodes[148].stringIndex = 81;

    this.opcodes[149] = [];
    this.opcodes[149].opNext = 150;
    this.opcodes[149].type = TLS;
    this.opcodes[149].length = 1;
    this.opcodes[149].stringIndex = 82;

    this.opcodes[150] = [];
    this.opcodes[150].opNext = 151;
    this.opcodes[150].type = TLS;
    this.opcodes[150].length = 1;
    this.opcodes[150].stringIndex = 83;

    this.opcodes[151] = [];
    this.opcodes[151].opNext = 152;
    this.opcodes[151].type = TLS;
    this.opcodes[151].length = 1;
    this.opcodes[151].stringIndex = 84;

    this.opcodes[152] = [];
    this.opcodes[152].opNext = 153;
    this.opcodes[152].type = TLS;
    this.opcodes[152].length = 1;
    this.opcodes[152].stringIndex = 85;

    this.opcodes[153] = [];
    this.opcodes[153].opNext = 154;
    this.opcodes[153].type = TLS;
    this.opcodes[153].length = 1;
    this.opcodes[153].stringIndex = 86;

    this.opcodes[154] = [];
    this.opcodes[154].opNext = 155;
    this.opcodes[154].type = TLS;
    this.opcodes[154].length = 1;
    this.opcodes[154].stringIndex = 87;

    this.opcodes[155] = [];
    this.opcodes[155].opNext = 156;
    this.opcodes[155].type = TLS;
    this.opcodes[155].length = 1;
    this.opcodes[155].stringIndex = 88;

    this.opcodes[156] = [];
    this.opcodes[156].opNext = 157;
    this.opcodes[156].type = TLS;
    this.opcodes[156].length = 1;
    this.opcodes[156].stringIndex = 89;

    this.opcodes[157] = [];
    this.opcodes[157].opNext = 158;
    this.opcodes[157].type = TLS;
    this.opcodes[157].length = 1;
    this.opcodes[157].stringIndex = 90;

    this.opcodes[158] = [];
    this.opcodes[158].opNext = 159;
    this.opcodes[158].type = TLS;
    this.opcodes[158].length = 1;
    this.opcodes[158].stringIndex = 91;

    this.opcodes[159] = [];
    this.opcodes[159].opNext = 160;
    this.opcodes[159].type = TLS;
    this.opcodes[159].length = 1;
    this.opcodes[159].stringIndex = 92;

    this.opcodes[160] = [];
    this.opcodes[160].opNext = 161;
    this.opcodes[160].type = TLS;
    this.opcodes[160].length = 1;
    this.opcodes[160].stringIndex = 93;

    this.opcodes[161] = [];
    this.opcodes[161].opNext = 162;
    this.opcodes[161].type = TLS;
    this.opcodes[161].length = 1;
    this.opcodes[161].stringIndex = 94;

    this.opcodes[162] = [];
    this.opcodes[162].opNext = 163;
    this.opcodes[162].type = TLS;
    this.opcodes[162].length = 1;
    this.opcodes[162].stringIndex = 95;

    this.opcodes[163] = [];
    this.opcodes[163].opNext = 164;
    this.opcodes[163].type = TLS;
    this.opcodes[163].length = 1;
    this.opcodes[163].stringIndex = 96;

    this.opcodes[164] = [];
    this.opcodes[164].opNext = 165;
    this.opcodes[164].type = TRG;
    this.opcodes[164].min = 65;
    this.opcodes[164].max = 65;

    this.opcodes[165] = [];
    this.opcodes[165].opNext = 180;
    this.opcodes[165].type = ALT;

    this.opcodes[166] = [];
    this.opcodes[166].opNext = 167;
    this.opcodes[166].type = TLS;
    this.opcodes[166].length = 1;
    this.opcodes[166].stringIndex = 97;

    this.opcodes[167] = [];
    this.opcodes[167].opNext = 168;
    this.opcodes[167].type = TLS;
    this.opcodes[167].length = 1;
    this.opcodes[167].stringIndex = 98;

    this.opcodes[168] = [];
    this.opcodes[168].opNext = 169;
    this.opcodes[168].type = TLS;
    this.opcodes[168].length = 1;
    this.opcodes[168].stringIndex = 99;

    this.opcodes[169] = [];
    this.opcodes[169].opNext = 170;
    this.opcodes[169].type = TLS;
    this.opcodes[169].length = 1;
    this.opcodes[169].stringIndex = 100;

    this.opcodes[170] = [];
    this.opcodes[170].opNext = 171;
    this.opcodes[170].type = TLS;
    this.opcodes[170].length = 1;
    this.opcodes[170].stringIndex = 101;

    this.opcodes[171] = [];
    this.opcodes[171].opNext = 172;
    this.opcodes[171].type = TLS;
    this.opcodes[171].length = 1;
    this.opcodes[171].stringIndex = 102;

    this.opcodes[172] = [];
    this.opcodes[172].opNext = 173;
    this.opcodes[172].type = TLS;
    this.opcodes[172].length = 1;
    this.opcodes[172].stringIndex = 103;

    this.opcodes[173] = [];
    this.opcodes[173].opNext = 174;
    this.opcodes[173].type = TLS;
    this.opcodes[173].length = 1;
    this.opcodes[173].stringIndex = 104;

    this.opcodes[174] = [];
    this.opcodes[174].opNext = 175;
    this.opcodes[174].type = TLS;
    this.opcodes[174].length = 1;
    this.opcodes[174].stringIndex = 105;

    this.opcodes[175] = [];
    this.opcodes[175].opNext = 176;
    this.opcodes[175].type = TLS;
    this.opcodes[175].length = 1;
    this.opcodes[175].stringIndex = 106;

    this.opcodes[176] = [];
    this.opcodes[176].opNext = 177;
    this.opcodes[176].type = TLS;
    this.opcodes[176].length = 1;
    this.opcodes[176].stringIndex = 107;

    this.opcodes[177] = [];
    this.opcodes[177].opNext = 178;
    this.opcodes[177].type = TLS;
    this.opcodes[177].length = 1;
    this.opcodes[177].stringIndex = 108;

    this.opcodes[178] = [];
    this.opcodes[178].opNext = 179;
    this.opcodes[178].type = TLS;
    this.opcodes[178].length = 1;
    this.opcodes[178].stringIndex = 109;

    this.opcodes[179] = [];
    this.opcodes[179].opNext = 180;
    this.opcodes[179].type = TLS;
    this.opcodes[179].length = 1;
    this.opcodes[179].stringIndex = 110;

    this.opcodes[180] = [];
    this.opcodes[180].opNext = 187;
    this.opcodes[180].type = ALT;

    this.opcodes[181] = [];
    this.opcodes[181].opNext = 182;
    this.opcodes[181].type = TLS;
    this.opcodes[181].length = 1;
    this.opcodes[181].stringIndex = 111;

    this.opcodes[182] = [];
    this.opcodes[182].opNext = 183;
    this.opcodes[182].type = TLS;
    this.opcodes[182].length = 1;
    this.opcodes[182].stringIndex = 112;

    this.opcodes[183] = [];
    this.opcodes[183].opNext = 184;
    this.opcodes[183].type = TLS;
    this.opcodes[183].length = 1;
    this.opcodes[183].stringIndex = 113;

    this.opcodes[184] = [];
    this.opcodes[184].opNext = 185;
    this.opcodes[184].type = TLS;
    this.opcodes[184].length = 1;
    this.opcodes[184].stringIndex = 114;

    this.opcodes[185] = [];
    this.opcodes[185].opNext = 186;
    this.opcodes[185].type = TLS;
    this.opcodes[185].length = 1;
    this.opcodes[185].stringIndex = 115;

    this.opcodes[186] = [];
    this.opcodes[186].opNext = 187;
    this.opcodes[186].type = TLS;
    this.opcodes[186].length = 1;
    this.opcodes[186].stringIndex = 116;

    this.opcodes[187] = [];
    this.opcodes[187].opNext = 189;
    this.opcodes[187].type = REP;
    this.opcodes[187].min = 1;
    this.opcodes[187].max = Infinity;

    this.opcodes[188] = [];
    this.opcodes[188].opNext = 189;
    this.opcodes[188].type = RNM;
    this.opcodes[188].ruleIndex = 25;

    this.opcodes[189] = [];
    this.opcodes[189].opNext = 191;
    this.opcodes[189].type = REP;
    this.opcodes[189].min = 1;
    this.opcodes[189].max = Infinity;

    this.opcodes[190] = [];
    this.opcodes[190].opNext = 191;
    this.opcodes[190].type = RNM;
    this.opcodes[190].ruleIndex = 25;

    this.opcodes[191] = [];
    this.opcodes[191].opNext = 195;
    this.opcodes[191].type = ALT;

    this.opcodes[192] = [];
    this.opcodes[192].opNext = 193;
    this.opcodes[192].type = RNM;
    this.opcodes[192].ruleIndex = 25;

    this.opcodes[193] = [];
    this.opcodes[193].opNext = 194;
    this.opcodes[193].type = TRG;
    this.opcodes[193].min = 97;
    this.opcodes[193].max = 101;

    this.opcodes[194] = [];
    this.opcodes[194].opNext = 195;
    this.opcodes[194].type = TRG;
    this.opcodes[194].min = 65;
    this.opcodes[194].max = 69;

    this.opcodes[195] = [];
    this.opcodes[195].opNext = 196;
    this.opcodes[195].type = TRG;
    this.opcodes[195].min = 48;
    this.opcodes[195].max = 57;

    this.opcodes[196] = [];
    this.opcodes[196].opNext = 199;
    this.opcodes[196].type = ALT;

    this.opcodes[197] = [];
    this.opcodes[197].opNext = 198;
    this.opcodes[197].type = TRG;
    this.opcodes[197].min = 65;
    this.opcodes[197].max = 90;

    this.opcodes[198] = [];
    this.opcodes[198].opNext = 199;
    this.opcodes[198].type = TRG;
    this.opcodes[198].min = 97;
    this.opcodes[198].max = 122;

}
