var regexpExamples = [
    {
        "name": "void",
        "structure": {
            "type": "literal",
            "global": false,
            "insensitive": false,
            "multiline": false,
            "atStart": false,
            "atEnd": false,
            "group": []
        },
        "tests": [
            " ",
            ""
        ],
        "testsFails": [
            "god",
            "42"
        ]
    },
    {
        "name": "tests",
        "structure": {
            "type": "literal",
            "global": true,
            "insensitive": true,
            "multiline": true,
            "atStart": false,
            "atEnd": true,
            "group": [
                {
                    "type": "word",
                    "value": "d",
                    "min": "1",
                    "max": ""
                },
                {
                    "type": "group",
                    "capture": "no",
                    "group": [
                        {
                            "type": "word",
                            "value": "\\."
                        },
                        {
                            "type": "class",
                            "negative": true,
                            "group": [
                                {
                                    "type": "range",
                                    "first": "0",
                                    "last": "9"
                                },
                                {
                                    "type": "char",
                                    "value": "\\s"
                                }
                            ],
                            "min": "1",
                            "max": "3"
                        }
                    ],
                    "min": "34",
                    "max": "34"
                },
                {
                    "type": "word",
                    "value": "J"
                },
                {
                    "type": "alternative"
                },
                {
                    "type": "word",
                    "value": "g"
                }
            ]
        },
        "tests": [
            "1\\fH\\fHJ",
            "1\\fHHH\\fHHHg"
        ],
        "testsFails": [
            "fds",
            "5432"
        ]
    }

];
