let games = {

    "valorant": {
        "game_name":"Valorant",
        "image": "images/valorant.jpg",
        "price": "free",
        "categories": ["explore",  "action", "windows", "5", "free", "multiplayer", "online","strategy"],
        "badge":"RPG"
    },

    "red_dead_redemption_2": {
        "game_name":"Red dead redemption 2",
        "image": "images/red_dead_redemption_2.jpg",
        "price": "$45",
        "categories": ["explore","new","action", "adventure", "openWorld", "windows", "macOs", "5", "40$", "singlePlayer", "multiplayer", "online", "offline"],
        "badge":"RPG"
    },

    "elden_ring": {
        "game_name":"Elden ring",
        "image": "images/elden_ring.jpg",
        "price": 60,
        "categories": ["explore","new","action", "RPG", "openWorld", "windows", "5", "40$", "singlePlayer", "multiplayer", "coOp", "online", "offline","strategy"],
        "badge":"RPG"
    },

    "minecraft": {
        "game_name":"Minecraft",
        "image": "images/minecraft.jpg",
        "price": 15,
        "categories": ["explore","new","adventure", "openWorld", "puzzle", "platform", "windows", "macOs", "ios", "android", "5", "10$-20$", "singlePlayer", "multiplayer", "coOp", "online", "offline"],
        "badge":"RPG"
    },

    "cyberpunk_2077": {
        "game_name":"Cyberpunk 2077",
        "image": "images/cyberpunk.jpg",
        "price": 20,
        "categories": ["explore","new","action", "RPG", "openWorld", "windows", "4", "20$-30$", "singlePlayer", "offline"],
        "badge":"RPG"
    },
};
// if(!localStorage.getItem("games"))
    localStorage.setItem("games",JSON.stringify(games))

