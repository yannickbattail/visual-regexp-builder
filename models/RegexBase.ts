/// <reference path="./IRegexPart.ts" />

class RegexBase {
    public atStart : boolean;
    public atEnd : boolean;
    
    public global : boolean;
    public insensitive : boolean;
    public multiline : boolean;
    
    public group : Array<IRegexPart>;
}