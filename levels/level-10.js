/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 10 — MUNDO PERDIDO
   ========================================================= */

window.LEVEL_10 = {

    id: 10,

    name: "Mundo Perdido",

    world: "lostWorld",

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
        { type: "star", x: 540,  y: 340 },
        { type: "star", x: 820,  y: 390 },
        { type: "star", x: 1100, y: 320 },
        { type: "star", x: 1380, y: 390 },
        { type: "star", x: 1660, y: 340 },
        { type: "star", x: 1940, y: 390 },
        { type: "star", x: 2220, y: 320 },
        { type: "star", x: 2500, y: 390 },
        { type: "star", x: 2780, y: 340 },
        { type: "star", x: 3060, y: 390 },
        { type: "star", x: 3340, y: 320 },
        { type: "star", x: 3620, y: 390 },
        { type: "star", x: 3900, y: 340 },
        { type: "star", x: 4180, y: 390 },
        { type: "star", x: 4460, y: 340 }

    ],

    /* =========================
       DINOSAURIOS
       ========================= */

    dinosaurs: [

        {
            type: "triceratops",
            x: 450,
            y: 380,
            speed: 0.65,
            direction: 1,
            minX: 380,
            maxX: 650
        },

        {
            type: "trex",
            x: 750,
            y: 380,
            speed: 0.75,
            direction: -1,
            minX: 650,
            maxX: 950
        },

        {
            type: "triceratops",
            x: 1100,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 1000,
            maxX: 1250
        },

        {
            type: "trex",
            x: 1450,
            y: 380,
            speed: 0.80,
            direction: -1,
            minX: 1350,
            maxX: 1600
        },

        {
            type: "triceratops",
            x: 1800,
            y: 380,
            speed: 0.75,
            direction: 1,
            minX: 1700,
            maxX: 1950
        },

        {
            type: "trex",
            x: 2150,
            y: 380,
            speed: 0.85,
            direction: -1,
            minX: 2050,
            maxX: 2300
        },

        {
            type: "triceratops",
            x: 2500,
            y: 380,
            speed: 0.80,
            direction: 1,
            minX: 2400,
            maxX: 2650
        },

        {
            type: "trex",
            x: 2850,
            y: 380,
            speed: 0.90,
            direction: -1,
            minX: 2750,
            maxX: 3000
        },

        {
            type: "triceratops",
            x: 3200,
            y: 380,
            speed: 0.85,
            direction: 1,
            minX: 3100,
            maxX: 3350
        },

        {
            type: "trex",
            x: 3550,
            y: 380,
            speed: 0.95,
            direction: -1,
            minX: 3450,
            maxX: 3700
        },

        {
            type: "triceratops",
            x: 3900,
            y: 380,
            speed: 0.90,
            direction: 1,
            minX: 3800,
            maxX: 4050
        },

        {
            type: "trex",
            x: 4250,
            y: 380,
            speed: 1.00,
            direction: -1,
            minX: 4150,
            maxX: 4400
        },

        {
            type: "trex",
            x: 4550,
            y: 380,
            speed: 1.05,
            direction: 1,
            minX: 4450,
            maxX: 4650
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        {
            x: 0,
            y: 500,
            width: 4900,
            height: 100
        },

        {
            x: 280,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 560,
            y: 380,
            width: 150,
            height: 20
        },

        {
            x: 840,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1100,
            y: 350,
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
            y: 370,
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
            y: 340,
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
            y: 370,
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
            x: 3300,
            y: 340,
            width: 150,
            height: 20
        },

        {
            x: 3550,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 3850,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 4100,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 4400,
            y: 350,
            width: 170,
            height: 20
        }

    ],

    /* =========================
       META
       ========================= */

    goal: {

        x: 4750,

        y: 350,

        width: 130,

        height: 150

    },

    /* =========================
       AUDIO
       ========================= */

    music: "lost-world.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};