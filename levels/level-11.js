/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 11 — PORTAL DEL TIEMPO
   ========================================================= */

window.LEVEL_11 = {

    id: 11,

    name: "Portal del Tiempo",

    world: "timePortal",

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
        { type: "star", x: 540,  y: 330 },
        { type: "star", x: 820,  y: 390 },
        { type: "star", x: 1100, y: 310 },
        { type: "star", x: 1380, y: 390 },
        { type: "star", x: 1660, y: 330 },
        { type: "star", x: 1940, y: 390 },
        { type: "star", x: 2220, y: 310 },
        { type: "star", x: 2500, y: 390 },
        { type: "star", x: 2780, y: 330 },
        { type: "star", x: 3060, y: 390 },
        { type: "star", x: 3340, y: 310 },
        { type: "star", x: 3620, y: 390 },
        { type: "star", x: 3900, y: 330 },
        { type: "star", x: 4180, y: 390 },
        { type: "star", x: 4460, y: 330 },
        { type: "star", x: 4740, y: 390 }

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
            minX: 650,
            maxX: 950
        },

        {
            type: "trex",
            x: 1050,
            y: 380,
            speed: 0.80,
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
            speed: 0.85,
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
            speed: 0.90,
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
            speed: 0.95,
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
            speed: 1.00,
            direction: 1,
            minX: 3750,
            maxX: 4000
        },

        {
            type: "triceratops",
            x: 4200,
            y: 380,
            speed: 0.85,
            direction: -1,
            minX: 4100,
            maxX: 4350
        },

        {
            type: "trex",
            x: 4550,
            y: 380,
            speed: 1.05,
            direction: 1,
            minX: 4450,
            maxX: 4700
        },

        {
            type: "trex",
            x: 4850,
            y: 380,
            speed: 1.10,
            direction: -1,
            minX: 4750,
            maxX: 4950
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        {
            x: 0,
            y: 500,
            width: 5200,
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
            y: 370,
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
            y: 340,
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
            y: 360,
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
            y: 330,
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
            y: 360,
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
            y: 330,
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
            y: 360,
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
            y: 330,
            width: 150,
            height: 20
        },

        {
            x: 4650,
            y: 430,
            width: 170,
            height: 20
        },

        {
            x: 4900,
            y: 360,
            width: 180,
            height: 20
        }

    ],

    /* =========================
       META — PORTAL
       ========================= */

    goal: {

        x: 5050,

        y: 340,

        width: 140,

        height: 160

    },

    /* =========================
       AUDIO
       ========================= */

    music: "time-portal.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};