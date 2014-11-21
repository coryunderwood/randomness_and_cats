var s = document.createElement("script");
s.type = "text/javascript";
s.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
document.head.appendChild(s);
$('head').append('<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />');

$.getScript("//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js")
    .done(function() {



        $('body').prepend('<div id="db" style="display:none"><textarea rows="20" cols="75"></textarea><p>Right Click on the text area above and Copy to Clipboard, then paste in the ticket</p></div>');


        db = {

            "config": {

                "document": {



                    "title": document.title,

                    "location": document.URL,

                    "referrer": document.referrer,

                    "lastModified": document.lastModified,



                },

                "browser": {



                    "userAgent": navigator.userAgent,

                    "platform": navigator.platform,

                    "onlineStatus": navigator.onLine,

                    "plugins": (function() {

                        var len = (navigator.plugins || []).length,

                            plugins = new Array(len),

                            curPlug;



                        for (; len;) {

                            len--;

                            curPlug = navigator.plugins[len];

                            plugins[len] = {

                                name: curPlug.name,

                                desc: curPlug.description

                            };

                        }

                        return plugins;

                    }()),



                },

                "viewport": {



                    "screen": {},

                    "viewportHieght": window.innerHeight,

                    "viewportWidth": window.innerWidth,

                },

                "cookies": {}

            }



        };




        function getAllCookies(decode) {

            var cookieArray = (document.cookie || '').split('; '),

                cookieObj = {},

                len = cookieArray.length,

                splitter, i;



            for (i = 0; i < len; i++) {

                // Split only on the first equal sign

                splitter = cookieArray[i].match(/^([^=]+)=(.*)$/);

                // Assign the value, with optional decoding (off by default)

                cookieObj[splitter[1]] = (decode ? decodeURIComponent(splitter[2]) : splitter[2]);

            }



            return cookieObj;

        }




        $.extend(true, db.config.cookies, getAllCookies());

        $.extend(true, db.config.viewport.screen, screen);

        $('#db textarea').val(JSON.stringify(db));



        $('#db').dialog({

            modal: true,

            clickOut: true,

            title: "Debug State Tool",

            draggable: true,

            resizable: false,

            width: 700

        });



        $("#db textarea").focus(function() {

            $(this).select();

        });


    });
