/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 02 — VOLCÁN JURÁSICO
   ========================================================= */

window.LEVEL_02 = {

    id: 2,

    name: "Volcán Jurásico",

    world: "volcano",

    player: {
        x: 120,
        y: 380,
        lives: 3
    },

    /* =========================
       ESTRELLAS
       ========================= */

    collectibles: [

        { type: "star", x: 300,  y: 390 },
        { type: "star", x: 620,  y: 350 },
        { type: "star", x: 900,  y: 390 },
        { type: "star", x: 1200, y: 330 },
        { type: "star", x: 1500, y: 390 },
        { type: "star", x: 1800, y: 350 },
        { type: "star", x: 2150, y: 390 },
        { type: "star", x: 2500, y: 330 },
        { type: "star", x: 2850, y: 390 },
        { type: "star", x: 3200, y: 350 }

    ],

    /* =========================
       DINOSAURIOS
       ========================= */

    dinosaurs: [

        {
            type: "trex",
            x: 520,
            y: 380,
            speed: 0.55,
            direction: 1,
            minX: 450,
            maxX: 700
        },

        {
            type: "triceratops",
            x: 950,
            y: 380,
            speed: 0.45,
            direction: -1,
            minX: 850,
            maxX: 1100
        },

        {
            type: "trex",
            x: 1350,
            y: 380,
            speed: 0.60,
            direction: 1,
            minX: 1250,
            maxX: 1500
        },

        {
            type: "triceratops",
            x: 1750,
            y: 380,
            speed: 0.50,
            direction: -1,
            minX: 1650,
            maxX: 1900
        },

        {
            type: "trex",
            x: 2200,
            y: 380,
            speed: 0.65,
            direction: 1,
            minX: 2100,
            maxX: 2350
        },

        {
            type: "triceratops",
            x: 2650,
            y: 380,
            speed: 0.50,
            direction: -1,
            minX: 2550,
            maxX: 2800
        },

        {
            type: "trex",
            x: 3100,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 3000,
            maxX: 3250
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        /* suelo principal */

        {
            x: 0,
            y: 500,
            width: 3600,
            height: 100
        },

        /* plataformas */

        {
            x: 350,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 700,
            y: 400,
            width: 150,
            height: 20
        },

        {
            x: 1000,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1250,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 1550,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 1850,
            y: 390,
            width: 150,
            height: 20
        },

        {
            x: 2150,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 2450,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 2750,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 3050,
            y: 390,
            width: 170,
            height: 20
        }

    ],

    /* =========================
       META
       ========================= */

    goal: {

        x: 3350,

        y: 360,

        width: 120,

        height: 140

    },

    /* =========================
       AUDIO
       ========================= */

    music: "volcano.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};