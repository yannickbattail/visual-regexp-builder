/// <reference path="./IRegexPart.ts" />

class RegexWord implements IRegexPart {
    public value : string;
    public min : number|null;
    public max : number|null;
}