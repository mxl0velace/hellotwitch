const tmi = require('tmi.js');
const fs = require('fs');

var secrets = JSON.parse(fs.readFileSync('secrets.json','utf-8'));

// Define configuration options
const opts = {
  identity: {
    username: secrets.username,
    password: secrets.password
  },
  channels: [
    secrets.channel
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  //if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  var commandName = msg.trim();
  commandName = commandName.toLowerCase();

  // If the command is known, let's execute it
  if (commandName === 'hello') {
    client.say(target, `world!`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName == 'melonsquad' || commandName == 'blahajgang'){
    client.say(target, `🍉🦈🍉🦈🍉🦈`);
  }
   else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}