const tmi = require("tmi.js");
const WebSocket = require("ws");
const fs = require("fs");
const config = require("./config.json");
const pokemonData = require("./pokemon.json"); // ✅ full Pokémon list

// Twitch client
const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: config.botUsername,
    password: config.oauthToken
  },
  channels: [config.channel]
});

client.connect().catch(console.error);

// WebSocket overlay server
const wss = new WebSocket.Server({ port: 8080 });
console.log("✅ WebSocket overlay server running on ws://localhost:8080");

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

// Load Pokédex from file
let pokedex = {};
const pokedexFile = "pokedex.json";

if (fs.existsSync(pokedexFile)) {
  try {
    const data = fs.readFileSync(pokedexFile, "utf8");
    if (data.trim().length === 0) {
      console.log("⚠️ pokedex.json was empty, starting fresh.");
      pokedex = {};
    } else {
      pokedex = JSON.parse(data);
      console.log("📂 Pokédex loaded from file.");
    }
  } catch (err) {
    console.error("⚠️ Error loading pokedex.json:", err);
    pokedex = {};
  }
}

// Save Pokédex to file
function savePokedex() {
  fs.writeFile(pokedexFile, JSON.stringify(pokedex, null, 2), err => {
    if (err) console.error("⚠️ Error saving pokedex.json:", err);
  });
}

// Current Pokémon
let currentPokemon = null;

// Spawn Pokémon (random, by ID, or by name)
function spawnPokemon(arg) {
  let pokemon;

  if (!arg) {
    // 🎲 Random Pokémon from full list
    const id = Math.floor(Math.random() * pokemonData.length) + 1;
    pokemon = pokemonData.find(p => p.id === id);
  } else {
    // Try to parse as number (ID)
    const id = parseInt(arg, 10);
    if (!isNaN(id)) {
      pokemon = pokemonData.find(p => p.id === id);
    } else {
      // Search by name (case-insensitive)
      pokemon = pokemonData.find(p => p.name.toLowerCase() === arg.toLowerCase());
    }
  }

  if (!pokemon) {
    client.say(config.channel, `⚠️ Could not find Pokémon "${arg}".`);
    return;
  }

  currentPokemon = {
    id: pokemon.id,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    sprite: pokemon.sprite
  };

  console.log(`✨ A wild ${currentPokemon.name} appeared!`);
  client.say(config.channel, `✨ A wild ${currentPokemon.name} appeared! Use !catch to try catching it!`);
  broadcast({ type: "spawn", sprite: currentPokemon.sprite, name: currentPokemon.name });

  // ⏳ Auto-flee after 30–60 seconds
  const fleeTime = Math.floor(Math.random() * 31) + 30; // 30–60 sec
  setTimeout(() => {
    if (currentPokemon && currentPokemon.id === pokemon.id) {
      client.say(config.channel, `💨 The wild ${currentPokemon.name} fled!`);
      currentPokemon = null;
      broadcast({ type: "despawn" });
    }
  }, fleeTime * 1000);
}

// Attempt catch with ball type + sub tier restriction
function attemptCatch(user, ballType, tags) {
  if (!currentPokemon) return;

  // ✅ Duplicate prevention
  if (pokedex[user] && pokedex[user].some(p => p.id === currentPokemon.id)) {
    client.say(config.channel, `⚠️ ${user}, you already caught ${currentPokemon.name}! You can’t catch it again.`);
    return;
  }

  // ✅ Subscription checks
  const badges = tags.badges || {};
  const subTier = badges.subscriber ? parseInt(badges.subscriber, 10) : 0;

  if (ballType === "greatball" && subTier < 1000) {
    client.say(config.channel, `⚠️ ${user}, Great Balls are only for Tier 1 subscribers or higher.`);
    return;
  }
  if (ballType === "ultraball" && subTier < 2000) {
    client.say(config.channel, `⚠️ ${user}, Ultra Balls are only for Tier 2 subscribers or higher.`);
    return;
  }
  if (ballType === "masterball" && subTier < 3000) {
    client.say(config.channel, `⚠️ ${user}, Master Balls are only for Tier 3 subscribers.`);
    return;
  }

  const successRates = {
    pokeball: 0.5,
    greatball: 0.7,
    ultraball: 0.85,
    masterball: 1.0
  };

  const rate = successRates[ballType] || successRates.pokeball;
  const success = Math.random() < rate;

  console.log(`🎯 ${user} used ${ballType}! Success chance: ${rate}, Result: ${success}`);

  broadcast({ type: "catch", success, ballType });

  setTimeout(() => client.say(config.channel, `*shake*`), 1500);
  setTimeout(() => client.say(config.channel, `*shake*`), 2500);
  setTimeout(() => client.say(config.channel, `*shake*`), 3500);

  setTimeout(() => {
    if (success) {
      client.say(config.channel, `🎉 ${user} caught ${currentPokemon.name}!`);

      if (!pokedex[user]) {
        pokedex[user] = [];
      }
      pokedex[user].push({
        id: currentPokemon.id,
        name: currentPokemon.name,
        sprite: currentPokemon.sprite
      });

      savePokedex();

      currentPokemon = null;
      broadcast({ type: "despawn" });
    } else {
      client.say(config.channel, `😢 ${user}’s ${ballType} failed to catch ${currentPokemon.name}!`);
    }
  }, 4500);
}

// Handle chat
client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith(config.prefix)) return;

  const args = message.slice(config.prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "pokemon") {
    const isMod = tags.mod || (tags.badges && tags.badges.broadcaster);
    if (!isMod) {
      client.say(channel, `⚠️ ${tags.username}, only moderators can spawn Pokémon.`);
      return;
    }
    const arg = args[0];
    spawnPokemon(arg);
  }

  if (command === "pokestop") {
    const isMod = tags.mod || (tags.badges && tags.badges.broadcaster);
    if (!isMod) {
      client.say(channel, `⚠️ ${tags.username}, only moderators can use !pokestop.`);
      return;
    }
    if (!currentPokemon) {
      client.say(channel, `⚠️ There’s no Pokémon to flee right now.`);
      return;
    }
    client.say(channel, `💨 The wild ${currentPokemon.name} fled!`);
    currentPokemon = null;
    broadcast({ type: "despawn" });
  }

  if (command === "catch") {
    const ballType = args[0] ? args[0].toLowerCase() : "pokeball";
    attemptCatch(tags.username, ballType, tags);
  }

  if (command === "pokedex") {
    const user = tags.username;
    const userDex = pokedex[user] || [];
    if (userDex.length === 0) {
      client.say(channel, `📖 ${user}, your Pokédex is empty! Catch some Pokémon with !catch.`);
    } else {
      const names = userDex.map(p => p.name).join(", ");
      client.say(channel, `📖 ${user}, your Pokédex: ${names}`);
    }
  }
});
