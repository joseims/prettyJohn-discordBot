const bigTexts = require('./bigText.json');


var prettyJohn = function prettyJohn(message,args,options) {

    if (options.prettyAllow) {

        var text = message.content;

        if (text.toLowerCase().indexOf("joao") != -1 || text.toLowerCase().indexOf("joão") != -1  || text.toLowerCase().indexOf("lindo") != -1 ) {
            message.channel.send("joao voce e lindoo");
        } else if (text.toLowerCase().indexOf("john") != -1 || text.toLowerCase().indexOf("beautiful") != -1 ) {
            message.channel.send("john u r beatiful");
        }

    }
};

var toggleAllow = function toggleAllow(message,args,options) {

    options.prettyAllow = !options.prettyAllow;

    if (options.prettyAllow) {
        message.channel.send(";)");
    } else {
         message.channel.send(":(");
    }
};



var getRandText = function getRandText(message) {

    var texts = Object.keys(bigTexts);
    var key = texts[texts.length * Math.random() << 0];
    var text = bigTexts[key];

    message.channel.send( text );

};


var getTextKeys = function getTextKeys(message) {
    var keys = Object.keys(bigTexts);
    var msg = "Textoes : \n";
    keys.forEach(key => {
        msg += `    ${key}\n`
    });
    message.channel.send(msg);
};




var getText = function getText(message, args) {
    if (bigTexts[args[0]]) {
        message.channel.send(bigTexts[args[0]]); 
    } else {
        message.channel.send(":dizzy_face: Esse texto não foi cadastrado :dizzy_face:");
    }
};

var kick = function kick(message) {

    var member = message.mentions.members.first();

    if (typeof member == "undefined")  {
        message.channel.send(":scream: :scream: Este usuário não existe :scream: :scream: ")
        return;
    }

    var nickname = Object.assign({}, member).user.username;
    
    member.kick().then(function() {
        message.channel.send(`:hand_splayed: :hand_splayed:  xau xau ${nickname}`);
    });

};

exports.any = {};
exports.adm = {};
//commands
	//any
exports.any.textao = getText;
exports.any.randtext = getRandText;
exports.any.textkeys = getTextKeys;
	//adm
exports.adm.allow = toggleAllow;
exports.adm.kick = kick;

//others 
exports.any.prettyJohn = prettyJohn;


