var regexpExamples = [
    {
        "name": "empty",
        "regexp": "//",
        "tests": [
            ""
        ],
        "testsFails": [
            "42"
        ]
    },
    {
        "name": "IP v4",
        "regexp": "/(\[0-9]{1,3}\\.){3}[0-9]{1,3}/",
        "tests": [
            "127.0.0.1",
            "192.168.1.254",
            "8.8.8.8",
            "255.255.255.255"
        ],
        "testsFails": [
            "8.8.8",
            "8.8.d",
            "8.8.8..8"
        ]
    },
    {
        "name": "e-mail",
        "regexp": "/^[a-z0-9][a-z0-9_.\\-]*@[a-z0-9][a-z0-9.\\-]*[a-z0-9]{2,}$/i",
        "tests": [
            "moi@toi.fr",
            "m-._@t-o.i.fr",
            "john.doe@perdu.com",
            "docteur-who@torchwood.co.uk"
        ],
        "testsFails": [
            "-john.doe@perdu.com",
            "céline@perdu.com",
            "john.doe@perdu.u",
            "john.doe@-perdu.im"
        ]
    }

];
