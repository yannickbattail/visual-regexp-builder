/********************************************************************
  APG - an ABNF Parser Generator
  Copyright (C) 2009 Coast to Coast Research, Inc.
 
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 2 of the License, or
  (at your option) any later version.
  
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see
  <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
  or write to the Free Software Foundation, Inc.,
  51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
  
	 created: Mon Feb 10 13:04:45 2014
	filename: regexpParser.js
	  author: Lowell Thomas
	          lowell@coasttocoastresearch.com
	          http://www.coasttocoastresearch.com

	 purpose: APG JavaScript opcodes regexpParser.

*********************************************************************/
"use strict";
function regexpParser()
{
    // SUMMARY:
    // string table length: 129
    //               rules: 17
    //             opcodes: 214

    // string table
    this.stringTable = [];
    this.stringTable[0] = 47;
    this.stringTable[1] = 94;
    this.stringTable[2] = 36;
    this.stringTable[3] = 47;
    this.stringTable[4] = 103;
    this.stringTable[5] = 105;
    this.stringTable[6] = 109;
    this.stringTable[7] = 124;
    this.stringTable[8] = 92;
    this.stringTable[9] = 102;
    this.stringTable[10] = 110;
    this.stringTable[11] = 114;
    this.stringTable[12] = 116;
    this.stringTable[13] = 117;
    this.stringTable[14] = 98;
    this.stringTable[15] = 100;
    this.stringTable[16] = 115;
    this.stringTable[17] = 119;
    this.stringTable[18] = 98;
    this.stringTable[19] = 100;
    this.stringTable[20] = 115;
    this.stringTable[21] = 119;
    this.stringTable[22] = 40;
    this.stringTable[23] = 63;
    this.stringTable[24] = 58;
    this.stringTable[25] = 61;
    this.stringTable[26] = 33;
    this.stringTable[27] = 41;
    this.stringTable[28] = 91;
    this.stringTable[29] = 94;
    this.stringTable[30] = 45;
    this.stringTable[31] = 93;
    this.stringTable[32] = 92;
    this.stringTable[33] = 98;
    this.stringTable[34] = 102;
    this.stringTable[35] = 110;
    this.stringTable[36] = 114;
    this.stringTable[37] = 116;
    this.stringTable[38] = 117;
    this.stringTable[39] = 100;
    this.stringTable[40] = 115;
    this.stringTable[41] = 119;
    this.stringTable[42] = 100;
    this.stringTable[43] = 115;
    this.stringTable[44] = 119;
    this.stringTable[45] = 63;
    this.stringTable[46] = 42;
    this.stringTable[47] = 43;
    this.stringTable[48] = 123;
    this.stringTable[49] = 44;
    this.stringTable[50] = 125;
    this.stringTable[51] = 63;
    this.stringTable[52] = 35;
    this.stringTable[53] = 37;
    this.stringTable[54] = 38;
    this.stringTable[55] = 33;
    this.stringTable[56] = 39;
    this.stringTable[57] = 44;
    this.stringTable[58] = 45;
    this.stringTable[59] = 58;
    this.stringTable[60] = 59;
    this.stringTable[61] = 60;
    this.stringTable[62] = 61;
    this.stringTable[63] = 62;
    this.stringTable[64] = 64;
    this.stringTable[65] = 95;
    this.stringTable[66] = 96;
    this.stringTable[67] = 126;
    this.stringTable[68] = 46;
    this.stringTable[69] = 123;
    this.stringTable[70] = 125;
    this.stringTable[71] = 40;
    this.stringTable[72] = 41;
    this.stringTable[73] = 46;
    this.stringTable[74] = 36;
    this.stringTable[75] = 43;
    this.stringTable[76] = 42;
    this.stringTable[77] = 63;
    this.stringTable[78] = 124;
    this.stringTable[79] = 35;
    this.stringTable[80] = 37;
    this.stringTable[81] = 38;
    this.stringTable[82] = 33;
    this.stringTable[83] = 39;
    this.stringTable[84] = 44;
    this.stringTable[85] = 58;
    this.stringTable[86] = 59;
    this.stringTable[87] = 60;
    this.stringTable[88] = 61;
    this.stringTable[89] = 62;
    this.stringTable[90] = 64;
    this.stringTable[91] = 95;
    this.stringTable[92] = 96;
    this.stringTable[93] = 126;
    this.stringTable[94] = 91;
    this.stringTable[95] = 92;
    this.stringTable[96] = 93;
    this.stringTable[97] = 94;
    this.stringTable[98] = 47;
    this.stringTable[99] = 123;
    this.stringTable[100] = 125;
    this.stringTable[101] = 40;
    this.stringTable[102] = 41;
    this.stringTable[103] = 63;
    this.stringTable[104] = 43;
    this.stringTable[105] = 42;
    this.stringTable[106] = 124;
    this.stringTable[107] = 46;
    this.stringTable[108] = 94;
    this.stringTable[109] = 36;
    this.stringTable[110] = 32;
    this.stringTable[111] = 45;
    this.stringTable[112] = 91;
    this.stringTable[113] = 92;
    this.stringTable[114] = 93;
    this.stringTable[115] = 94;
    this.stringTable[116] = 32;
    this.stringTable[117] = 97;
    this.stringTable[118] = 98;
    this.stringTable[119] = 99;
    this.stringTable[120] = 100;
    this.stringTable[121] = 101;
    this.stringTable[122] = 102;
    this.stringTable[123] = 97;
    this.stringTable[124] = 98;
    this.stringTable[125] = 99;
    this.stringTable[126] = 100;
    this.stringTable[127] = 101;
    this.stringTable[128] = 102;

    // rule identifiers
    this.ruleIds = [];
    this.ruleIds.regepliteral = 0;
    this.ruleIds.regexpchoice = 1;
    this.ruleIds.regexpsequence = 2;
    this.ruleIds.regexpfactor = 3;
    this.ruleIds.regexpescape = 4;
    this.ruleIds.regexpgroup = 5;
    this.ruleIds.regexpclass = 6;
    this.ruleIds.regexpclassescape = 7;
    this.ruleIds.regexpquantifier = 8;
    this.ruleIds.charfactor = 9;
    this.ruleIds.charclass = 10;
    this.ruleIds.charspecialfactor = 11;
    this.ruleIds.charspecial = 12;
    this.ruleIds.integer = 13;
    this.ruleIds.hexdig = 14;
    this.ruleIds.digit = 15;
    this.ruleIds.alpha = 16;

    // rule identifiers (alphabetical)
    this.ruleIds[0] = 16; // ALPHA
    this.ruleIds[1] = 10; // charclass
    this.ruleIds[2] = 9; // charfactor
    this.ruleIds[3] = 12; // charspecial
    this.ruleIds[4] = 11; // charspecialfactor
    this.ruleIds[5] = 15; // DIGIT
    this.ruleIds[6] = 14; // HEXDIG
    this.ruleIds[7] = 13; // integer
    this.ruleIds[8] = 0; // regepliteral
    this.ruleIds[9] = 1; // regexpchoice
    this.ruleIds[10] = 7; // regexpclassescape
    this.ruleIds[11] = 6; // regexpclass
    this.ruleIds[12] = 4; // regexpescape
    this.ruleIds[13] = 3; // regexpfactor
    this.ruleIds[14] = 5; // regexpgroup
    this.ruleIds[15] = 8; // regexpquantifier
    this.ruleIds[16] = 2; // regexpsequence

    // rules
    this.rules = [];
    this.rules[0] = [];
    this.rules[0].rule = 'regepliteral';
    this.rules[0].lower = 'regepliteral';
    this.rules[0].syntax = null;
    this.rules[0].semantic = null;
    this.rules[0].opcodeIndex = 0;

    this.rules[1] = [];
    this.rules[1].rule = 'regexpchoice';
    this.rules[1].lower = 'regexpchoice';
    this.rules[1].syntax = null;
    this.rules[1].semantic = null;
    this.rules[1].opcodeIndex = 14;

    this.rules[2] = [];
    this.rules[2].rule = 'regexpsequence';
    this.rules[2].lower = 'regexpsequence';
    this.rules[2].syntax = null;
    this.rules[2].semantic = null;
    this.rules[2].opcodeIndex = 20;

    this.rules[3] = [];
    this.rules[3].rule = 'regexpfactor';
    this.rules[3].lower = 'regexpfactor';
    this.rules[3].syntax = null;
    this.rules[3].semantic = null;
    this.rules[3].opcodeIndex = 25;

    this.rules[4] = [];
    this.rules[4].rule = 'regexpescape';
    this.rules[4].lower = 'regexpescape';
    this.rules[4].syntax = null;
    this.rules[4].semantic = null;
    this.rules[4].opcodeIndex = 30;

    this.rules[5] = [];
    this.rules[5].rule = 'regexpgroup';
    this.rules[5].lower = 'regexpgroup';
    this.rules[5].syntax = null;
    this.rules[5].semantic = null;
    this.rules[5].opcodeIndex = 53;

    this.rules[6] = [];
    this.rules[6].rule = 'regexpclass';
    this.rules[6].lower = 'regexpclass';
    this.rules[6].syntax = null;
    this.rules[6].semantic = null;
    this.rules[6].opcodeIndex = 65;

    this.rules[7] = [];
    this.rules[7].rule = 'regexpclassescape';
    this.rules[7].lower = 'regexpclassescape';
    this.rules[7].syntax = null;
    this.rules[7].semantic = null;
    this.rules[7].opcodeIndex = 83;

    this.rules[8] = [];
    this.rules[8].rule = 'regexpquantifier';
    this.rules[8].lower = 'regexpquantifier';
    this.rules[8].syntax = null;
    this.rules[8].semantic = null;
    this.rules[8].opcodeIndex = 105;

    this.rules[9] = [];
    this.rules[9].rule = 'charfactor';
    this.rules[9].lower = 'charfactor';
    this.rules[9].syntax = null;
    this.rules[9].semantic = null;
    this.rules[9].opcodeIndex = 121;

    this.rules[10] = [];
    this.rules[10].rule = 'charclass';
    this.rules[10].lower = 'charclass';
    this.rules[10].syntax = null;
    this.rules[10].semantic = null;
    this.rules[10].opcodeIndex = 141;

    this.rules[11] = [];
    this.rules[11].rule = 'charspecialfactor';
    this.rules[11].lower = 'charspecialfactor';
    this.rules[11].syntax = null;
    this.rules[11].semantic = null;
    this.rules[11].opcodeIndex = 169;

    this.rules[12] = [];
    this.rules[12].rule = 'charspecial';
    this.rules[12].lower = 'charspecial';
    this.rules[12].syntax = null;
    this.rules[12].semantic = null;
    this.rules[12].opcodeIndex = 187;

    this.rules[13] = [];
    this.rules[13].rule = 'integer';
    this.rules[13].lower = 'integer';
    this.rules[13].syntax = null;
    this.rules[13].semantic = null;
    this.rules[13].opcodeIndex = 194;

    this.rules[14] = [];
    this.rules[14].rule = 'HEXDIG';
    this.rules[14].lower = 'hexdig';
    this.rules[14].syntax = null;
    this.rules[14].semantic = null;
    this.rules[14].opcodeIndex = 196;

    this.rules[15] = [];
    this.rules[15].rule = 'DIGIT';
    this.rules[15].lower = 'digit';
    this.rules[15].syntax = null;
    this.rules[15].semantic = null;
    this.rules[15].opcodeIndex = 210;

    this.rules[16] = [];
    this.rules[16].rule = 'ALPHA';
    this.rules[16].lower = 'alpha';
    this.rules[16].syntax = null;
    this.rules[16].semantic = null;
    this.rules[16].opcodeIndex = 211;


    // opcodes
    this.opcodes = [];
    this.opcodes[0] = [];
    this.opcodes[0].opNext = 14;
    this.opcodes[0].type = CAT;

    this.opcodes[1] = [];
    this.opcodes[1].opNext = 2;
    this.opcodes[1].type = TLS;
    this.opcodes[1].length = 1;
    this.opcodes[1].stringIndex = 0;

    this.opcodes[2] = [];
    this.opcodes[2].opNext = 4;
    this.opcodes[2].type = REP;
    this.opcodes[2].min = 0;
    this.opcodes[2].max = 1;

    this.opcodes[3] = [];
    this.opcodes[3].opNext = 4;
    this.opcodes[3].type = TLS;
    this.opcodes[3].length = 1;
    this.opcodes[3].stringIndex = 1;

    this.opcodes[4] = [];
    this.opcodes[4].opNext = 5;
    this.opcodes[4].type = RNM;
    this.opcodes[4].ruleIndex = 1;

    this.opcodes[5] = [];
    this.opcodes[5].opNext = 7;
    this.opcodes[5].type = REP;
    this.opcodes[5].min = 0;
    this.opcodes[5].max = 1;

    this.opcodes[6] = [];
    this.opcodes[6].opNext = 7;
    this.opcodes[6].type = TLS;
    this.opcodes[6].length = 1;
    this.opcodes[6].stringIndex = 2;

    this.opcodes[7] = [];
    this.opcodes[7].opNext = 8;
    this.opcodes[7].type = TLS;
    this.opcodes[7].length = 1;
    this.opcodes[7].stringIndex = 3;

    this.opcodes[8] = [];
    this.opcodes[8].opNext = 10;
    this.opcodes[8].type = REP;
    this.opcodes[8].min = 0;
    this.opcodes[8].max = 1;

    this.opcodes[9] = [];
    this.opcodes[9].opNext = 10;
    this.opcodes[9].type = TLS;
    this.opcodes[9].length = 1;
    this.opcodes[9].stringIndex = 4;

    this.opcodes[10] = [];
    this.opcodes[10].opNext = 12;
    this.opcodes[10].type = REP;
    this.opcodes[10].min = 0;
    this.opcodes[10].max = 1;

    this.opcodes[11] = [];
    this.opcodes[11].opNext = 12;
    this.opcodes[11].type = TLS;
    this.opcodes[11].length = 1;
    this.opcodes[11].stringIndex = 5;

    this.opcodes[12] = [];
    this.opcodes[12].opNext = 14;
    this.opcodes[12].type = REP;
    this.opcodes[12].min = 0;
    this.opcodes[12].max = 1;

    this.opcodes[13] = [];
    this.opcodes[13].opNext = 14;
    this.opcodes[13].type = TLS;
    this.opcodes[13].length = 1;
    this.opcodes[13].stringIndex = 6;

    this.opcodes[14] = [];
    this.opcodes[14].opNext = 20;
    this.opcodes[14].type = CAT;

    this.opcodes[15] = [];
    this.opcodes[15].opNext = 16;
    this.opcodes[15].type = RNM;
    this.opcodes[15].ruleIndex = 2;

    this.opcodes[16] = [];
    this.opcodes[16].opNext = 20;
    this.opcodes[16].type = REP;
    this.opcodes[16].min = 0;
    this.opcodes[16].max = 4294967295;

    this.opcodes[17] = [];
    this.opcodes[17].opNext = 20;
    this.opcodes[17].type = CAT;

    this.opcodes[18] = [];
    this.opcodes[18].opNext = 19;
    this.opcodes[18].type = TLS;
    this.opcodes[18].length = 1;
    this.opcodes[18].stringIndex = 7;

    this.opcodes[19] = [];
    this.opcodes[19].opNext = 20;
    this.opcodes[19].type = RNM;
    this.opcodes[19].ruleIndex = 2;

    this.opcodes[20] = [];
    this.opcodes[20].opNext = 25;
    this.opcodes[20].type = REP;
    this.opcodes[20].min = 1;
    this.opcodes[20].max = 4294967295;

    this.opcodes[21] = [];
    this.opcodes[21].opNext = 25;
    this.opcodes[21].type = CAT;

    this.opcodes[22] = [];
    this.opcodes[22].opNext = 23;
    this.opcodes[22].type = RNM;
    this.opcodes[22].ruleIndex = 3;

    this.opcodes[23] = [];
    this.opcodes[23].opNext = 25;
    this.opcodes[23].type = REP;
    this.opcodes[23].min = 0;
    this.opcodes[23].max = 1;

    this.opcodes[24] = [];
    this.opcodes[24].opNext = 25;
    this.opcodes[24].type = RNM;
    this.opcodes[24].ruleIndex = 8;

    this.opcodes[25] = [];
    this.opcodes[25].opNext = 30;
    this.opcodes[25].type = ALT;

    this.opcodes[26] = [];
    this.opcodes[26].opNext = 27;
    this.opcodes[26].type = RNM;
    this.opcodes[26].ruleIndex = 9;

    this.opcodes[27] = [];
    this.opcodes[27].opNext = 28;
    this.opcodes[27].type = RNM;
    this.opcodes[27].ruleIndex = 4;

    this.opcodes[28] = [];
    this.opcodes[28].opNext = 29;
    this.opcodes[28].type = RNM;
    this.opcodes[28].ruleIndex = 6;

    this.opcodes[29] = [];
    this.opcodes[29].opNext = 30;
    this.opcodes[29].type = RNM;
    this.opcodes[29].ruleIndex = 5;

    this.opcodes[30] = [];
    this.opcodes[30].opNext = 53;
    this.opcodes[30].type = CAT;

    this.opcodes[31] = [];
    this.opcodes[31].opNext = 32;
    this.opcodes[31].type = TLS;
    this.opcodes[31].length = 1;
    this.opcodes[31].stringIndex = 8;

    this.opcodes[32] = [];
    this.opcodes[32].opNext = 53;
    this.opcodes[32].type = ALT;

    this.opcodes[33] = [];
    this.opcodes[33].opNext = 34;
    this.opcodes[33].type = TLS;
    this.opcodes[33].length = 1;
    this.opcodes[33].stringIndex = 9;

    this.opcodes[34] = [];
    this.opcodes[34].opNext = 35;
    this.opcodes[34].type = TLS;
    this.opcodes[34].length = 1;
    this.opcodes[34].stringIndex = 10;

    this.opcodes[35] = [];
    this.opcodes[35].opNext = 36;
    this.opcodes[35].type = TLS;
    this.opcodes[35].length = 1;
    this.opcodes[35].stringIndex = 11;

    this.opcodes[36] = [];
    this.opcodes[36].opNext = 37;
    this.opcodes[36].type = TLS;
    this.opcodes[36].length = 1;
    this.opcodes[36].stringIndex = 12;

    this.opcodes[37] = [];
    this.opcodes[37].opNext = 43;
    this.opcodes[37].type = CAT;

    this.opcodes[38] = [];
    this.opcodes[38].opNext = 39;
    this.opcodes[38].type = TLS;
    this.opcodes[38].length = 1;
    this.opcodes[38].stringIndex = 13;

    this.opcodes[39] = [];
    this.opcodes[39].opNext = 40;
    this.opcodes[39].type = RNM;
    this.opcodes[39].ruleIndex = 14;

    this.opcodes[40] = [];
    this.opcodes[40].opNext = 41;
    this.opcodes[40].type = RNM;
    this.opcodes[40].ruleIndex = 14;

    this.opcodes[41] = [];
    this.opcodes[41].opNext = 42;
    this.opcodes[41].type = RNM;
    this.opcodes[41].ruleIndex = 14;

    this.opcodes[42] = [];
    this.opcodes[42].opNext = 43;
    this.opcodes[42].type = RNM;
    this.opcodes[42].ruleIndex = 14;

    this.opcodes[43] = [];
    this.opcodes[43].opNext = 44;
    this.opcodes[43].type = TLS;
    this.opcodes[43].length = 1;
    this.opcodes[43].stringIndex = 14;

    this.opcodes[44] = [];
    this.opcodes[44].opNext = 45;
    this.opcodes[44].type = TLS;
    this.opcodes[44].length = 1;
    this.opcodes[44].stringIndex = 15;

    this.opcodes[45] = [];
    this.opcodes[45].opNext = 46;
    this.opcodes[45].type = TLS;
    this.opcodes[45].length = 1;
    this.opcodes[45].stringIndex = 16;

    this.opcodes[46] = [];
    this.opcodes[46].opNext = 47;
    this.opcodes[46].type = TLS;
    this.opcodes[46].length = 1;
    this.opcodes[46].stringIndex = 17;

    this.opcodes[47] = [];
    this.opcodes[47].opNext = 48;
    this.opcodes[47].type = TLS;
    this.opcodes[47].length = 1;
    this.opcodes[47].stringIndex = 18;

    this.opcodes[48] = [];
    this.opcodes[48].opNext = 49;
    this.opcodes[48].type = TLS;
    this.opcodes[48].length = 1;
    this.opcodes[48].stringIndex = 19;

    this.opcodes[49] = [];
    this.opcodes[49].opNext = 50;
    this.opcodes[49].type = TLS;
    this.opcodes[49].length = 1;
    this.opcodes[49].stringIndex = 20;

    this.opcodes[50] = [];
    this.opcodes[50].opNext = 51;
    this.opcodes[50].type = TLS;
    this.opcodes[50].length = 1;
    this.opcodes[50].stringIndex = 21;

    this.opcodes[51] = [];
    this.opcodes[51].opNext = 52;
    this.opcodes[51].type = RNM;
    this.opcodes[51].ruleIndex = 11;

    this.opcodes[52] = [];
    this.opcodes[52].opNext = 53;
    this.opcodes[52].type = RNM;
    this.opcodes[52].ruleIndex = 15;

    this.opcodes[53] = [];
    this.opcodes[53].opNext = 65;
    this.opcodes[53].type = CAT;

    this.opcodes[54] = [];
    this.opcodes[54].opNext = 55;
    this.opcodes[54].type = TLS;
    this.opcodes[54].length = 1;
    this.opcodes[54].stringIndex = 22;

    this.opcodes[55] = [];
    this.opcodes[55].opNext = 63;
    this.opcodes[55].type = REP;
    this.opcodes[55].min = 0;
    this.opcodes[55].max = 1;

    this.opcodes[56] = [];
    this.opcodes[56].opNext = 63;
    this.opcodes[56].type = CAT;

    this.opcodes[57] = [];
    this.opcodes[57].opNext = 58;
    this.opcodes[57].type = TLS;
    this.opcodes[57].length = 1;
    this.opcodes[57].stringIndex = 23;

    this.opcodes[58] = [];
    this.opcodes[58].opNext = 63;
    this.opcodes[58].type = REP;
    this.opcodes[58].min = 0;
    this.opcodes[58].max = 1;

    this.opcodes[59] = [];
    this.opcodes[59].opNext = 63;
    this.opcodes[59].type = ALT;

    this.opcodes[60] = [];
    this.opcodes[60].opNext = 61;
    this.opcodes[60].type = TLS;
    this.opcodes[60].length = 1;
    this.opcodes[60].stringIndex = 24;

    this.opcodes[61] = [];
    this.opcodes[61].opNext = 62;
    this.opcodes[61].type = TLS;
    this.opcodes[61].length = 1;
    this.opcodes[61].stringIndex = 25;

    this.opcodes[62] = [];
    this.opcodes[62].opNext = 63;
    this.opcodes[62].type = TLS;
    this.opcodes[62].length = 1;
    this.opcodes[62].stringIndex = 26;

    this.opcodes[63] = [];
    this.opcodes[63].opNext = 64;
    this.opcodes[63].type = RNM;
    this.opcodes[63].ruleIndex = 1;

    this.opcodes[64] = [];
    this.opcodes[64].opNext = 65;
    this.opcodes[64].type = TLS;
    this.opcodes[64].length = 1;
    this.opcodes[64].stringIndex = 27;

    this.opcodes[65] = [];
    this.opcodes[65].opNext = 83;
    this.opcodes[65].type = CAT;

    this.opcodes[66] = [];
    this.opcodes[66].opNext = 67;
    this.opcodes[66].type = TLS;
    this.opcodes[66].length = 1;
    this.opcodes[66].stringIndex = 28;

    this.opcodes[67] = [];
    this.opcodes[67].opNext = 69;
    this.opcodes[67].type = REP;
    this.opcodes[67].min = 0;
    this.opcodes[67].max = 1;

    this.opcodes[68] = [];
    this.opcodes[68].opNext = 69;
    this.opcodes[68].type = TLS;
    this.opcodes[68].length = 1;
    this.opcodes[68].stringIndex = 29;

    this.opcodes[69] = [];
    this.opcodes[69].opNext = 82;
    this.opcodes[69].type = REP;
    this.opcodes[69].min = 1;
    this.opcodes[69].max = 4294967295;

    this.opcodes[70] = [];
    this.opcodes[70].opNext = 82;
    this.opcodes[70].type = CAT;

    this.opcodes[71] = [];
    this.opcodes[71].opNext = 75;
    this.opcodes[71].type = REP;
    this.opcodes[71].min = 1;
    this.opcodes[71].max = 4294967295;

    this.opcodes[72] = [];
    this.opcodes[72].opNext = 75;
    this.opcodes[72].type = ALT;

    this.opcodes[73] = [];
    this.opcodes[73].opNext = 74;
    this.opcodes[73].type = RNM;
    this.opcodes[73].ruleIndex = 10;

    this.opcodes[74] = [];
    this.opcodes[74].opNext = 75;
    this.opcodes[74].type = RNM;
    this.opcodes[74].ruleIndex = 7;

    this.opcodes[75] = [];
    this.opcodes[75].opNext = 82;
    this.opcodes[75].type = REP;
    this.opcodes[75].min = 0;
    this.opcodes[75].max = 1;

    this.opcodes[76] = [];
    this.opcodes[76].opNext = 82;
    this.opcodes[76].type = CAT;

    this.opcodes[77] = [];
    this.opcodes[77].opNext = 78;
    this.opcodes[77].type = TLS;
    this.opcodes[77].length = 1;
    this.opcodes[77].stringIndex = 30;

    this.opcodes[78] = [];
    this.opcodes[78].opNext = 82;
    this.opcodes[78].type = REP;
    this.opcodes[78].min = 1;
    this.opcodes[78].max = 4294967295;

    this.opcodes[79] = [];
    this.opcodes[79].opNext = 82;
    this.opcodes[79].type = ALT;

    this.opcodes[80] = [];
    this.opcodes[80].opNext = 81;
    this.opcodes[80].type = RNM;
    this.opcodes[80].ruleIndex = 10;

    this.opcodes[81] = [];
    this.opcodes[81].opNext = 82;
    this.opcodes[81].type = RNM;
    this.opcodes[81].ruleIndex = 7;

    this.opcodes[82] = [];
    this.opcodes[82].opNext = 83;
    this.opcodes[82].type = TLS;
    this.opcodes[82].length = 1;
    this.opcodes[82].stringIndex = 31;

    this.opcodes[83] = [];
    this.opcodes[83].opNext = 105;
    this.opcodes[83].type = CAT;

    this.opcodes[84] = [];
    this.opcodes[84].opNext = 85;
    this.opcodes[84].type = TLS;
    this.opcodes[84].length = 1;
    this.opcodes[84].stringIndex = 32;

    this.opcodes[85] = [];
    this.opcodes[85].opNext = 105;
    this.opcodes[85].type = ALT;

    this.opcodes[86] = [];
    this.opcodes[86].opNext = 87;
    this.opcodes[86].type = TLS;
    this.opcodes[86].length = 1;
    this.opcodes[86].stringIndex = 33;

    this.opcodes[87] = [];
    this.opcodes[87].opNext = 88;
    this.opcodes[87].type = TLS;
    this.opcodes[87].length = 1;
    this.opcodes[87].stringIndex = 34;

    this.opcodes[88] = [];
    this.opcodes[88].opNext = 89;
    this.opcodes[88].type = TLS;
    this.opcodes[88].length = 1;
    this.opcodes[88].stringIndex = 35;

    this.opcodes[89] = [];
    this.opcodes[89].opNext = 90;
    this.opcodes[89].type = TLS;
    this.opcodes[89].length = 1;
    this.opcodes[89].stringIndex = 36;

    this.opcodes[90] = [];
    this.opcodes[90].opNext = 91;
    this.opcodes[90].type = TLS;
    this.opcodes[90].length = 1;
    this.opcodes[90].stringIndex = 37;

    this.opcodes[91] = [];
    this.opcodes[91].opNext = 97;
    this.opcodes[91].type = CAT;

    this.opcodes[92] = [];
    this.opcodes[92].opNext = 93;
    this.opcodes[92].type = TLS;
    this.opcodes[92].length = 1;
    this.opcodes[92].stringIndex = 38;

    this.opcodes[93] = [];
    this.opcodes[93].opNext = 94;
    this.opcodes[93].type = RNM;
    this.opcodes[93].ruleIndex = 14;

    this.opcodes[94] = [];
    this.opcodes[94].opNext = 95;
    this.opcodes[94].type = RNM;
    this.opcodes[94].ruleIndex = 14;

    this.opcodes[95] = [];
    this.opcodes[95].opNext = 96;
    this.opcodes[95].type = RNM;
    this.opcodes[95].ruleIndex = 14;

    this.opcodes[96] = [];
    this.opcodes[96].opNext = 97;
    this.opcodes[96].type = RNM;
    this.opcodes[96].ruleIndex = 14;

    this.opcodes[97] = [];
    this.opcodes[97].opNext = 98;
    this.opcodes[97].type = TLS;
    this.opcodes[97].length = 1;
    this.opcodes[97].stringIndex = 39;

    this.opcodes[98] = [];
    this.opcodes[98].opNext = 99;
    this.opcodes[98].type = TLS;
    this.opcodes[98].length = 1;
    this.opcodes[98].stringIndex = 40;

    this.opcodes[99] = [];
    this.opcodes[99].opNext = 100;
    this.opcodes[99].type = TLS;
    this.opcodes[99].length = 1;
    this.opcodes[99].stringIndex = 41;

    this.opcodes[100] = [];
    this.opcodes[100].opNext = 101;
    this.opcodes[100].type = TLS;
    this.opcodes[100].length = 1;
    this.opcodes[100].stringIndex = 42;

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
    this.opcodes[103].type = RNM;
    this.opcodes[103].ruleIndex = 12;

    this.opcodes[104] = [];
    this.opcodes[104].opNext = 105;
    this.opcodes[104].type = RNM;
    this.opcodes[104].ruleIndex = 15;

    this.opcodes[105] = [];
    this.opcodes[105].opNext = 121;
    this.opcodes[105].type = CAT;

    this.opcodes[106] = [];
    this.opcodes[106].opNext = 119;
    this.opcodes[106].type = ALT;

    this.opcodes[107] = [];
    this.opcodes[107].opNext = 108;
    this.opcodes[107].type = TLS;
    this.opcodes[107].length = 1;
    this.opcodes[107].stringIndex = 45;

    this.opcodes[108] = [];
    this.opcodes[108].opNext = 109;
    this.opcodes[108].type = TLS;
    this.opcodes[108].length = 1;
    this.opcodes[108].stringIndex = 46;

    this.opcodes[109] = [];
    this.opcodes[109].opNext = 110;
    this.opcodes[109].type = TLS;
    this.opcodes[109].length = 1;
    this.opcodes[109].stringIndex = 47;

    this.opcodes[110] = [];
    this.opcodes[110].opNext = 119;
    this.opcodes[110].type = CAT;

    this.opcodes[111] = [];
    this.opcodes[111].opNext = 112;
    this.opcodes[111].type = TLS;
    this.opcodes[111].length = 1;
    this.opcodes[111].stringIndex = 48;

    this.opcodes[112] = [];
    this.opcodes[112].opNext = 113;
    this.opcodes[112].type = RNM;
    this.opcodes[112].ruleIndex = 13;

    this.opcodes[113] = [];
    this.opcodes[113].opNext = 118;
    this.opcodes[113].type = REP;
    this.opcodes[113].min = 0;
    this.opcodes[113].max = 1;

    this.opcodes[114] = [];
    this.opcodes[114].opNext = 118;
    this.opcodes[114].type = CAT;

    this.opcodes[115] = [];
    this.opcodes[115].opNext = 116;
    this.opcodes[115].type = TLS;
    this.opcodes[115].length = 1;
    this.opcodes[115].stringIndex = 49;

    this.opcodes[116] = [];
    this.opcodes[116].opNext = 118;
    this.opcodes[116].type = REP;
    this.opcodes[116].min = 0;
    this.opcodes[116].max = 1;

    this.opcodes[117] = [];
    this.opcodes[117].opNext = 118;
    this.opcodes[117].type = RNM;
    this.opcodes[117].ruleIndex = 13;

    this.opcodes[118] = [];
    this.opcodes[118].opNext = 119;
    this.opcodes[118].type = TLS;
    this.opcodes[118].length = 1;
    this.opcodes[118].stringIndex = 50;

    this.opcodes[119] = [];
    this.opcodes[119].opNext = 121;
    this.opcodes[119].type = REP;
    this.opcodes[119].min = 0;
    this.opcodes[119].max = 1;

    this.opcodes[120] = [];
    this.opcodes[120].opNext = 121;
    this.opcodes[120].type = TLS;
    this.opcodes[120].length = 1;
    this.opcodes[120].stringIndex = 51;

    this.opcodes[121] = [];
    this.opcodes[121].opNext = 141;
    this.opcodes[121].type = ALT;

    this.opcodes[122] = [];
    this.opcodes[122].opNext = 123;
    this.opcodes[122].type = RNM;
    this.opcodes[122].ruleIndex = 16;

    this.opcodes[123] = [];
    this.opcodes[123].opNext = 124;
    this.opcodes[123].type = RNM;
    this.opcodes[123].ruleIndex = 15;

    this.opcodes[124] = [];
    this.opcodes[124].opNext = 125;
    this.opcodes[124].type = TLS;
    this.opcodes[124].length = 1;
    this.opcodes[124].stringIndex = 52;

    this.opcodes[125] = [];
    this.opcodes[125].opNext = 126;
    this.opcodes[125].type = TLS;
    this.opcodes[125].length = 1;
    this.opcodes[125].stringIndex = 53;

    this.opcodes[126] = [];
    this.opcodes[126].opNext = 127;
    this.opcodes[126].type = TLS;
    this.opcodes[126].length = 1;
    this.opcodes[126].stringIndex = 54;

    this.opcodes[127] = [];
    this.opcodes[127].opNext = 128;
    this.opcodes[127].type = TLS;
    this.opcodes[127].length = 1;
    this.opcodes[127].stringIndex = 55;

    this.opcodes[128] = [];
    this.opcodes[128].opNext = 129;
    this.opcodes[128].type = TLS;
    this.opcodes[128].length = 1;
    this.opcodes[128].stringIndex = 56;

    this.opcodes[129] = [];
    this.opcodes[129].opNext = 130;
    this.opcodes[129].type = TLS;
    this.opcodes[129].length = 1;
    this.opcodes[129].stringIndex = 57;

    this.opcodes[130] = [];
    this.opcodes[130].opNext = 131;
    this.opcodes[130].type = TLS;
    this.opcodes[130].length = 1;
    this.opcodes[130].stringIndex = 58;

    this.opcodes[131] = [];
    this.opcodes[131].opNext = 132;
    this.opcodes[131].type = TLS;
    this.opcodes[131].length = 1;
    this.opcodes[131].stringIndex = 59;

    this.opcodes[132] = [];
    this.opcodes[132].opNext = 133;
    this.opcodes[132].type = TLS;
    this.opcodes[132].length = 1;
    this.opcodes[132].stringIndex = 60;

    this.opcodes[133] = [];
    this.opcodes[133].opNext = 134;
    this.opcodes[133].type = TLS;
    this.opcodes[133].length = 1;
    this.opcodes[133].stringIndex = 61;

    this.opcodes[134] = [];
    this.opcodes[134].opNext = 135;
    this.opcodes[134].type = TLS;
    this.opcodes[134].length = 1;
    this.opcodes[134].stringIndex = 62;

    this.opcodes[135] = [];
    this.opcodes[135].opNext = 136;
    this.opcodes[135].type = TLS;
    this.opcodes[135].length = 1;
    this.opcodes[135].stringIndex = 63;

    this.opcodes[136] = [];
    this.opcodes[136].opNext = 137;
    this.opcodes[136].type = TLS;
    this.opcodes[136].length = 1;
    this.opcodes[136].stringIndex = 64;

    this.opcodes[137] = [];
    this.opcodes[137].opNext = 138;
    this.opcodes[137].type = TLS;
    this.opcodes[137].length = 1;
    this.opcodes[137].stringIndex = 65;

    this.opcodes[138] = [];
    this.opcodes[138].opNext = 139;
    this.opcodes[138].type = TLS;
    this.opcodes[138].length = 1;
    this.opcodes[138].stringIndex = 66;

    this.opcodes[139] = [];
    this.opcodes[139].opNext = 140;
    this.opcodes[139].type = TLS;
    this.opcodes[139].length = 1;
    this.opcodes[139].stringIndex = 67;

    this.opcodes[140] = [];
    this.opcodes[140].opNext = 141;
    this.opcodes[140].type = TLS;
    this.opcodes[140].length = 1;
    this.opcodes[140].stringIndex = 68;

    this.opcodes[141] = [];
    this.opcodes[141].opNext = 169;
    this.opcodes[141].type = ALT;

    this.opcodes[142] = [];
    this.opcodes[142].opNext = 143;
    this.opcodes[142].type = RNM;
    this.opcodes[142].ruleIndex = 16;

    this.opcodes[143] = [];
    this.opcodes[143].opNext = 144;
    this.opcodes[143].type = RNM;
    this.opcodes[143].ruleIndex = 15;

    this.opcodes[144] = [];
    this.opcodes[144].opNext = 145;
    this.opcodes[144].type = TLS;
    this.opcodes[144].length = 1;
    this.opcodes[144].stringIndex = 69;

    this.opcodes[145] = [];
    this.opcodes[145].opNext = 146;
    this.opcodes[145].type = TLS;
    this.opcodes[145].length = 1;
    this.opcodes[145].stringIndex = 70;

    this.opcodes[146] = [];
    this.opcodes[146].opNext = 147;
    this.opcodes[146].type = TLS;
    this.opcodes[146].length = 1;
    this.opcodes[146].stringIndex = 71;

    this.opcodes[147] = [];
    this.opcodes[147].opNext = 148;
    this.opcodes[147].type = TLS;
    this.opcodes[147].length = 1;
    this.opcodes[147].stringIndex = 72;

    this.opcodes[148] = [];
    this.opcodes[148].opNext = 149;
    this.opcodes[148].type = TLS;
    this.opcodes[148].length = 1;
    this.opcodes[148].stringIndex = 73;

    this.opcodes[149] = [];
    this.opcodes[149].opNext = 150;
    this.opcodes[149].type = TLS;
    this.opcodes[149].length = 1;
    this.opcodes[149].stringIndex = 74;

    this.opcodes[150] = [];
    this.opcodes[150].opNext = 151;
    this.opcodes[150].type = TLS;
    this.opcodes[150].length = 1;
    this.opcodes[150].stringIndex = 75;

    this.opcodes[151] = [];
    this.opcodes[151].opNext = 152;
    this.opcodes[151].type = TLS;
    this.opcodes[151].length = 1;
    this.opcodes[151].stringIndex = 76;

    this.opcodes[152] = [];
    this.opcodes[152].opNext = 153;
    this.opcodes[152].type = TLS;
    this.opcodes[152].length = 1;
    this.opcodes[152].stringIndex = 77;

    this.opcodes[153] = [];
    this.opcodes[153].opNext = 154;
    this.opcodes[153].type = TLS;
    this.opcodes[153].length = 1;
    this.opcodes[153].stringIndex = 78;

    this.opcodes[154] = [];
    this.opcodes[154].opNext = 155;
    this.opcodes[154].type = TLS;
    this.opcodes[154].length = 1;
    this.opcodes[154].stringIndex = 79;

    this.opcodes[155] = [];
    this.opcodes[155].opNext = 156;
    this.opcodes[155].type = TLS;
    this.opcodes[155].length = 1;
    this.opcodes[155].stringIndex = 80;

    this.opcodes[156] = [];
    this.opcodes[156].opNext = 157;
    this.opcodes[156].type = TLS;
    this.opcodes[156].length = 1;
    this.opcodes[156].stringIndex = 81;

    this.opcodes[157] = [];
    this.opcodes[157].opNext = 158;
    this.opcodes[157].type = TLS;
    this.opcodes[157].length = 1;
    this.opcodes[157].stringIndex = 82;

    this.opcodes[158] = [];
    this.opcodes[158].opNext = 159;
    this.opcodes[158].type = TLS;
    this.opcodes[158].length = 1;
    this.opcodes[158].stringIndex = 83;

    this.opcodes[159] = [];
    this.opcodes[159].opNext = 160;
    this.opcodes[159].type = TLS;
    this.opcodes[159].length = 1;
    this.opcodes[159].stringIndex = 84;

    this.opcodes[160] = [];
    this.opcodes[160].opNext = 161;
    this.opcodes[160].type = TLS;
    this.opcodes[160].length = 1;
    this.opcodes[160].stringIndex = 85;

    this.opcodes[161] = [];
    this.opcodes[161].opNext = 162;
    this.opcodes[161].type = TLS;
    this.opcodes[161].length = 1;
    this.opcodes[161].stringIndex = 86;

    this.opcodes[162] = [];
    this.opcodes[162].opNext = 163;
    this.opcodes[162].type = TLS;
    this.opcodes[162].length = 1;
    this.opcodes[162].stringIndex = 87;

    this.opcodes[163] = [];
    this.opcodes[163].opNext = 164;
    this.opcodes[163].type = TLS;
    this.opcodes[163].length = 1;
    this.opcodes[163].stringIndex = 88;

    this.opcodes[164] = [];
    this.opcodes[164].opNext = 165;
    this.opcodes[164].type = TLS;
    this.opcodes[164].length = 1;
    this.opcodes[164].stringIndex = 89;

    this.opcodes[165] = [];
    this.opcodes[165].opNext = 166;
    this.opcodes[165].type = TLS;
    this.opcodes[165].length = 1;
    this.opcodes[165].stringIndex = 90;

    this.opcodes[166] = [];
    this.opcodes[166].opNext = 167;
    this.opcodes[166].type = TLS;
    this.opcodes[166].length = 1;
    this.opcodes[166].stringIndex = 91;

    this.opcodes[167] = [];
    this.opcodes[167].opNext = 168;
    this.opcodes[167].type = TLS;
    this.opcodes[167].length = 1;
    this.opcodes[167].stringIndex = 92;

    this.opcodes[168] = [];
    this.opcodes[168].opNext = 169;
    this.opcodes[168].type = TLS;
    this.opcodes[168].length = 1;
    this.opcodes[168].stringIndex = 93;

    this.opcodes[169] = [];
    this.opcodes[169].opNext = 187;
    this.opcodes[169].type = ALT;

    this.opcodes[170] = [];
    this.opcodes[170].opNext = 171;
    this.opcodes[170].type = TLS;
    this.opcodes[170].length = 1;
    this.opcodes[170].stringIndex = 94;

    this.opcodes[171] = [];
    this.opcodes[171].opNext = 172;
    this.opcodes[171].type = TLS;
    this.opcodes[171].length = 1;
    this.opcodes[171].stringIndex = 95;

    this.opcodes[172] = [];
    this.opcodes[172].opNext = 173;
    this.opcodes[172].type = TLS;
    this.opcodes[172].length = 1;
    this.opcodes[172].stringIndex = 96;

    this.opcodes[173] = [];
    this.opcodes[173].opNext = 174;
    this.opcodes[173].type = TLS;
    this.opcodes[173].length = 1;
    this.opcodes[173].stringIndex = 97;

    this.opcodes[174] = [];
    this.opcodes[174].opNext = 175;
    this.opcodes[174].type = TLS;
    this.opcodes[174].length = 1;
    this.opcodes[174].stringIndex = 98;

    this.opcodes[175] = [];
    this.opcodes[175].opNext = 176;
    this.opcodes[175].type = TLS;
    this.opcodes[175].length = 1;
    this.opcodes[175].stringIndex = 99;

    this.opcodes[176] = [];
    this.opcodes[176].opNext = 177;
    this.opcodes[176].type = TLS;
    this.opcodes[176].length = 1;
    this.opcodes[176].stringIndex = 100;

    this.opcodes[177] = [];
    this.opcodes[177].opNext = 178;
    this.opcodes[177].type = TLS;
    this.opcodes[177].length = 1;
    this.opcodes[177].stringIndex = 101;

    this.opcodes[178] = [];
    this.opcodes[178].opNext = 179;
    this.opcodes[178].type = TLS;
    this.opcodes[178].length = 1;
    this.opcodes[178].stringIndex = 102;

    this.opcodes[179] = [];
    this.opcodes[179].opNext = 180;
    this.opcodes[179].type = TLS;
    this.opcodes[179].length = 1;
    this.opcodes[179].stringIndex = 103;

    this.opcodes[180] = [];
    this.opcodes[180].opNext = 181;
    this.opcodes[180].type = TLS;
    this.opcodes[180].length = 1;
    this.opcodes[180].stringIndex = 104;

    this.opcodes[181] = [];
    this.opcodes[181].opNext = 182;
    this.opcodes[181].type = TLS;
    this.opcodes[181].length = 1;
    this.opcodes[181].stringIndex = 105;

    this.opcodes[182] = [];
    this.opcodes[182].opNext = 183;
    this.opcodes[182].type = TLS;
    this.opcodes[182].length = 1;
    this.opcodes[182].stringIndex = 106;

    this.opcodes[183] = [];
    this.opcodes[183].opNext = 184;
    this.opcodes[183].type = TLS;
    this.opcodes[183].length = 1;
    this.opcodes[183].stringIndex = 107;

    this.opcodes[184] = [];
    this.opcodes[184].opNext = 185;
    this.opcodes[184].type = TLS;
    this.opcodes[184].length = 1;
    this.opcodes[184].stringIndex = 108;

    this.opcodes[185] = [];
    this.opcodes[185].opNext = 186;
    this.opcodes[185].type = TLS;
    this.opcodes[185].length = 1;
    this.opcodes[185].stringIndex = 109;

    this.opcodes[186] = [];
    this.opcodes[186].opNext = 187;
    this.opcodes[186].type = TLS;
    this.opcodes[186].length = 1;
    this.opcodes[186].stringIndex = 110;

    this.opcodes[187] = [];
    this.opcodes[187].opNext = 194;
    this.opcodes[187].type = ALT;

    this.opcodes[188] = [];
    this.opcodes[188].opNext = 189;
    this.opcodes[188].type = TLS;
    this.opcodes[188].length = 1;
    this.opcodes[188].stringIndex = 111;

    this.opcodes[189] = [];
    this.opcodes[189].opNext = 190;
    this.opcodes[189].type = TLS;
    this.opcodes[189].length = 1;
    this.opcodes[189].stringIndex = 112;

    this.opcodes[190] = [];
    this.opcodes[190].opNext = 191;
    this.opcodes[190].type = TLS;
    this.opcodes[190].length = 1;
    this.opcodes[190].stringIndex = 113;

    this.opcodes[191] = [];
    this.opcodes[191].opNext = 192;
    this.opcodes[191].type = TLS;
    this.opcodes[191].length = 1;
    this.opcodes[191].stringIndex = 114;

    this.opcodes[192] = [];
    this.opcodes[192].opNext = 193;
    this.opcodes[192].type = TLS;
    this.opcodes[192].length = 1;
    this.opcodes[192].stringIndex = 115;

    this.opcodes[193] = [];
    this.opcodes[193].opNext = 194;
    this.opcodes[193].type = TLS;
    this.opcodes[193].length = 1;
    this.opcodes[193].stringIndex = 116;

    this.opcodes[194] = [];
    this.opcodes[194].opNext = 196;
    this.opcodes[194].type = REP;
    this.opcodes[194].min = 1;
    this.opcodes[194].max = 4294967295;

    this.opcodes[195] = [];
    this.opcodes[195].opNext = 196;
    this.opcodes[195].type = RNM;
    this.opcodes[195].ruleIndex = 15;

    this.opcodes[196] = [];
    this.opcodes[196].opNext = 210;
    this.opcodes[196].type = ALT;

    this.opcodes[197] = [];
    this.opcodes[197].opNext = 198;
    this.opcodes[197].type = RNM;
    this.opcodes[197].ruleIndex = 15;

    this.opcodes[198] = [];
    this.opcodes[198].opNext = 199;
    this.opcodes[198].type = TLS;
    this.opcodes[198].length = 1;
    this.opcodes[198].stringIndex = 117;

    this.opcodes[199] = [];
    this.opcodes[199].opNext = 200;
    this.opcodes[199].type = TLS;
    this.opcodes[199].length = 1;
    this.opcodes[199].stringIndex = 118;

    this.opcodes[200] = [];
    this.opcodes[200].opNext = 201;
    this.opcodes[200].type = TLS;
    this.opcodes[200].length = 1;
    this.opcodes[200].stringIndex = 119;

    this.opcodes[201] = [];
    this.opcodes[201].opNext = 202;
    this.opcodes[201].type = TLS;
    this.opcodes[201].length = 1;
    this.opcodes[201].stringIndex = 120;

    this.opcodes[202] = [];
    this.opcodes[202].opNext = 203;
    this.opcodes[202].type = TLS;
    this.opcodes[202].length = 1;
    this.opcodes[202].stringIndex = 121;

    this.opcodes[203] = [];
    this.opcodes[203].opNext = 204;
    this.opcodes[203].type = TLS;
    this.opcodes[203].length = 1;
    this.opcodes[203].stringIndex = 122;

    this.opcodes[204] = [];
    this.opcodes[204].opNext = 205;
    this.opcodes[204].type = TLS;
    this.opcodes[204].length = 1;
    this.opcodes[204].stringIndex = 123;

    this.opcodes[205] = [];
    this.opcodes[205].opNext = 206;
    this.opcodes[205].type = TLS;
    this.opcodes[205].length = 1;
    this.opcodes[205].stringIndex = 124;

    this.opcodes[206] = [];
    this.opcodes[206].opNext = 207;
    this.opcodes[206].type = TLS;
    this.opcodes[206].length = 1;
    this.opcodes[206].stringIndex = 125;

    this.opcodes[207] = [];
    this.opcodes[207].opNext = 208;
    this.opcodes[207].type = TLS;
    this.opcodes[207].length = 1;
    this.opcodes[207].stringIndex = 126;

    this.opcodes[208] = [];
    this.opcodes[208].opNext = 209;
    this.opcodes[208].type = TLS;
    this.opcodes[208].length = 1;
    this.opcodes[208].stringIndex = 127;

    this.opcodes[209] = [];
    this.opcodes[209].opNext = 210;
    this.opcodes[209].type = TLS;
    this.opcodes[209].length = 1;
    this.opcodes[209].stringIndex = 128;

    this.opcodes[210] = [];
    this.opcodes[210].opNext = 211;
    this.opcodes[210].type = TRG;
    this.opcodes[210].min = 48;
    this.opcodes[210].max = 57;

    this.opcodes[211] = [];
    this.opcodes[211].opNext = 214;
    this.opcodes[211].type = ALT;

    this.opcodes[212] = [];
    this.opcodes[212].opNext = 213;
    this.opcodes[212].type = TRG;
    this.opcodes[212].min = 65;
    this.opcodes[212].max = 90;

    this.opcodes[213] = [];
    this.opcodes[213].opNext = 214;
    this.opcodes[213].type = TRG;
    this.opcodes[213].min = 97;
    this.opcodes[213].max = 122;
}

