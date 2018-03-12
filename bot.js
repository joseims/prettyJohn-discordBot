'use strict'

var Discord = require('discord.js');
const config = require('./config.json');
const commands = require('./commands.js');
var prefix =  config.prefix;
var token = config.token;

var admIDs = config.admIDs;
var error = config.error;





// Initialize Discord Bot
var bot = new Discord.Client();

//initializing global variables
var options = {};
options.prettyAllow = true;
options.interruptIDs = [];
options.interruptChannelID = "";
options.isInterrupting = false;

bot.on('ready', () => {
    console.log('Connected');
});

bot.on('any', a => {
   console.log(a);
});



bot.on('message', message => {   




    const author = message.author;

    if (author.bot || message.channel.type === "dm") return;

    console.log(message.content);


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //criar variavel para parametros globais
    const command = args.shift().toLowerCase();

    //Base Command

    commands.any.prettyJohn(message,args,options);

    if (message.content.indexOf(prefix) !== 0) return;


    //General Commands

    options.broadcast = bot.createVoiceBroadcast().playFile('./teste.mp3');;
    options.voiceConnections = bot.voiceConnections;

    if (typeof commands.adm[command] != 'undefined') {

        if (isAdm(author.id)) {
            //Adm command
            commands.adm[command](message,args,options);

        } else {

            message.channel.send(error.permission);

        }

    } else if (typeof commands.any[command] != 'undefined') {
        //normal command
        commands.any[command](message,args,options);


    } else {
        console.log('1')
        message.channel.send(error.commandNotFound);
    
    }


        
});



function isAdm(userID) {

    return admIDs.includes(userID);

}



bot.login(token);