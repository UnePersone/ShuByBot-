const tmi = require('tmi.js');
const laChaine = "Shubakay"

const tmiConfig = {
    options: {
        debug: true
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
    console.log(client.getUsername() + " s'est connecté sur : " + adress + ", port : " + port);
    client.say(laChaine, "Salut Twitch je suis un humain Kappa");
});

client.on('chat',(channel, user, message, self)=>{
	
	if(message == "sa va ?"){
	client.say(laChaine,'On dit ça va !')
	}
	
	if(message.charAt(0) == '!'){
		message=sansExcla(message);
		
		if(message == "discord"){
		client.say(laChaine,"Rejoins nous ici : https://discord.gg/xJPW6dB")
		}
		
		if(message == "twitter"){
		client.say(laChaine,"Pour tout savoir sur Shubakay c'est ici : https://twitter.com/shubakay")
		}
		
		if(message == "youtube"){
		client.say(laChaine,"Pour passer le temps c'est juste ici : https://www.youtube.com/channel/UCXyXgpsmShAyuNTr19AoFkA")
		}
		
		if(message == "instagram"){
		client.say(laChaine,"Pour voir les meilleures photos c'est bien évidemment ici : https://www.instagram.com/si_monphoto/")
		}
		
		if(message == "info"){
		client.say(laChaine,"Je suis Shubakay, j'ai 20 années derrière moi ! Mon objectif : Te faire passer du bon temps pour tout oublier !")
		}
	}
})

function sansExcla(chaine){
	return chaine.substring(1);
}

}
module.exports.start = startBot;