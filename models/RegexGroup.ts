/// <reference path="./IRegexPart.ts" />

enum RegexCapture {
    Yes = 'yes',
    No = 'no',
    PositiveLookAhead = '+lookAhead',
    NegativeLookAhead = '-lookAhead',
}

class RegexGroup implements IRegexPart {
    public capture : RegexCapture;
    public group : Array<IRegexPart>;
    public min : number|null;
    public max : number|null;
}