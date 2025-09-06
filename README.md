# 📖 Twitch Pokémon Bot – README

## 🎮 About
This bot brings Pokémon catching fun to your Twitch chat!
Viewers can catch randomly spawning Pokémon using chat commands. The bot also provides a visual **overlay** for OBS or any streaming platform.

---

## ⚙️ Setup

1. **Download & Extract**
   - Place all files in the same folder (including `start.exe`, `config.json`, `pokemon.json`, `overlay.html`, `assets/`).

2. **Edit Configuration**
   - Open `config.json` with any text editor and update:
     ```json
     {
       "botUsername": "YourBotName",
       "oauthToken": "oauth:xxxxxx",
       "channel": "yourchannel",
       "prefix": "!",
       "spawnIntervalMin": 120,
       "spawnIntervalMax": 300
     }
     ```
   - `botUsername`: Your Twitch bot’s username.  
   - `oauthToken`: Twitch OAuth token (get one at https://twitchapps.com/tmi/).  
   - `channel`: Your Twitch channel name.  
   - `prefix`: Command prefix (default = `!`).  
   - `spawnIntervalMin` / `spawnIntervalMax`: Auto-spawn timer in seconds (default 2–5 minutes).

3. **Start the Bot**
   - Just double-click `start.exe`.
   - A terminal window will open, showing bot logs.

---

## 🎥 Adding Overlay to OBS

1. Open **OBS Studio** (or your streaming software).
2. Add a **Browser Source**.
3. Instead of a URL, click **Browse** and select the file:
   ```
   overlay.html
   ```
   (Make sure it’s the one in the bot’s folder).
4. Adjust the size/position of the overlay.
   - Pokémon and Pokéballs will now animate live during your stream!

---

## 💬 Commands

### Moderator / Broadcaster Only
- `!pokemon` → Spawns a random Pokémon.
- `!pokemon <id>` → Spawns a Pokémon by Pokédex ID.
- `!pokemon <name>` → Spawns a Pokémon by name.
- `!pokestop` → Forces the current Pokémon to flee.

### Everyone
- `!catch` → Try to catch the active Pokémon with a Pokéball.

### Subscribers
- `!catch greatball` → Tier 1+ subs only.
- `!catch ultraball` → Tier 2+ subs only.
- `!catch masterball` → Tier 3 subs only.

### Pokédex
- `!pokedex` → Shows the list of Pokémon you’ve caught.

---

## 📂 Files Overview

- `start.exe` → The bot program (double-click to start).
- `config.json` → Configuration file.
- `pokemon.json` → Full Pokémon list (1–1164).
- `pokedex.json` → Auto-generated per-user Pokédex.
- `overlay.html` → Overlay for OBS.
- `assets/` → Sprites, Pokéballs, sounds.

---

## ✅ Notes
- Keep all files together in the same folder.
- Closing the `start.exe` window will stop the bot.
- The bot auto-spawns Pokémon every 2–5 minutes (customizable in config).



### 🔑 Getting your Twitch OAuth Token
1. Go to [Twitch Token Generator](https://twitchtokengenerator.com).
2. Click **"Custom Scope Token"**.
3. Log in with the Twitch account you want the bot to use.
4. Under **Scopes**, select:
   - `chat:read` (read chat messages)
   - `chat:edit` (send messages in chat)
5. Click **Generate Token**.
6. Copy the generated **OAuth Token** and paste it into your `config.json` under:
   ```json
   "oauthToken": "oauth:xxxxxxxxxxxxxxxxxxxx"
   ```

⚠️ Keep this token private — anyone with it can send messages as your bot account!
