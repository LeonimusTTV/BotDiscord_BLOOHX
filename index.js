const Discord = require("discord.js");
const client = new Discord.Client();

const fs = require("fs");

client.login("NzA1NDgwMTg4NjI0MTA5NjYw.XrkSrg.ehzepAeIII9oppeapCh9cCjyyAI");

client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée !");

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`la commande ${f} a correctement était charger ✅`);

    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`l'events ${f.length} sont bien charger !`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    })
})