/// <reference path="./IRegexPart.ts" />
/// <reference path="./IRegexClass.ts" />

class RegexClass implements IRegexPart {
    public negative : boolean;
    public group : Array<IRegexClass>;
    public min : number|null;
    public max : number|null;
}