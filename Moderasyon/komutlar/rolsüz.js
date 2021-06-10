const Discord = require("discord.js");
const index = require("../index.js");


exports.run =async (bot, message, args) => {
let kholdRole1 = message.guild.roles.cache.find(r => r.id == "851774994153603082"); //kullanacak rol id
let kholdRole2 = message.guild.roles.cache.find(r => r.id == "");

const yetki = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription("Bu komutu kullanmak için ayarlanan yetkiye sahip değilsiniz!")
.setColor("#000069");

if (!message.member.roles.cache.has(kholdRole1.id)) 
if (!message.member.roles.cache.has(kholdRole2.id))
return message.delete().catch(O_o=>{}), message.channel.send(yetki).then(msg => {

});

let omgkhold = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
// Khold#0001
if(args[0] == "ver") {
    omgkhold.forEach(r => {
r.roles.add("851775056278978561")
r.roles.add("851775057097261068")
})
const khold = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setColor("#000069")
.setDescription("Sunucuda rolü olmayan \`"+ omgkhold.size +"\` kişiye kayıtsız rolü verildi!")
message.channel.send(khold).then(m => message.react("851752819811680256"))
} else if(!args[0]) {
const khold1 = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setColor("#000069")
.setDescription("Sunucumuzda rolü olmayan \`"+ omgkhold.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
message.channel.send(khold1)
}



}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["rolsuz"],
permLevel: 0
};

exports.help = {
name: "rolsüz",
description: "[Admin Komutu]",
usage: "rolsüz ver"
};