
# 🎮 PokéCharm -- Twitch Pokémon Catching Game

Bring the fun of catching Pokémon to your Twitch chat with  
**PokéCharm**!  
A bot spawns wild Pokémon in your chat and on-screen overlay, and
viewers can try to catch them live.

---

## 📂 What's included

Your folder should look like this:

```
PokemonBot/
│
├─ pokecharm.exe          ← run this to start the bot
├─ config.json5           ← edit this to set your channel, prefix & settings (supports comments)
├─ pokemon.json           ← master Pokémon list (don’t touch)
├─ pokedex.json           ← auto-created/saved player catches
├─ quests.json            ← auto-created/saved daily quests
├─ eggs.json              ← auto-created/saved Mystery Egg data
├─ overlay.html           ← load into OBS as Browser Source
│
└─ assets/                ← images & sounds for overlay
   ├─ sprites/            ← Pokémon sprites
   ├─ balls/              ← Pokéball images
   └─ sounds/             ← catch/shake/breakout/evolve sounds
```

---

## ⚙️ Setup

1. **Edit `config.json5`**  
   Open with a text editor and set:

   ```json5
   {
     // Twitch Settings
     "prefix": "!",
     "channel": "YOURTWITCHNAME",

     // Spawn / Flee Timers
     "spawnIntervalMin": 120,
     "spawnIntervalMax": 300,
     "fleeTimeMin": 30,
     "fleeTimeMax": 60,

     // Egg Timers
     "eggHatchMinutes": 30,
     "eggCooldownHours": 24,

     // Giveaways
     "enableGiveaways": true,
     "giveawayDuration": 30,

     // Difficulty: easy | normal | hard
     "difficulty": "normal",

     // Seasonal Events
     "specialEvent": "halloween", // optional (ghost-types only spawn)

     // AI_Licia Integration
     "enableAILiciaIntegration": true,
     "aiLiciaApiKey": "YOUR_API_KEY",
     "aiLiciaImmediate": false, // true = immediate speech
     "aiLiciaEvents": {
       "spawn": false,
       "catch": true,
       "hatch": true,
       "giveaway": true,
       "seasonal": true
     },

     // Daily Quests
     "quests": [
       { "type": "catch_count", "goal": 3, "text": "Catch 3 Pokémon" },
       { "type": "catch_type", "goal": 1, "pokeType": "water", "text": "Catch a Water-type Pokémon" }
     ]
   }
   ```

   - `difficulty` sets the catch chance globally (easy/normal/hard).  
   - `specialEvent` filters spawn pool (Halloween = ghost-types, Winter = ice-types, etc.).  
   - `enableAILiciaIntegration` allows AI_Licia to react/comment on events.  
   - Each AI_Licia event (spawn, catch, hatch, giveaway, seasonal) can be toggled on/off individually.  

2. **Start the bot**  
   Run `pokecharm.exe`.  
   If successful, you'll see:

   ```
   ✅ Bot connected, starting auto spawns...
   ✅ WebSocket overlay server running on ws://localhost:8080
   ```

3. **Set up OBS overlay**  
   - Open OBS → *Sources* → Add → **Browser Source**  
   - Choose **Local File**, and select `overlay.html`  
   - Set width to `1080` and height to `720`  
   - Pokémon, eggs, and evolutions will now appear on screen!  

---

## 🎮 Commands

Viewers can interact with these commands:

```
!catch                → try catching with a Pokéball
!catch greatball      → higher catch rate (depends on difficulty)
!catch ultraball      → even higher catch rate (depends on difficulty)
!catch masterball     → guaranteed catch
!pokedex              → see your personal Pokédex
!quest                → view your current daily quest
!egg                  → claim your daily Mystery Egg (1 every 24h)
!hatch                → check your egg timer / progress
!evolve <Pokémon>     → evolve a Pokémon you’ve owned for 3+ days
!join                 → enter an active giveaway
!pokeevent            → see current seasonal event
```

Moderator-only:

```
!pokemon              → manually spawn a Pokémon
!pokemon <id>         → spawn by Pokémon ID
!pokemon <name>       → spawn by Pokémon name
!giveaway [name/id]   → start a giveaway
!pokestop             → force current Pokémon to flee
```

---

## 🌟 Features

- **Pokémon Spawning** – random wild Pokémon appear in chat & overlay  
- **Difficulty System** – configurable catch rates (`easy`, `normal`, `hard`)  
- **Pokédex** – each viewer builds their own collection, saved in `pokedex.json`  
- **Daily Quests** – random daily quests with rewards (e.g. guaranteed catch)  
- **Mystery Eggs** – claim 1 egg every 24h that hatches after a set time  
- **Evolution System** – evolve Pokémon you’ve owned for 3+ days  
- **Giveaways** – mods can host giveaways for Pokémon (auto-reroll if winner already owns it)  
- **Seasonal Events** – restricts spawn pool to themed types (Halloween, Winter, Summer, etc.)  
- **AI_Licia Integration** – optional AI co-host reactions for spawns, catches, hatches, giveaways, and events  
- **Leaderboard Overlay** – shows top catchers on-screen when triggered  
- **Shiny Pokémon** – rare chance for shinies with glowing overlay effects  
- **Overlay Animations** – spawn, catch shakes, egg hatching, and flashy evolution animations  

---

## 🐾 Notes

- The bot always uses the **PokéCharm** account by default  
- Each viewer's data is saved in:
  - `pokedex.json` (caught Pokémon)  
  - `quests.json` (daily quests)  
  - `eggs.json` (egg timers & claims)  
- Keep **assets/** and **overlay.html** in the same folder as `pokecharm.exe`  
- Start the bot **before OBS** so the overlay connects automatically  
- Make the bot either a MOD in your chat or a VIP  

---

## Example Config.json5 (full)

```json5
{
  "prefix": "!",
  "channel": "rosesplace",

  "spawnIntervalMin": 120,
  "spawnIntervalMax": 300,
  "fleeTimeMin": 30,
  "fleeTimeMax": 60,

  "eggHatchMinutes": 30,
  "eggCooldownHours": 24,

  "enableGiveaways": true,
  "giveawayDuration": 30,

  "difficulty": "normal",

  "specialEvent": "winter",

  "enableAILiciaIntegration": true,
  "aiLiciaApiKey": "YOUR_API_KEY",
  "aiLiciaImmediate": false,
  "aiLiciaEvents": {
    "spawn": true,
    "catch": true,
    "hatch": true,
    "giveaway": true,
    "seasonal": true
  },

  "quests": [
    { "type": "catch_count", "goal": 3, "text": "Catch 3 Pokémon" },
    { "type": "catch_type", "goal": 1, "pokeType": "fire", "text": "Catch a Fire-type Pokémon" },
    { "type": "hatch_egg", "goal": 1, "text": "Hatch a Mystery Egg" }
  ]
}
```
