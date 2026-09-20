/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   NIVEL 12 — REINO DE LOS DINOSAURIOS
   GRAN NIVEL FINAL
   ========================================================= */

window.LEVEL_12 = {

    id: 12,

    name: "Reino de los Dinosaurios",

    world: "dinosaurKingdom",

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
        { type: "star", x: 520,  y: 330 },
        { type: "star", x: 760,  y: 390 },
        { type: "star", x: 1000, y: 300 },
        { type: "star", x: 1240, y: 390 },
        { type: "star", x: 1480, y: 330 },
        { type: "star", x: 1720, y: 390 },
        { type: "star", x: 1960, y: 300 },
        { type: "star", x: 2200, y: 390 },
        { type: "star", x: 2440, y: 330 },
        { type: "star", x: 2680, y: 390 },
        { type: "star", x: 2920, y: 300 },
        { type: "star", x: 3160, y: 390 },
        { type: "star", x: 3400, y: 330 },
        { type: "star", x: 3640, y: 390 },
        { type: "star", x: 3880, y: 300 },
        { type: "star", x: 4120, y: 390 },
        { type: "star", x: 4360, y: 330 },
        { type: "star", x: 4600, y: 390 },
        { type: "star", x: 4840, y: 300 },
        { type: "star", x: 5080, y: 390 },
        { type: "star", x: 5320, y: 330 }

    ],

    /* =========================
       DINOSAURIOS
       ========================= */

    dinosaurs: [

        {
            type: "triceratops",
            x: 420,
            y: 380,
            speed: 0.65,
            direction: 1,
            minX: 350,
            maxX: 600
        },

        {
            type: "trex",
            x: 700,
            y: 380,
            speed: 0.75,
            direction: -1,
            minX: 600,
            maxX: 850
        },

        {
            type: "triceratops",
            x: 1000,
            y: 380,
            speed: 0.70,
            direction: 1,
            minX: 900,
            maxX: 1150
        },

        {
            type: "trex",
            x: 1300,
            y: 380,
            speed: 0.85,
            direction: -1,
            minX: 1200,
            maxX: 1450
        },

        {
            type: "triceratops",
            x: 1600,
            y: 380,
            speed: 0.75,
            direction: 1,
            minX: 1500,
            maxX: 1750
        },

        {
            type: "trex",
            x: 1900,
            y: 380,
            speed: 0.90,
            direction: -1,
            minX: 1800,
            maxX: 2050
        },

        {
            type: "triceratops",
            x: 2200,
            y: 380,
            speed: 0.80,
            direction: 1,
            minX: 2100,
            maxX: 2350
        },

        {
            type: "trex",
            x: 2500,
            y: 380,
            speed: 0.95,
            direction: -1,
            minX: 2400,
            maxX: 2650
        },

        {
            type: "triceratops",
            x: 2800,
            y: 380,
            speed: 0.85,
            direction: 1,
            minX: 2700,
            maxX: 2950
        },

        {
            type: "trex",
            x: 3100,
            y: 380,
            speed: 1.00,
            direction: -1,
            minX: 3000,
            maxX: 3250
        },

        {
            type: "triceratops",
            x: 3400,
            y: 380,
            speed: 0.90,
            direction: 1,
            minX: 3300,
            maxX: 3550
        },

        {
            type: "trex",
            x: 3700,
            y: 380,
            speed: 1.05,
            direction: -1,
            minX: 3600,
            maxX: 3850
        },

        {
            type: "triceratops",
            x: 4000,
            y: 380,
            speed: 0.95,
            direction: 1,
            minX: 3900,
            maxX: 4150
        },

        {
            type: "trex",
            x: 4300,
            y: 380,
            speed: 1.10,
            direction: -1,
            minX: 4200,
            maxX: 4450
        },

        {
            type: "triceratops",
            x: 4600,
            y: 380,
            speed: 1.00,
            direction: 1,
            minX: 4500,
            maxX: 4750
        },

        {
            type: "trex",
            x: 4900,
            y: 380,
            speed: 1.15,
            direction: -1,
            minX: 4800,
            maxX: 5050
        },

        {
            type: "triceratops",
            x: 5200,
            y: 380,
            speed: 1.05,
            direction: 1,
            minX: 5100,
            maxX: 5350
        }

    ],

    /* =========================
       PLATAFORMAS
       ========================= */

    platforms: [

        {
            x: 0,
            y: 500,
            width: 5700,
            height: 100
        },

        {
            x: 260,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 500,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 740,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 980,
            y: 330,
            width: 150,
            height: 20
        },

        {
            x: 1220,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 1460,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 1700,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 1940,
            y: 330,
            width: 150,
            height: 20
        },

        {
            x: 2180,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 2420,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 2660,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 2900,
            y: 330,
            width: 150,
            height: 20
        },

        {
            x: 3140,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 3380,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 3620,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 3860,
            y: 330,
            width: 150,
            height: 20
        },

        {
            x: 4100,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 4340,
            y: 370,
            width: 150,
            height: 20
        },

        {
            x: 4580,
            y: 430,
            width: 150,
            height: 20
        },

        {
            x: 4820,
            y: 330,
            width: 150,
            height: 20
        },

        {
            x: 5060,
            y: 430,
            width: 160,
            height: 20
        },

        {
            x: 5300,
            y: 360,
            width: 180,
            height: 20
        }

    ],

    /* =========================
       META FINAL
       ========================= */

    goal: {

        x: 5500,

        y: 320,

        width: 150,

        height: 180

    },

    /* =========================
       AUDIO
       ========================= */

    music: "dinosaur-kingdom.mp3",

    sounds: {

        jump: "jump.wav",

        collect: "collect.wav",

        dinosaur: "dinosaur.mp3",

        victory: "victory.wav"

    }

};