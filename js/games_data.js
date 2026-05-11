let games = {

    "horizon-zero-dawn": {
        "game_name": "Horizon Zero Dawn",
        "image": "images/horizon-card.jpg",
        "price": 60,
        "categories": ["explore", "new", "store-slide", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },
    
    "the-last-of-us-ii": {
        "game_name": "The Last Of Us II",
        "image": "images/the_last_of_us2.jpg",
        "price": 69.99,
        "categories": ["explore", "store-slide", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },

    "valorant": {
        "game_name": "Valorant",
        "image": "images/valorant.jpg",
        "price": "free",
        "categories": ["explore", "store-slide", "action", "windows", "5", "free", "multiplayer", "online", "strategy"],
        "badge": "RPG"
    },

        "god-of-war-ragnarok": {
        "game_name": "God Of War Ragnarok",
        "image": "images/god_of_war_ragnarok.jpg",
        "price": 50,
        "categories": ["explore", "new", "store-slide", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },

        "dying-light-the-beast": {
        "game_name": "Dying Light: The Beast",
        "image": "images/dying-light-card.jpg",
        "price": 60,
        "categories": ["explore", "new", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },

        "fc-26": {
        "game_name": "FC 26",
        "image": "images/fc26.jpg",
        "price": 69.99,
        "categories": ["explore", "most Played", "new", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },
    "spiderman": {
        "game_name": "Spider Man",
        "image": "images/spider.jpg",
        "price": 70,
        "categories": ["explore", "most Played", "new", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },
    "gta-v": {
        "game_name": "GTA V",
        "image": "images/gta-card.jpg",
        "price": 50,
        "categories": ["explore", "most Played", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },

    "minecraft": {
        "game_name": "Minecraft",
        "image": "images/minecraft.jpg",
        "price": 40,
        "categories": ["explore", "most Played", "store-slide", "adventure", "openWorld", "puzzle", "platform", "windows", "macOs", "ios", "android", "5", "10$-20$", "singlePlayer", "multiplayer", "coOp", "online", "offline"],
        "badge": "RPG"
    },

    "cyberpunk-2077": {
        "game_name": "Cyberpunk 2077",
        "image": "images/cyberpunk.jpg",
        "price": 56,
        "categories": ["explore", "most Played", "new", "store-slide", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },

    "poppy-playtime": {
        "game_name": "Poppy Playtime",
        "image": "images/poppy-card.jpg",
        "price": 70,
        "categories": ["explore", "new", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },
    "roblox": {
        "game_name": "Roblox",
        "image": "images/roblox-card.jpg",
        "price": 15,
        "categories": ["explore", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },

        "elden-ring": {
        "game_name": "Elden ring",
        "image": "images/elden_ring.jpg",
        "price": 60,
        "categories": ["explore", "new", "action", "RPG", "openWorld", "windows", "5", "40$", "singlePlayer", "multiplayer", "coOp", "online", "offline", "strategy"],
        "badge": "RPG"
    },

        "red-dead-redemption-2": {
        "game_name": "Red dead redemption 2",
        "image": "images/red_dead_redemption_2.jpg",
        "price": 45,
        "categories": ["explore", "most Played", "action", "adventure", "openWorld", "windows", "macOs", "5", "40$", "singlePlayer", "multiplayer", "online", "offline"],
        "badge": "RPG"
    },

    "nba-2k26": {
        "game_name": "NBA 2K26",
        "image": "images/nba-card.jpg",
        "price": 80,
        "categories": ["explore", "new", "action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge": "RPG"
    },
};
// if(!localStorage.getItem("games"))
localStorage.setItem("games", JSON.stringify(games))

