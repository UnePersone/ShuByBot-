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

client.on('connected', (adress, port) => {
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port)
});
	
	client.on('chat',(channel, user, message, self)=>{
	
	let m = message.toLowerCase();
    let username = user.username;
	
	var answer = "";
	
	if(message.charAt(0) == '!'){
		answer +=commande(m)
		client.say(laChaine,answer)
	}
	else{
		answer += ortograf(m);
		if(answer!=""){
			client.say(laChaine, username +" "+answer)
			}
	}
	
})

}

function commande(message){
		var answer = "";
		message=sansExcla(message);
		
		if(message == "discord"){
		answer += "Rejoins nous ici : https://discord.gg/xJPW6dB"
		}
		
		if(message == "twitter"){
		answer += "Pour tout savoir sur Shubakay c'est ici : https://twitter.com/shubakay"
		}
		
		if(message == "youtube"){
		answer += "Pour passer le temps c'est juste ici : https://www.youtube.com/channel/UCXyXgpsmShAyuNTr19AoFkA"
		}
		
		if(message == "instagram"){
		answer += "Pour voir les meilleures photos c'est bien évidemment ici : https://www.instagram.com/si_monphoto/"
		}
		
		if(message == "info"){
		answer += "Je suis Shubakay, j'ai 20 années derrière moi ! Mon objectif : Te faire passer du bon temps pour tout oublier !"
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