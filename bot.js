'use strict'

var Discord = require('discord.js');
const {token,username,prefix} = require('./config.json');



// Initialize Discord Bot
var bot = new Discord.Client();



bot.on('ready', () => {
    console.log('Connected');
});


bot.on('message', message => {

    if (message.author.bot) return;

    prettyJohn(message);

    if (message.content.indexOf(prefix) !== 0) return;
 


        
});


function prettyJohn(message) {
        var text = message.content;

        if (text.toLowerCase().indexOf("joao") != -1 || text.toLowerCase().indexOf("joão") != -1  || text.toLowerCase().indexOf("lindo") != -1 ) {
            message.channel.send("joao voce e lindoo");
        } else if (text.toLowerCase().indexOf("john") != -1 || text.toLowerCase().indexOf("beautiful") != -1 ) {
            message.channel.send("john u r beatiful");
        }
}


bot.login(token);







