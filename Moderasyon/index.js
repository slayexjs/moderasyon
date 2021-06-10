const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags');
const { config } = require('process');
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//------------------------------------------------------------------------------------------------------------\\
 client.config = {
  "sunucuid": "850654395149975572",

  "taglog": "851781551091089428",

  "chat":"851775197006528532",

  "seskanal": "851775181118504970",

  "taglırol": "851775047739244564",

  "tag" : "✮",
  "tag2": "•",



"kayıtsız": "847137713132273674",
"kayıtsız1": "847137713568350231",

"teyitci": "851775036448702495",

"footer": "xeina was here",

"sunucuadı": "✮ H E R A #YAKINDA",

"toplantikanal": "851775185698029608",

"katıldırol": "851775071999098910",

"owner": "851774994153603082",

"yetkilirol": "851775038738137108",



"yetkilialim": "851774998543597628",

"yetkili1": "851775020635389972",

"yetkili2": "851775036448702495",

"yetkili3": "851775038738137108",

"yetkilog": "851775186612256769",


  "banhammer": "851775032534630420",

  "jailhammer": "851775033361694750",

  "transport": "851775035730296832",

  "mutehammer": "851775034073546752",

  "vmutehammer": "851775034838089729",

  "commandhammer": "851775037249814538",


  "banlog": "851775242543300618",

  "jaillog": "851775244997361725",

  "mutelog": "851775247002632192",

  "vmutelog": "851775248247947304",



  "onayemoji": "<a:onay:851752819811680256>",
  "redemoji": "<a:onaysiz:851752823116660746>",
  "sayı0": "0",
  "sayı1": "1",
  "sayı2": "2",
  "sayı3": "3",
  "sayı4": "4",
  "sayı5": "5",
  "sayı6": "6",
  "sayı7": "7",
  "sayı8": "8",
  "sayı9": "9",

 
  "booster": "",

  "jailrol": "851775065053593620",

  "muterol": "851775067381563392",

  ///////////////ROLLER////////
  "ekip": "851775047739244564",

  "uyarı": "",
  "uyarılog": "",

"rollog": "851775240102871050"
  
 }
///////////////////////////////////////////////////////

client.on('messageDelete', message => {
    const data = require("quick.db")
    data.set(`snipe.mesaj.${message.guild.id}`, message.content)
    data.set(`snipe.id.${message.guild.id}`, message.author.id)

  })






    //------------------------------------------------------------------------------------------------------------\\


client.on("message" , async msg => {
  
    if(!msg.guild) return;
    if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
    
    let afk = msg.mentions.users.first()
    
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
    
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
     }
   }
    if(msg.author.id === kisi){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`)).then(x => x.delete({timeout: 5000}));
     db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
      msg.member.setNickname(isim)
      
    }
    
  });
  ///////////////////////////////////////////////////////

client.on("message" , async msg => {
  
    if(!msg.guild) return;
    if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
    
    let afk = msg.mentions.users.first()
    
    const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
    
    const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
   if(afk){
     const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
     const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
     if(msg.content.includes(kisi3)){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
     }
   }
    if(msg.author.id === kisi){
  
         msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
     db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
     db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
      msg.member.setNickname(isim)
      
    }
    
  });
  
  //--------------------------------------------------------------------------------------\\

  client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send((client.config.tag))
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".tag") 
  return message.channel.send((client.config.tag))
});

client.on("message", message => {
  if(message.content.toLowerCase() == "Selam") 
  return message.channel.send(`${message.author} Selam güzelim <3`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "Slayex") 
  return message.channel.send(`${message.author} Aptal Botçu ?`)
});

client.on("message", message => {
  if(message.content.toLowerCase() == "Kafana göre gir") 
  return message.channel.send(`${message.author} cevabını yaz`)
});




////////////////////////////////////////////////////////////////


client.on("userUpdate", async(old, nev)=> { 
    
    let AlınmayacakRoller = ["", ""] // alınmyacak rollerin idlerini giriniz.
    let Tag = "✮"; // tagınız
    let TagRole = "851781551091089428"; // tag rol id
    let SunucuİD = "850654395149975572"; // sunucu id

    let Kayıtsız ="851775056278978561"; //kayıtsız perm
    let Kayıtsız1 ="851775057097261068"; //varsa 2. kayıtsız

      if (old.username === nev.username) return;
      if (nev.username.includes(Tag)){
      if (old.username.includes(Tag)) return;
    client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.add(TagRole).catch(console.error);
    } else {
      if (!old.username.includes(Tag)) return;
      client.guilds.cache.get(SunucuİD).members.cache.get(old.id).roles.cache.filter(r => r.id !== client.guilds.cache.get(SunucuİD).id && !AlınmayacakRoller.includes(r.id)).forEach(r => {
        client.guilds.cache.get(SunucuİD).members.cache.get(old.id).roles.remove(r.id)
      })      
      client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.remove(TagRole).catch(console.error);

    client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.add(Kayıtsız).catch(console.error);
    client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.add(Kayıtsız1).catch(console.error);
       };
        });
  
////----------------------- iltifat qwe -----------------------\\\\

const iltifatlar = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
   'Biraz Çevrendeki İnsanları Takarmısın ?',
   'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
  'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
  'Ben seni çok sevdim...',
  'Mucizelerden bahsediyordum.',
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi..."
];
// İLTİFATLARI BU ŞEKİLDE İSTEDİĞİNİZ KADAR ÇOĞALTABİLİRSİNİZ
client.on("message", async message => {
  if(message.channel.id !== (client.config.chat)) return;
  let Knavedev = db.get('chatiltifat');
  await db.add("chatiltifat", 1);
  if(Knavedev >= 50) { // 50 yazan yer, 50 mesajda bir iltifat edeceğini gösterir, değiştirebilirsiniz.
    db.delete("chatiltifat");
    const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
    message.reply(`${(iltifatlar)[random]}`);
  };
});




///////////////////member remove 
client.on('guildMemberRemove' , member => {
  if(member.roles.cache.has((client.config.kayıtsız))) return;
  if(member.roles.cache.has((client.config.kayıtsız1))) return;
  db.get(`isimler_${member.user.id}`);
  db.push(`isimler_${member.id}`, `\` ${member.displayName} \` (sunucudan ayrılma)`);
})



    //----------------------TAG-KONTROL----------------------\\     Slayex   

client.on("guildMemberAdd", member => {
  let sunucuid = (client.config.sunucuid); 
  let tag = (client.config.tag); 
  let rol = (client.config.taglırol); 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> Adlı kişi sunucumuza taglı katıldı`)
      .setTimestamp()
     client.channels.cache.get((client.config.taglog)).send(tagalma)
}
})

client.on("guildMemberAdd", member => {
  member.roles.add((client.config.kayıtsız));
  member.roles.add((client.config.kayıtsız1));
});