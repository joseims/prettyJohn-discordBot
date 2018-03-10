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


bot.on('ready', () => {
    console.log('Connected');
});


bot.on('message', message => {   


    const author = message.author;

    if (author.bot || message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //criar variavel para parametros globais
    const command = args.shift().toLowerCase();

    //Base Command

    commands.any.prettyJohn(message,args,options);


    if (message.content.indexOf(prefix) !== 0) return;


    //General Commands

    
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

        message.channel.send(error.command);
    
    }


        
});



function isAdm(userID) {

    return admIDs.includes(userID);

}





bot.login(token);







