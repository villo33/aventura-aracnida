/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 06 — BOSQUE OSCURO
   ========================================================= */

window.LEVEL_06 = {

    id: 6,

    name: "Bosque Oscuro",

    world: "darkForest",

    player: {
        x: 120,
        y: 380,
        lives: 3
    },

    /* =========================
       ESTRELLAS
       ========================= */

    collectibles: [

        { type: "star", x: 280,  y: 390 },
        { type: "star", x: 550,  y: 350 },
        { type: "star", x: 820,  y: 390 },
        { type: "star", x: 1100, y: 330 },
        { type: "star", x: 1380, y: 390 },
        { type: "star", x: 1660, y: 350 },
        { type: "star", x: 1950, y: 390 },
        { type: "star", x: 2230, y: 330 },
        { type: "star", x: 2510, y: 390 },
        { type: "star", x: 2790, y: 350 },
        { type: "star", x: 3070, y: 390 },
        { type: "star", x: 3350, y: 350 }

    ],

    /* =========================
       DINOSAURIOS
       ========================= */

    dinosaurs: [

        {
            type: "triceratops",
            x: 480,
            y: 380,
            speed: 0.55,
            direction: 1,
            minX: 400,
            maxX: 650
        },

        {
            type: "trex",
            x: 800,
            y: 380,
            speed: 0.65,
            direction: -1,
            minX: 700,
            maxX: 950
        },

        {
            type: "triceratops",
            x: 1150,
            y: 380,
            speed: 0.60,
            direction: 1,
            minX: 1050,
            maxX: 1300
        },

        {
            type: "trex",
            x: 1450,
            y: 380,
            speed: 0.70,
            direction: -1,
            minX: 1350,
            maxX: 1600
        },

        {
            type: "triceratops",
            x: 1800,
            y: 380,
            speed: 0.60,
            direction: 1,
            minX: 1700,
            maxX: 1950
        },

        {
            type: "trex",
            x: 2150,
            y: 380,
            speed: 0.75,
            direction: -1,
            minX: 2050,
            maxX: 2300
        },

        {
            type: "triceratops",
            x: 2500,
            y: 380,
            speed: 0.65,
            direction: 1,
            minX: 2400,
            maxX: 2650
        },

        {
            type: "trex",
            x: 2850,
            y: 380,
            speed: 0.80,
            direction: -1,
            minX: 2750,
            maxX: 3000
        },

        {
            type: "triceratops",
            x: 3200,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 3100,
            maxX: 3400
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        {
            x: 0,
            y: 500,
            width: 3700,
            height: 100
        },

        {
            x: 280,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 600,
            y: 390,
            width: 150,
            height: 20
        },

        {
            x: 850,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1100,
            y: 360,
            width: 150,
            height: 20
        },

        {
            x: 1350,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1650,
            y: 380,
            width: 150,
            height: 20
        },

        {
            x: 1900,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 2200,
            y: 350,
            width: 150,
            height: 20
        },

        {
            x: 2450,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 2750,
            y: 380,
            width: 150,
            height: 20
        },

        {
            x: 3000,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 3250,
            y: 380,
            width: 170,
            height: 20
        }

    ],

    /* =========================
       META
       ========================= */

    goal: {

        x: 3500,

        y: 360,

        width: 120,

        height: 140

    },

    /* =========================
       AUDIO
       ========================= */

    music: "dark-forest.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};