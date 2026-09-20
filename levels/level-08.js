/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 08 — COSTA PREHISTÓRICA
   ========================================================= */

window.LEVEL_08 = {

    id: 8,

    name: "Costa Prehistórica",

    world: "coast",

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
        { type: "star", x: 560,  y: 340 },
        { type: "star", x: 850,  y: 390 },
        { type: "star", x: 1150, y: 320 },
        { type: "star", x: 1450, y: 390 },
        { type: "star", x: 1750, y: 340 },
        { type: "star", x: 2050, y: 390 },
        { type: "star", x: 2350, y: 320 },
        { type: "star", x: 2650, y: 390 },
        { type: "star", x: 2950, y: 340 },
        { type: "star", x: 3250, y: 390 },
        { type: "star", x: 3550, y: 340 },
        { type: "star", x: 3800, y: 390 }

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
            x: 1500,
            y: 380,
            speed: 0.70,
            direction: -1,
            minX: 1400,
            maxX: 1650
        },

        {
            type: "triceratops",
            x: 1850,
            y: 380,
            speed: 0.65,
            direction: 1,
            minX: 1750,
            maxX: 2000
        },

        {
            type: "trex",
            x: 2200,
            y: 380,
            speed: 0.75,
            direction: -1,
            minX: 2100,
            maxX: 2350
        },

        {
            type: "triceratops",
            x: 2550,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 2450,
            maxX: 2700
        },

        {
            type: "trex",
            x: 2900,
            y: 380,
            speed: 0.80,
            direction: -1,
            minX: 2800,
            maxX: 3050
        },

        {
            type: "triceratops",
            x: 3250,
            y: 380,
            speed: 0.75,
            direction: 1,
            minX: 3150,
            maxX: 3400
        },

        {
            type: "trex",
            x: 3600,
            y: 380,
            speed: 0.90,
            direction: -1,
            minX: 3500,
            maxX: 3750
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        {
            x: 0,
            y: 500,
            width: 4200,
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
            y: 380,
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
            y: 350,
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
            y: 370,
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
            y: 340,
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
            y: 370,
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
            x: 3350,
            y: 370,
            width: 170,
            height: 20
        },

        {
            x: 3650,
            y: 430,
            width: 170,
            height: 20
        }

    ],

    /* =========================
       META
       ========================= */

    goal: {

        x: 3950,

        y: 360,

        width: 120,

        height: 140

    },

    /* =========================
       AUDIO
       ========================= */

    music: "coast.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};