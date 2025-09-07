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
├─ config.json            ← edit this to set your channel, prefix & settings
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

1. **Edit `config.json`**  
   Open with a text editor and set:

   ```json
   {
     "prefix": "!",
     "channel": "YOURTWITCHNAME",
     "spawnIntervalMin": 120,
     "spawnIntervalMax": 300,
     "fleeTimeMin": 30,
     "fleeTimeMax": 60,
     "eggHatchMinutes": 30,
     "eggCooldownHours": 24,
     "giveawayDuration": 30,
     "enableGiveaways": true,
     "specialEvent": "halloween",

     "quests": [
       { "type": "catch_count", "goal": 3, "text": "Catch 3 Pokémon today" },
       { "type": "catch_type", "pokeType": "Water", "goal": 1, "text": "Catch a Water-type Pokémon" }
     ]
   }
   ```

   - `channel`: Your Twitch channel name (lowercase)  
   - `prefix`: Command prefix (default: `!`)  
   - `spawnIntervalMin/Max`: How often Pokémon appear (seconds)  
   - `fleeTimeMin/Max`: How long they stay before fleeing (seconds)  
   - `eggHatchMinutes`: Time until an egg hatches (minutes)  
   - `eggCooldownHours`: Time before you can claim another egg (hours)  
   - `giveawayDuration`: How long giveaways stay open (seconds)  
   - `enableGiveaways`: Toggle giveaways on/off (`true` or `false`)  
   - `specialEvent`: Seasonal spawn pool override  
     - `"halloween"` → Ghost-types 👻  
     - `"winter"` → Ice-types ❄️  
     - `"valentine"` → Fairy-types 💖  
     - `"summer"` → Water-types 🌊  
     - `"spring"` → Grass & Bug-types 🌱🐞  
     - `"desert"` → Ground & Rock-types 🏜️  
     - `"storm"` → Electric-types ⚡  
     - `"dragonfest"` → Dragon-types 🐉  
     - leave empty for normal random spawns  

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
   - Pokémon, eggs, evolutions, and giveaways will now appear on screen!  

---

## 🎮 Commands

Viewers can interact with these commands:

```
!catch                → try catching with a Pokéball
!catch greatball      → higher catch rate
!catch ultraball      → even higher catch rate
!catch masterball     → guaranteed catch
!pokedex              → see your personal Pokédex
!quest                → view your current daily quest
!egg                  → claim your daily Mystery Egg (1 every 24h)
!hatch                → check your egg timer / progress
!evolve <Pokémon>     → evolve a Pokémon you’ve owned for 3+ days
!join                 → join an active giveaway
```

Moderator-only:

```
!pokemon              → manually spawn a Pokémon
!giveaway [Pokémon]   → start a giveaway (random rare if no Pokémon given)
```

---

## 🌟 Features

- **Pokémon Spawning** – random wild Pokémon appear in chat & overlay  
- **Seasonal Events** – special spawn pools during events (Halloween, Winter, Valentine, etc.)  
- **Pokédex** – each viewer builds their own collection, saved in `pokedex.json`  
- **Daily Quests** – random daily quests with rewards (e.g. guaranteed catch)  
- **Mystery Eggs** – viewers can claim 1 egg every 24h that hatches into a random Pokémon after 30 minutes  
- **Evolution System** – evolve Pokémon you’ve owned for 3+ days into their next stage  
- **Giveaways** – mods can host timed giveaways for rare Pokémon  
- **Shiny Pokémon** – rare chance for shinies with glowing overlay effects  
- **Overlay Animations** – spawn, catch shakes, egg hatching, giveaways, and flashy evolution animations  

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
