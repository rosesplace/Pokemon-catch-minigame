# 🎮 PokéCharm -- Twitch Pokémon Catching Game

Bring the fun of catching Pokémon to your Twitch chat with
**PokéCharm**!\
A bot spawns wild Pokémon in your chat and on-screen overlay, and
viewers can try to catch them live.

------------------------------------------------------------------------

## 📂 What's included

Your folder should look like this:

    PokemonBot/
    │
    ├─ pokecharm.exe          ← run this to start the bot
    ├─ config.json            ← edit this to set your channel, prefix & settings
    ├─ pokemon.json           ← master Pokémon list (don’t touch)
    ├─ pokedex.json           ← auto-created/saved player catches
    ├─ overlay.html           ← load into OBS as Browser Source
    │
    └─ assets/                ← images & sounds for overlay
       ├─ sprites/            ← Pokémon sprites
       ├─ balls/              ← Pokéball images
       └─ sounds/             ← catch/shake/breakout sounds

------------------------------------------------------------------------

## ⚙️ Setup

1.  **Edit `config.json`**\
    Open with a text editor and set:

    ``` json
    {
      "prefix": "!",
      "channel": "rosesplace",
      "spawnIntervalMin": 120,
      "spawnIntervalMax": 300,
      "fleeTimeMin": 30,
      "fleeTimeMax": 60,
      "startupMessage": "🌟 The Pokémon Catch Minigame has now started! Get ready for wild encounters..."
    }
    ```

    -   `channel`: Your Twitch channel name (lowercase).\
    -   `prefix`: Command prefix (default: `!`).\
    -   `spawnIntervalMin/Max`: How often Pokémon appear (seconds).\
    -   `fleeTimeMin/Max`: How long they stay before fleeing (seconds).

2.  **Start the bot**\
    Run `pokecharm.exe`.\
    If successful, you'll see:

        ✅ Bot connected, starting auto spawns...
        ✅ WebSocket overlay server running on ws://localhost:8080

3.  **Set up OBS overlay**

    -   Open OBS → *Sources* → Add → **Browser Source**.\
    -   Choose **Local File**, and select `overlay.html`.\
    -   Set width to `1080` and height to `720`.\
    -   Pokémon will now appear on screen when they spawn!

------------------------------------------------------------------------

## 🎮 Commands

Viewers can interact with these commands:

    !catch                → try catching with a Pokéball
    !catch greatball      → Tier 1+ subs only
    !catch ultraball      → Tier 2+ subs only
    !catch masterball     → Tier 3 subs only
    !pokedex              → see your personal Pokédex

Moderator-only:

    !pokemon              → manually spawn a Pokémon
    !pokestop             → force current Pokémon to flee

------------------------------------------------------------------------

## 🐾 Notes

-   The bot always uses the **PokéCharm** account by default.\
-   Each viewer's catches are saved in `pokedex.json`.\
-   You must keep **assets/** and **overlay.html** in the same folder as
    `pokecharm.exe`.
-   For ultimate feeling, moderate the bot
-   Make sure you start the bot BEFORE obs!
