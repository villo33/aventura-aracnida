/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 09 — CRÁTER FINAL
   ========================================================= */

window.LEVEL_09 = {

    id: 9,

    name: "Cráter Final",

    world: "crater",

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
        { type: "star", x: 520,  y: 340 },
        { type: "star", x: 780,  y: 390 },
        { type: "star", x: 1050, y: 320 },
        { type: "star", x: 1320, y: 390 },
        { type: "star", x: 1600, y: 340 },
        { type: "star", x: 1880, y: 390 },
        { type: "star", x: 2160, y: 320 },
        { type: "star", x: 2440, y: 390 },
        { type: "star", x: 2720, y: 340 },
        { type: "star", x: 3000, y: 390 },
        { type: "star", x: 3280, y: 320 },
        { type: "star", x: 3560, y: 390 },
        { type: "star", x: 3840, y: 340 },
        { type: "star", x: 4120, y: 390 }

    ],

    /* =========================
       DINOSAURIOS
       ========================= */

    dinosaurs: [

        {
            type: "trex",
            x: 450,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 380,
            maxX: 650
        },

        {
            type: "triceratops",
            x: 750,
            y: 380,
            speed: 0.60,
            direction: -1,
            minX: 680,
            maxX: 900
        },

        {
            type: "trex",
            x: 1050,
            y: 380,
            speed: 0.75,
            direction: 1,
            minX: 950,
            maxX: 1200
        },

        {
            type: "triceratops",
            x: 1400,
            y: 380,
            speed: 0.65,
            direction: -1,
            minX: 1300,
            maxX: 1550
        },

        {
            type: "trex",
            x: 1750,
            y: 380,
            speed: 0.80,
            direction: 1,
            minX: 1650,
            maxX: 1900
        },

        {
            type: "triceratops",
            x: 2100,
            y: 380,
            speed: 0.70,
            direction: -1,
            minX: 2000,
            maxX: 2250
        },

        {
            type: "trex",
            x: 2450,
            y: 380,
            speed: 0.85,
            direction: 1,
            minX: 2350,
            maxX: 2600
        },

        {
            type: "triceratops",
            x: 2800,
            y: 380,
            speed: 0.75,
            direction: -1,
            minX: 2700,
            maxX: 2950
        },

        {
            type: "trex",
            x: 3150,
            y: 380,
            speed: 0.90,
            direction: 1,
            minX: 3050,
            maxX: 3300
        },

        {
            type: "triceratops",
            x: 3500,
            y: 380,
            speed: 0.80,
            direction: -1,
            minX: 3400,
            maxX: 3650
        },

        {
            type: "trex",
            x: 3850,
            y: 380,
            speed: 0.95,
            direction: 1,
            minX: 3750,
            maxX: 4050
        },

        {
            type: "trex",
            x: 4200,
            y: 380,
            speed: 1.00,
            direction: -1,
            minX: 4100,
            maxX: 4300
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        {
            x: 0,
            y: 500,
            width: 4600,
            height: 100
        },

        {
            x: 280,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 550,
            y: 380,
            width: 150,
            height: 20
        },

        {
            x: 820,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1050,
            y: 350,
            width: 150,
            height: 20
        },

        {
            x: 1300,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1600,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 1850,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 2150,
            y: 340,
            width: 150,
            height: 20
        },

        {
            x: 2400,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 2700,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 2950,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 3250,
            y: 340,
            width: 150,
            height: 20
        },

        {
            x: 3500,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 3800,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 4050,
            y: 430,
            width: 170,
            height: 20
        }

    ],

    /* =========================
       META
       ========================= */

    goal: {

        x: 4400,

        y: 350,

        width: 130,

        height: 150

    },

    /* =========================
       AUDIO
       ========================= */

    music: "crater.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};