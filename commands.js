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


	var interruptAllow = function interrupt(message,args,options) {


		var member = message.mentions.members.first();




		if (!member || !member.voiceChannel) return;


		if (options.isInterrupting) {
			if (options.interruptChannelID == member.voiceChannel.id) {

				if (!options.interruptIDs.includes(member.id)) {
					options.interruptIDs.push(member.id);
					message.channel.send(`:smiling_imp:  <@${member.id}>`)

				} else {
					var index = options.interruptIDs.indexOf(member.id);
					options.interruptIDs.splice(index,1);
					message.channel.send(`:angel:   <@${member.id}>`);

					if (options.interruptIDs.length == 0 ) {
						options.isInterrupting = false;
						member.voiceChannel.leave();
					}
				}

			} else {

				message.channel.send(`Já estou atrapalhando em outro canal`);
			}

		} else {
			options.isInterrupting = true;
			options.interruptChannelID = member.voiceChannel.id;
			options.interruptIDs.push(member.id);
			message.channel.send(`:smiling_imp:  <@${member.id}>`);
			member.voiceChannel.join().then(connection => {
				connection.on('speaking', user =>  {
					if (options.interruptIDs.includes(user.id)) {
						    const dispatcher = connection.playFile('./eaiMens.ogg');
						    dispatcher.on('start',() => {
						       connection.player.streamingData.pausedTime = 0;
						    });
					}
				});
			});
		}

	};


	var play = function play (message,args,options) {
		var broadcast = options.broadcast;
		for (const connection of options.voiceConnections.values()) {
			connection.playFile('./eaiMens.ogg');
	  	}
	}



	 


	exports.any = {};
	exports.adm = {};
	//commands
		//any
	exports.any.textao = getText;
	exports.any.randtext = getRandText;
	exports.any.textkeys = getTextKeys;
	exports.any.play = play;
		//adm
	exports.adm.allow = toggleAllow;
	exports.adm.kick = kick;
	exports.adm.interrupt = interruptAllow;

	//others 
	exports.any.prettyJohn = prettyJohn;


