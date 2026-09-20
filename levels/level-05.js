/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 05 — DESIERTO JURÁSICO
   ========================================================= */

window.LEVEL_05 = {

    id: 5,

    name: "Desierto Jurásico",

    world: "desert",

    player: {
        x: 120,
        y: 380,
        lives: 3
    },

    collectibles: [

        { type: "star", x: 280,  y: 390 },
        { type: "star", x: 560,  y: 350 },
        { type: "star", x: 850,  y: 390 },
        { type: "star", x: 1150, y: 330 },
        { type: "star", x: 1450, y: 390 },
        { type: "star", x: 1750, y: 350 },
        { type: "star", x: 2050, y: 390 },
        { type: "star", x: 2350, y: 330 },
        { type: "star", x: 2650, y: 390 },
        { type: "star", x: 2950, y: 350 },
        { type: "star", x: 3250, y: 390 },
        { type: "star", x: 3450, y: 350 }

    ],

    dinosaurs: [

        {
            type: "trex",
            x: 500,
            y: 380,
            speed: 0.60,
            direction: 1,
            minX: 420,
            maxX: 680
        },

        {
            type: "triceratops",
            x: 850,
            y: 380,
            speed: 0.50,
            direction: -1,
            minX: 760,
            maxX: 1000
        },

        {
            type: "trex",
            x: 1200,
            y: 380,
            speed: 0.65,
            direction: 1,
            minX: 1100,
            maxX: 1400
        },

        {
            type: "triceratops",
            x: 1550,
            y: 380,
            speed: 0.55,
            direction: -1,
            minX: 1450,
            maxX: 1700
        },

        {
            type: "trex",
            x: 1950,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 1850,
            maxX: 2150
        },

        {
            type: "triceratops",
            x: 2350,
            y: 380,
            speed: 0.55,
            direction: -1,
            minX: 2250,
            maxX: 2500
        },

        {
            type: "trex",
            x: 2700,
            y: 380,
            speed: 0.75,
            direction: 1,
            minX: 2600,
            maxX: 2850
        },

        {
            type: "triceratops",
            x: 3050,
            y: 380,
            speed: 0.60,
            direction: -1,
            minX: 2950,
            maxX: 3200
        },

        {
            type: "trex",
            x: 3350,
            y: 380,
            speed: 0.80,
            direction: -1,
            minX: 3250,
            maxX: 3450
        }

    ],

    platforms: [

        {
            x: 0,
            y: 500,
            width: 3800,
            height: 100
        },

        {
            x: 300,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 620,
            y: 390,
            width: 150,
            height: 20
        },

        {
            x: 900,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 1150,
            y: 360,
            width: 150,
            height: 20
        },

        {
            x: 1400,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 1700,
            y: 380,
            width: 150,
            height: 20
        },

        {
            x: 1950,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 2250,
            y: 350,
            width: 150,
            height: 20
        },

        {
            x: 2500,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 2800,
            y: 380,
            width: 150,
            height: 20
        },

        {
            x: 3050,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 3300,
            y: 380,
            width: 160,
            height: 20
        }

    ],

    goal: {

        x: 3550,

        y: 360,

        width: 120,

        height: 140

    },

    music: "desert.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};