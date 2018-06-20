const config = require('../config.json');
const Discord = require('discord.js');
const Wykop = require('wykop-es6-2');
const client = new Discord.Client();
const TurndownService = require('turndown')
const turndownService = new TurndownService()

const wykop = new Wykop(config.key, config.secret, { ssl: true, useragent: '@owmimporter' });

let lastCheckedTagsArray = {
  owmbugi: 0,
  otwartywykopmobilny: 0,
}

const checkNewEntries = async () => {
  console.log('eloo')
  await checkTag('owmbugi')
  await checkTag('otwartywykopmobilny')
}

const checkTag = async (tag) => {
  try {
    const wykopRequest = (await wykop.request('tag', 'entries', {params: [tag]})).items;
    for (let response of wykopRequest.slice(0, 5).reverse()) {
      if (response.id > lastCheckedTagsArray[tag]) {
        sendDiscordMessage(response, tag)
      }
    }
    lastCheckedTagsArray[tag] = wykopRequest[0].id
  } catch (e) {
    console.log(e)
  }

  console.log('checked tag: ' + tag)
}

const sendDiscordMessage = async (msg, tag) => {
  const discordChannelID = config.tags[tag]
  const channel = client.channels.get(discordChannelID)
  const body = turndownService.turndown(msg.body)
  let embed = new Discord.RichEmbed()
    .setAuthor(msg.author, msg.author_avatar)
    .setColor(0x00AE86)
    .setTitle('Nowy wpis #'+tag)
    .setURL('https://wykop.pl/wpis/'+msg.id)
    .addField('Opis błędu', body, true)
    .addField('Link do wpisu', 'https://wykop.pl/wpis/'+msg.id)
  
  if (msg.embed !== null) {
    embed = embed.setImage(msg.embed.url)
  }

  channel.send({embed})
}

client.login(config.discordToken)
setInterval(checkNewEntries, 50000)
console.log('Importer running')