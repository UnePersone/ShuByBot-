const tmi = require('tmi.js');
const laChaine = "Shubakay"

const tmiConfig = {
    options: {
        debug: false
    },
    connection: {
        reconnect:  true
    },
    identity: {
        username: "Shubybot",
        password: process.env.cleShub
    },
    channels: [
        laChaine
    ]
};


function startBot(){

let client = new tmi.client(tmiConfig);

client.connect();

client.on('connected', (adress, 5000) => {
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port)
});
	
	client.on('chat',(channel, user, message, self)=>{
	
	if (self) { return; } // Ignore messages from the bot
	let m = message;
    let username = user.username;
	
	var answer = "";
	
	if(message.charAt(0) == '!'){		//commande
		answer +=commande(m)
		client.action(laChaine,answer)
	}
	else{
		
		var nbMaj = fullMaj(m);		//full maj
		
		if((nbMaj>=10) && (username != "une_persone")){
			if(isModerator(username) != true){					//si modo pas to
				client.say(laChaine,"/timeout "+username+" 1");
				}
			client.say(laChaine,"HéHo on se calme sur les MAJ " + username + "a dit : " + message.toLowerCase());
			}
			
		answer += ortograf(m);
		if(answer!=""){
			client.say(laChaine, username +" "+answer)
			}
			
		var cheh = chehUser(m);
		if(cheh != false){
			client.say(laChaine, "I heard cheh in my oreillette " + cheh)
			}
	}
	
})

}

function chehUser(message,user){
	message.toLowerCase();
	var cheh = "cheh ";
	var i = 0;
	var here = true;
	while((i<cheh.length) && (here == true)){
		if(message.charAt(i) != cheh.charAt(i)){
			here = false
		}
		i+=1;
	}
	
	if(here == true){
	return message.substring(5)
	}
	else{
	return false
	}
}

function isModerator(user){
    return user.mod;
}

function fullMaj(message){
	var taille = message.length;
	var nb = 0;
	for(let i = 0; i<taille; i++){
		if((message.charAt(i) >= 'A') && (message.charAt(i) <= 'Z')){
		nb=nb + 1;
		}
	}
	return nb;
}

function commande(message){
		var answer = "";
		message=sansExcla(message.toLowerCase());
		
		if(message == "help"){
		answer += "t'annonce que tu as accès à toutes les commandes suivantes: !Discord | !Twitter | !Youtube | !Instagram | !Info"
		}
		
		if(message == "discord"){
		answer += "Rejoins nous ici: https://discord.gg/xJPW6dB"
		}
		
		if(message == "twitter"){
		answer += "Pour tout savoir sur Shubakay c'est ici: https://twitter.com/shubakay"
		}
		
		if(message == "youtube"){
		answer += "Pour passer le temps c'est juste ici: https://www.youtube.com/channel/UCXyXgpsmShAyuNTr19AoFkA"
		}
		
		if(message == "instagram"){
		answer += "Pour voir les meilleures photos c'est bien évidemment ici: https://www.instagram.com/si_monphoto/"
		}
		
		if(message == "info"){
		answer += "Je suis Shubakay ! Pour plus d'info pose ta question en live  MrDestructoid"
		}
		
		if(message == "persone"){
		answer += "Doux créateur de l'enfer pour certain !"
		}
		
		if(message == "arthur"){
		answer +="Cet homme a tout le temps faim et est le dindon de la farce"
		}
		
		if(message == "vkxe"){
		answer += '"Elle aime crier !"'
		}
		
		if(message == "hoxalide"){
		answer += '"Supporte Shuby h24 mais imhotep"'
		}
		
		if(message == "jikan"){
		answer += '"Est un homme tout doux plein de gentillesse"'
		}
		
		if(message == "shubakay"){
		answer += "ouais ouais ouais ouais ouais"
		}
		
		return answer;
}

function ortograf(m){
		var answer = "";
		
        if (/(^|\W)(je|tu)\speu($|\W|t)/gmi.test(m)) {           //   je/tu peux
            answer += "je/tu peuX"
        }

        if (/(^|\W)(il|elle|ont?)\speu($|\W|x)/gmi.test(m)) {               //   on peut
            answer += "on peuT"
        }

        if (/(^|\W)(je|tu)\sveu($|\W|t)/gmi.test(m)) {          //   je/tu veux
            answer += "je/tu veuX"
        }

        if (/(^|\W)(il|elle|ont?)\sveu($|\W|x)/gmi.test(m)) {               //   on veut
            answer += "on veuT"
        }

        if (answer != "") { answer += " , l'orthographe veut ton bien-être !" }

        if (/(^|\W)sa\s?va($|\W)/gmi.test(m)) {                 //   sava
            answer += "*ça va, l'orthographe est ton amie, l'ami !"
        }

        if (/(^|\W)au final($|\W)/gmi.test(m)) {                 //   au final
            answer += "*finalement ! Tout doux avec la grammaire ! http://www.academie-francaise.fr/au-final ."
        }

        if (/(^|\s)tu\s?(su(sse|se|ce|ss|ç|çe)|susses|suses)(\s|$)/gmi.test(m)) {                 //   au final
            answer += "*tu suces"
        }
		return answer;
		}
		
function sansExcla(chaine){
	return chaine.substring(1);
}

module.exports.start = startBot;