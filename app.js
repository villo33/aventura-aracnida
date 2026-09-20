/* =========================================================
   AVENTURA DEL HÉROE ARÁCNIDO
   MOTOR PRINCIPAL
   PC + CELULAR
   12 NIVELES
   SONIDO + MÚSICA
   PROGRESIÓN DE NIVELES
   REPETIR NIVEL
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const btnJugar = document.getElementById("btnJugar");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const estrellasTexto =
    document.getElementById("estrellas");

const nivelTexto =
    document.getElementById("nivel");

const vidasTexto =
    document.getElementById("vidas");


/* =========================================================
   IMAGEN DEL HÉROE
   ========================================================= */

const imagenHeroe = new Image();

imagenHeroe.src =
    "assets/images/characters/heroe.png";

let heroeCargado = false;

imagenHeroe.onload = () => {

    heroeCargado = true;

    console.log(
        "HÉROE CARGADO CORRECTAMENTE"
    );

};

imagenHeroe.onerror = () => {

    console.error(
        "NO SE PUDO CARGAR assets/images/characters/heroe.png"
    );

};


/* =========================================================
   DINOSAURIOS
   ========================================================= */

const imagenTrex = new Image();

imagenTrex.src =
    "assets/images/dinosaurs/trex.png";


const imagenTriceratops = new Image();

imagenTriceratops.src =
    "assets/images/dinosaurs/triceratops.png";


let trexCargado = false;
let triceratopsCargado = false;


imagenTrex.onload = () => {

    trexCargado = true;

    console.log(
        "T-REX CARGADO CORRECTAMENTE"
    );

};


imagenTrex.onerror = () => {

    console.error(
        "NO SE PUDO CARGAR assets/images/dinosaurs/trex.png"
    );

};


imagenTriceratops.onload = () => {

    triceratopsCargado = true;

    console.log(
        "TRICERATOPS CARGADO CORRECTAMENTE"
    );

};


imagenTriceratops.onerror = () => {

    console.error(
        "NO SE PUDO CARGAR assets/images/dinosaurs/triceratops.png"
    );

};


/* =========================================================
   SISTEMA DE AUDIO
   ========================================================= */

const audioJuego = {

    musica: null,

    sonidos: {},

    activado: true,

    musicaIniciada: false

};


/* =========================================================
   WEB AUDIO
   ========================================================= */

let audioContext = null;

let musicaGeneradaActiva = false;

let musicaGeneradaTimer = null;

let indiceMusicaGenerada = 0;


/* =========================================================
   RUGIDOS
   ========================================================= */

let ultimoRugido = 0;

const INTERVALO_RUGIDO = 650;

let ultimoRugidoDinosaurio = 0;

const DISTANCIA_RUGIDO = 320;

const INTERVALO_RUGIDO_AUTOMATICO = 3500;


/* =========================================================
   AUDIO CONTEXT
   ========================================================= */

function obtenerAudioContext() {

    if (!audioContext) {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (AudioContext) {

            audioContext =
                new AudioContext();

        }

    }


    if (
        audioContext &&
        audioContext.state === "suspended"
    ) {

        audioContext.resume().catch(() => {});

    }


    return audioContext;

}


/* =========================================================
   MÚSICA REAL
   ========================================================= */

audioJuego.musica =
    new Audio(
        "assets/music/jungle.mp3"
    );

audioJuego.musica.loop = true;

audioJuego.musica.volume = 0.28;


/* =========================================================
   SONIDOS REALES
   ========================================================= */

audioJuego.sonidos.jump =
    new Audio(
        "assets/sounds/jump.wav"
    );


audioJuego.sonidos.collect =
    new Audio(
        "assets/sounds/collect.wav"
    );


audioJuego.sonidos.dinosaur =
    new Audio(
        "assets/sounds/dinosaur.mp3"
    );


audioJuego.sonidos.victory =
    new Audio(
        "assets/sounds/victory.wav"
    );


audioJuego.sonidos.jump.volume = 0.55;

audioJuego.sonidos.collect.volume = 0.65;

audioJuego.sonidos.dinosaur.volume = 0.90;

audioJuego.sonidos.victory.volume = 0.75;


Object.values(
    audioJuego.sonidos
).forEach(
    sonido => {

        sonido.preload = "auto";

    }
);

audioJuego.musica.preload =
    "auto";


const audioArchivoDisponible = {

    jump: false,

    collect: false,

    dinosaur: false,

    victory: false,

    musica: false

};


/* =========================================================
   EVENTOS AUDIO
   ========================================================= */

audioJuego.musica.addEventListener(
    "canplaythrough",
    () => {

        audioArchivoDisponible.musica =
            true;

    }
);


Object.entries(
    audioJuego.sonidos
).forEach(
    ([nombre, sonido]) => {

        sonido.addEventListener(
            "canplaythrough",
            () => {

                audioArchivoDisponible[nombre] =
                    true;

            }
        );

    }
);


audioJuego.musica.addEventListener(
    "error",
    () => {

        audioArchivoDisponible.musica =
            false;

        console.warn(
            "Música real no disponible."
        );

    }
);


Object.entries(
    audioJuego.sonidos
).forEach(
    ([nombre, sonido]) => {

        sonido.addEventListener(
            "error",
            () => {

                audioArchivoDisponible[nombre] =
                    false;

                console.warn(
                    `Sonido no disponible: ${nombre}`
                );

            }
        );

    }
);


/* =========================================================
   TONOS
   ========================================================= */

function crearTono(
    frecuenciaInicial,
    frecuenciaFinal,
    duracion,
    tipo = "sine",
    volumen = 0.06
) {

    if (!audioJuego.activado) {

        return;

    }


    const ac =
        obtenerAudioContext();

    if (!ac) {

        return;

    }


    const oscilador =
        ac.createOscillator();

    const ganancia =
        ac.createGain();


    oscilador.type =
        tipo;


    oscilador.frequency.setValueAtTime(
        Math.max(
            20,
            frecuenciaInicial
        ),
        ac.currentTime
    );


    if (
        frecuenciaFinal &&
        frecuenciaFinal > 0
    ) {

        oscilador.frequency.exponentialRampToValueAtTime(
            Math.max(
                20,
                frecuenciaFinal
            ),
            ac.currentTime +
            duracion
        );

    }


    ganancia.gain.setValueAtTime(
        0.0001,
        ac.currentTime
    );


    ganancia.gain.exponentialRampToValueAtTime(
        volumen,
        ac.currentTime + 0.015
    );


    ganancia.gain.exponentialRampToValueAtTime(
        0.0001,
        ac.currentTime + duracion
    );


    oscilador.connect(
        ganancia
    );

    ganancia.connect(
        ac.destination
    );


    oscilador.start();


    oscilador.stop(
        ac.currentTime +
        duracion +
        0.05
    );

}


/* =========================================================
   SONIDO SALTO
   ========================================================= */

function sonidoSaltoAutomatico() {

    crearTono(
        250,
        620,
        0.14,
        "square",
        0.045
    );

}


/* =========================================================
   SONIDO ESTRELLA
   ========================================================= */

function sonidoEstrellaAutomatico() {

    crearTono(
        620,
        900,
        0.10,
        "sine",
        0.065
    );


    setTimeout(
        () => {

            if (
                audioJuego.activado
            ) {

                crearTono(
                    900,
                    1250,
                    0.11,
                    "sine",
                    0.055
                );

            }

        },
        65
    );

}


/* =========================================================
   RUGIDO AUTOMÁTICO
   ========================================================= */

function sonidoDinosaurioAutomatico() {

    if (!audioJuego.activado) {

        return;

    }


    const ahora =
        performance.now();


    if (
        ahora - ultimoRugido <
        INTERVALO_RUGIDO
    ) {

        return;

    }


    ultimoRugido =
        ahora;


    const ac =
        obtenerAudioContext();


    if (!ac) {

        return;

    }


    const rugido =
        ac.createOscillator();

    const gananciaRugido =
        ac.createGain();


    rugido.type =
        "sawtooth";


    rugido.frequency.setValueAtTime(
        115,
        ac.currentTime
    );


    rugido.frequency.exponentialRampToValueAtTime(
        42,
        ac.currentTime + 0.48
    );


    gananciaRugido.gain.setValueAtTime(
        0.0001,
        ac.currentTime
    );


    gananciaRugido.gain.exponentialRampToValueAtTime(
        0.16,
        ac.currentTime + 0.035
    );


    gananciaRugido.gain.exponentialRampToValueAtTime(
        0.0001,
        ac.currentTime + 0.55
    );


    rugido.connect(
        gananciaRugido
    );

    gananciaRugido.connect(
        ac.destination
    );


    rugido.start();

    rugido.stop(
        ac.currentTime + 0.60
    );


    const rugidoGrave =
        ac.createOscillator();

    const gananciaGrave =
        ac.createGain();


    rugidoGrave.type =
        "triangle";


    rugidoGrave.frequency.setValueAtTime(
        72,
        ac.currentTime
    );


    rugidoGrave.frequency.exponentialRampToValueAtTime(
        31,
        ac.currentTime + 0.58
    );


    gananciaGrave.gain.setValueAtTime(
        0.0001,
        ac.currentTime
    );


    gananciaGrave.gain.exponentialRampToValueAtTime(
        0.11,
        ac.currentTime + 0.05
    );


    gananciaGrave.gain.exponentialRampToValueAtTime(
        0.0001,
        ac.currentTime + 0.62
    );


    rugidoGrave.connect(
        gananciaGrave
    );

    gananciaGrave.connect(
        ac.destination
    );


    rugidoGrave.start();

    rugidoGrave.stop(
        ac.currentTime + 0.67
    );


    setTimeout(
        () => {

            if (
                audioJuego.activado
            ) {

                crearTono(
                    58,
                    28,
                    0.32,
                    "sawtooth",
                    0.085
                );

            }

        },
        150
    );


    setTimeout(
        () => {

            if (
                audioJuego.activado
            ) {

                crearTono(
                    48,
                    25,
                    0.18,
                    "square",
                    0.06
                );

            }

        },
        390
    );

}


/* =========================================================
   VICTORIA
   ========================================================= */

function sonidoVictoriaAutomatico() {

    const notas = [

        523.25,
        659.25,
        783.99,
        1046.50

    ];


    notas.forEach(
        (nota, indice) => {

            setTimeout(
                () => {

                    if (
                        audioJuego.activado
                    ) {

                        crearTono(
                            nota,
                            nota,
                            0.20,
                            "sine",
                            0.075
                        );

                    }

                },
                indice * 135
            );

        }
    );

}


/* =========================================================
   GOLPE
   ========================================================= */

function sonidoGolpeAutomatico() {

    crearTono(
        160,
        55,
        0.20,
        "square",
        0.045
    );

}


/* =========================================================
   REPRODUCIR SONIDO
   ========================================================= */

function reproducirSonido(nombre) {

    if (!audioJuego.activado) {

        return;

    }


    const sonido =
        audioJuego.sonidos[nombre];


    if (sonido) {

        try {

            sonido.currentTime = 0;

            const reproduccion =
                sonido.play();


            if (
                reproduccion &&
                typeof reproduccion.catch ===
                "function"
            ) {

                reproduccion.catch(
                    () => {

                        reproducirSonidoAutomatico(
                            nombre
                        );

                    }
                );

            }


            return;

        } catch (error) {

            reproducirSonidoAutomatico(
                nombre
            );

            return;

        }

    }


    reproducirSonidoAutomatico(
        nombre
    );

}


/* =========================================================
   SONIDOS AUTOMÁTICOS
   ========================================================= */

function reproducirSonidoAutomatico(nombre) {

    switch (nombre) {

        case "jump":

            sonidoSaltoAutomatico();

            break;


        case "collect":

            sonidoEstrellaAutomatico();

            break;


        case "dinosaur":

            sonidoDinosaurioAutomatico();

            break;


        case "victory":

            sonidoVictoriaAutomatico();

            break;

    }

}


/* =========================================================
   MÚSICA AUTOMÁTICA
   ========================================================= */

const notasJungla = [

    196.00,
    220.00,
    261.63,
    293.66,
    329.63,
    293.66,
    261.63,
    220.00

];


function tocarMusicaGenerada() {

    if (
        !musicaGeneradaActiva ||
        !audioJuego.activado
    ) {

        return;

    }


    const nota =
        notasJungla[
            indiceMusicaGenerada %
            notasJungla.length
        ];


    crearTono(
        nota,
        nota,
        0.28,
        "triangle",
        0.018
    );


    if (
        indiceMusicaGenerada % 4 === 0
    ) {

        setTimeout(
            () => {

                if (
                    musicaGeneradaActiva &&
                    audioJuego.activado
                ) {

                    crearTono(
                        nota * 1.5,
                        nota * 1.5,
                        0.18,
                        "sine",
                        0.012
                    );

                }

            },
            90
        );

    }


    indiceMusicaGenerada++;


    musicaGeneradaTimer =
        setTimeout(
            tocarMusicaGenerada,
            420
        );

}


function iniciarMusicaGenerada() {

    if (!audioJuego.activado) {

        return;

    }


    if (musicaGeneradaActiva) {

        return;

    }


    obtenerAudioContext();


    musicaGeneradaActiva =
        true;


    indiceMusicaGenerada =
        0;


    tocarMusicaGenerada();

}


function detenerMusicaGenerada() {

    musicaGeneradaActiva =
        false;


    if (musicaGeneradaTimer) {

        clearTimeout(
            musicaGeneradaTimer
        );

        musicaGeneradaTimer =
            null;

    }

}


/* =========================================================
   MÚSICA REAL
   ========================================================= */

function iniciarMusica() {

    if (!audioJuego.activado) {

        return;

    }


    obtenerAudioContext();


    if (!audioJuego.musica) {

        iniciarMusicaGenerada();

        return;

    }


    audioJuego.musica.volume =
        0.28;


    try {

        const reproduccion =
            audioJuego.musica.play();


        if (
            reproduccion &&
            typeof reproduccion.then ===
            "function"
        ) {

            reproduccion
                .then(
                    () => {

                        audioJuego.musicaIniciada =
                            true;

                        audioArchivoDisponible.musica =
                            true;

                        detenerMusicaGenerada();

                        actualizarBotonAudio();

                    }
                )
                .catch(
                    () => {

                        audioJuego.musicaIniciada =
                            false;

                        iniciarMusicaGenerada();

                        actualizarBotonAudio();

                    }
                );

        }

    } catch (error) {

        audioJuego.musicaIniciada =
            false;

        iniciarMusicaGenerada();

    }

}


function detenerMusica() {

    if (audioJuego.musica) {

        try {

            audioJuego.musica.pause();

            audioJuego.musica.currentTime =
                0;

        } catch (error) {}

    }


    audioJuego.musicaIniciada =
        false;


    detenerMusicaGenerada();

}


/* =========================================================
   AUDIO ON/OFF
   ========================================================= */

function alternarAudio() {

    audioJuego.activado =
        !audioJuego.activado;


    if (audioJuego.activado) {

        obtenerAudioContext();

        iniciarMusica();

        mostrarMensaje(
            "🔊 SONIDO ACTIVADO"
        );

    } else {

        detenerMusica();

        mostrarMensaje(
            "🔇 SONIDO DESACTIVADO"
        );

    }


    actualizarBotonAudio();

}


/* =========================================================
   BOTÓN AUDIO
   ========================================================= */

let botonAudio = null;


function crearBotonAudio() {

    if (botonAudio) {

        return;

    }


    botonAudio =
        document.createElement(
            "button"
        );


    botonAudio.id =
        "botonAudioJuego";


    botonAudio.type =
        "button";


    botonAudio.setAttribute(
        "aria-label",
        "Activar o desactivar sonido"
    );


    botonAudio.addEventListener(
        "click",
        alternarAudio
    );


    juego.appendChild(
        botonAudio
    );


    const estiloAudio =
        document.createElement(
            "style"
        );


    estiloAudio.textContent = `

        #botonAudioJuego {

            position: fixed;

            top: 16px;

            right: 16px;

            width: 48px;

            height: 48px;

            border: 2px solid
                rgba(255,255,255,0.55);

            border-radius: 16px;

            background:
                linear-gradient(
                    145deg,
                    rgba(16,35,72,0.96),
                    rgba(7,19,43,0.98)
                );

            color: white;

            font-size: 21px;

            display: flex;

            align-items: center;

            justify-content: center;

            cursor: pointer;

            z-index: 10000;

            box-shadow:
                0 7px 18px
                rgba(0,0,0,0.35);

            touch-action: manipulation;

        }


        #botonAudioJuego:active {

            transform:
                scale(0.90);

        }


        @media(max-width:600px) {

            #botonAudioJuego {

                top: 72px;

                right: 12px;

                width: 46px;

                height: 46px;

            }

        }

    `;


    document.head.appendChild(
        estiloAudio
    );


    actualizarBotonAudio();

}


function actualizarBotonAudio() {

    if (!botonAudio) {

        return;

    }


    botonAudio.textContent =
        audioJuego.activado
            ? "🔊"
            : "🔇";


    botonAudio.title =
        audioJuego.activado
            ? "Desactivar sonido"
            : "Activar sonido";

}


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const GRAVEDAD = 0.65;

const VELOCIDAD_MAXIMA = 5;

const ACELERACION = 0.8;

const FRENADO = 0.75;

const FUERZA_SALTO = 13;

const VELOCIDAD_MAX_CAIDA = 16;


/* =========================================================
   ESTADO DEL JUEGO
   ========================================================= */

let juegoActivo = false;

let animacion = null;

let nivelActual = null;

let camaraX = 0;

let estrellas = [];

let dinosaurios = [];

let plataformas = [];


/* =========================================================
   SISTEMA DE NIVELES
   ========================================================= */

const nivelesDisponibles = [];

for (let i = 1; i <= 12; i++) {

    const nombre =
        `LEVEL_${String(i).padStart(2, "0")}`;

    nivelesDisponibles.push(
        nombre
    );

}


let indiceNivelActual = 0;


/* =========================================================
   TECLAS
   ========================================================= */

const teclas = {};


/* =========================================================
   ANIMACIÓN HÉROE
   ========================================================= */

let tiempoHeroe = 0;

let direccionHeroe = 1;

let estadoHeroe = "quieto";


/* =========================================================
   PROTECCIÓN
   ========================================================= */

let tiempoInvulnerable = 0;


/* =========================================================
   JUGADOR
   ========================================================= */

const jugador = {

    x: 120,

    y: 300,

    ancho: 58,

    alto: 78,

    velocidadX: 0,

    velocidadY: 0,

    enSuelo: false,

    vidas: 3,

    estrellas: 0

};


/* =========================================================
   META
   ========================================================= */

let nivelCompletado = false;

let tiempoMeta = 0;


/* =========================================================
   PANTALLA FINAL
   ========================================================= */

let aventuraTerminada = false;


/* =========================================================
   BOTÓN JUGAR
   ========================================================= */

if (btnJugar) {

    btnJugar.addEventListener(
        "click",
        iniciarJuego
    );

}


/* =========================================================
   TECLADO
   ========================================================= */

window.addEventListener(
    "keydown",
    evento => {

        const tecla =
            evento.key.toLowerCase();


        teclas[tecla] = true;


        if (
            tecla === "arrowup" ||
            tecla === "w" ||
            tecla === " "
        ) {

            evento.preventDefault();

            saltar();

        }

    }
);


window.addEventListener(
    "keyup",
    evento => {

        const tecla =
            evento.key.toLowerCase();

        teclas[tecla] = false;

    }
);


/* =========================================================
   INICIAR JUEGO
   ========================================================= */

function iniciarJuego() {

    if (!inicio || !juego) {

        return;

    }


    indiceNivelActual = 0;

    aventuraTerminada = false;


    prepararAudio();


    inicio.style.display =
        "none";


    juego.classList.remove(
        "oculto"
    );


    juego.style.display =
        "block";


    juego.style.visibility =
        "visible";


    juego.style.opacity =
        "1";


    ajustarCanvas();


    cargarNivelPorIndice();


    crearControlesMovil();


    crearBotonAudio();


    crearPanelFinal();


    juegoActivo = true;


    iniciarMusica();


    if (animacion) {

        cancelAnimationFrame(
            animacion
        );

    }


    bucleJuego();

}


/* =========================================================
   PREPARAR AUDIO
   ========================================================= */

function prepararAudio() {

    obtenerAudioContext();


    if (audioJuego.musica) {

        try {

            audioJuego.musica.load();

        } catch (error) {}

    }


    Object.values(
        audioJuego.sonidos
    ).forEach(
        sonido => {

            if (sonido) {

                try {

                    sonido.load();

                } catch (error) {}

            }

        }
    );

}


/* =========================================================
   OBTENER NIVEL ACTUAL
   ========================================================= */

function obtenerNivelActual() {

    const nombre =
        nivelesDisponibles[
            indiceNivelActual
        ];


    return window[nombre];

}


/* =========================================================
   CARGAR NIVEL
   ========================================================= */

function cargarNivelPorIndice() {

    const nivel =
        obtenerNivelActual();


    if (!nivel) {

        console.error(
            `NO SE ENCONTRÓ ${nivelesDisponibles[indiceNivelActual]}`
        );

        return false;

    }


    nivelActual =
        nivel;


    jugador.x =
        nivelActual.player?.x ??
        120;


    jugador.y =
        nivelActual.player?.y ??
        300;


    jugador.vidas =
        nivelActual.player?.lives ??
        3;


    jugador.velocidadX = 0;

    jugador.velocidadY = 0;

    jugador.estrellas = 0;

    jugador.enSuelo = false;


    camaraX = 0;

    nivelCompletado = false;

    tiempoMeta = 0;

    tiempoInvulnerable = 0;

    tiempoHeroe = 0;


    estrellas =
        nivelActual.collectibles
            ? nivelActual.collectibles.map(
                estrella => ({

                    ...estrella,

                    recogida: false

                })
            )
            : [];


    dinosaurios =
        nivelActual.dinosaurs
            ? nivelActual.dinosaurs.map(
                (dinosaurio, indice) => {

                    const dino = {
                        ...dinosaurio
                    };


                    const rango =
                        150 +
                        (indice % 3) * 30;


                    dino.zonaInicio =
                        Number.isFinite(
                            dino.minX
                        )
                            ? dino.minX
                            : dino.x - rango;


                    dino.zonaFin =
                        Number.isFinite(
                            dino.maxX
                        )
                            ? dino.maxX
                            : dino.x + rango;


                    if (
                        dino.zonaInicio < 0
                    ) {

                        dino.zonaInicio =
                            0;

                    }


                    if (
                        dino.zonaFin <=
                        dino.zonaInicio
                    ) {

                        dino.zonaFin =
                            dino.zonaInicio +
                            120;

                    }


                    dino.direction =
                        dino.direction === -1
                            ? -1
                            : 1;


                    dino.speed =
                        Math.max(
                            0.25,
                            Math.abs(
                                dino.speed ??
                                0.5
                            )
                        );


                    dino.animacion =
                        indice * 1.37;


                    dino.animacionY = 0;


                    dino.paso =
                        indice * 1.13;


                    return dino;

                }
            )
            : [];


    plataformas =
        nivelActual.platforms
            ? nivelActual.platforms.map(
                plataforma => ({
                    ...plataforma
                })
            )
            : [];


    if (nivelTexto) {

        nivelTexto.textContent =
            nivelActual.id ??
            indiceNivelActual + 1;

    }


    actualizarUI();


    mostrarNombreNivel();


    console.log(
        `🌴 CARGADO NIVEL ${indiceNivelActual + 1}`
    );


    return true;

}


/* =========================================================
   NOMBRE DEL NIVEL
   ========================================================= */

function mostrarNombreNivel() {

    const elemento =
        document.getElementById(
            "nombreNivel"
        );


    if (!elemento) {

        return;

    }


    const numero =
        indiceNivelActual + 1;


    const nombres = {

        1: "Selva de los Dinosaurios",

        2: "Sendero Perdido",

        3: "Valle Jurásico",

        4: "Bosque Prehistórico",

        5: "Cañón de los Gigantes",

        6: "Río Jurásico",

        7: "Montañas Perdidas",

        8: "Volcán de la Selva",

        9: "Templo de los Dinosaurios",

        10: "La Isla Perdida",

        11: "Reino de los Gigantes",

        12: "El Gran Mundo Perdido"

    };


    elemento.textContent =
        nombres[numero] ||
        `Aventura ${numero}`;

}


/* =========================================================
   BUCLE
   ========================================================= */

function bucleJuego() {

    if (!juegoActivo) {

        return;

    }


    actualizar();

    dibujar();


    animacion =
        requestAnimationFrame(
            bucleJuego
        );

}


/* =========================================================
   ACTUALIZAR
   ========================================================= */

function actualizar() {

    tiempoHeroe += 0.15;


    if (
        tiempoInvulnerable > 0
    ) {

        tiempoInvulnerable--;

    }


    if (nivelCompletado) {

        tiempoMeta += 0.08;

        return;

    }


    moverJugador();

    aplicarGravedad();

    aplicarPlataformas();

    moverDinosaurios();

    comprobarRugidoDinosaurio();

    recogerEstrellas();

    actualizarCamara();

    comprobarMeta();

    actualizarUI();

}


/* =========================================================
   MOVIMIENTO
   ========================================================= */

function moverJugador() {

    let movimiento = 0;


    if (
        teclas["arrowleft"] ||
        teclas["a"]
    ) {

        movimiento = -1;

        direccionHeroe = -1;

        estadoHeroe = "corriendo";

    }


    if (
        teclas["arrowright"] ||
        teclas["d"]
    ) {

        movimiento = 1;

        direccionHeroe = 1;

        estadoHeroe = "corriendo";

    }


    if (movimiento === 0) {

        estadoHeroe = "quieto";

    }


    if (movimiento !== 0) {

        jugador.velocidadX +=
            movimiento *
            ACELERACION;

    } else {

        if (
            jugador.velocidadX > 0
        ) {

            jugador.velocidadX -=
                FRENADO;


            if (
                jugador.velocidadX < 0
            ) {

                jugador.velocidadX = 0;

            }

        }


        if (
            jugador.velocidadX < 0
        ) {

            jugador.velocidadX +=
                FRENADO;


            if (
                jugador.velocidadX > 0
            ) {

                jugador.velocidadX = 0;

            }

        }

    }


    jugador.velocidadX =
        Math.max(
            -VELOCIDAD_MAXIMA,
            Math.min(
                VELOCIDAD_MAXIMA,
                jugador.velocidadX
            )
        );


    jugador.x +=
        jugador.velocidadX;


    if (
        jugador.x < 0
    ) {

        jugador.x = 0;

    }

}


/* =========================================================
   SALTO
   ========================================================= */

function saltar() {

    if (
        jugador.enSuelo &&
        !nivelCompletado &&
        juegoActivo
    ) {

        jugador.velocidadY =
            -FUERZA_SALTO;


        jugador.enSuelo =
            false;


        reproducirSonido(
            "jump"
        );

    }

}


/* =========================================================
   GRAVEDAD
   ========================================================= */

function aplicarGravedad() {

    jugador.velocidadY +=
        GRAVEDAD;


    if (
        jugador.velocidadY >
        VELOCIDAD_MAX_CAIDA
    ) {

        jugador.velocidadY =
            VELOCIDAD_MAX_CAIDA;

    }


    jugador.y +=
        jugador.velocidadY;

}


/* =========================================================
   PLATAFORMAS
   ========================================================= */

function aplicarPlataformas() {

    jugador.enSuelo = false;


    for (
        const plataforma of plataformas
    ) {

        const estabaArriba =

            jugador.y +
            jugador.alto -
            jugador.velocidadY
            <= plataforma.y;


        const caeSobre =

            jugador.y +
            jugador.alto
            >= plataforma.y;


        const dentroHorizontal =

            jugador.x +
            jugador.ancho >
            plataforma.x &&

            jugador.x <
            plataforma.x +
            plataforma.width;


        if (
            estabaArriba &&
            caeSobre &&
            dentroHorizontal &&
            jugador.velocidadY >= 0
        ) {

            jugador.y =
                plataforma.y -
                jugador.alto;


            jugador.velocidadY = 0;

            jugador.enSuelo = true;

        }

    }


    if (
        jugador.y >
        canvas.clientHeight + 200
    ) {

        perderVida();

    }

}


/* =========================================================
   TAMAÑO DINOSAURIOS
   ========================================================= */

function obtenerTamanoDinosaurio(tipo) {

    if (tipo === "trex") {

        return {

            ancho: 70,

            alto: 67,

            hitboxAncho: 58,

            hitboxAlto: 57

        };

    }


    return {

        ancho: 66,

        alto: 63,

        hitboxAncho: 55,

        hitboxAlto: 53

    };

}


/* =========================================================
   DINOSAURIOS
   ========================================================= */

function moverDinosaurios() {

    for (
        const dinosaurio of dinosaurios
    ) {

        const velocidadBase =
            dinosaurio.speed ||
            0.5;


        const variacion =
            Math.sin(
                dinosaurio.animacion *
                0.5
            ) *
            0.04;


        const velocidad =
            Math.max(
                0.20,
                velocidadBase +
                variacion
            );


        dinosaurio.x +=
            velocidad *
            dinosaurio.direction;


        if (
            dinosaurio.x >=
            dinosaurio.zonaFin
        ) {

            dinosaurio.x =
                dinosaurio.zonaFin;

            dinosaurio.direction =
                -1;

        }


        if (
            dinosaurio.x <=
            dinosaurio.zonaInicio
        ) {

            dinosaurio.x =
                dinosaurio.zonaInicio;

            dinosaurio.direction =
                1;

        }


        dinosaurio.animacion +=
            0.09 +
            velocidadBase *
            0.025;


        dinosaurio.animacionY =
            Math.sin(
                dinosaurio.animacion
            ) *
            0.25;


        dinosaurio.paso +=
            0.12 +
            velocidadBase *
            0.025;


        const tamano =
            obtenerTamanoDinosaurio(
                dinosaurio.type
            );


        const desplazamientoBase =
            120 -
            tamano.alto;


        const dinoX =
            dinosaurio.x +
            (
                tamano.ancho -
                tamano.hitboxAncho
            ) / 2;


        const dinoY =
            dinosaurio.y +
            desplazamientoBase +
            (
                tamano.alto -
                tamano.hitboxAlto
            ) / 2;


        const colision =

            jugador.x <
                dinoX +
                tamano.hitboxAncho &&

            jugador.x +
                jugador.ancho >
                dinoX &&

            jugador.y <
                dinoY +
                tamano.hitboxAlto &&

            jugador.y +
                jugador.alto >
                dinoY;


        if (
            colision &&
            tiempoInvulnerable <= 0
        ) {

            reproducirSonido(
                "dinosaur"
            );


            perderVida();

            break;

        }

    }

}


/* =========================================================
   RUGIDO POR DISTANCIA
   ========================================================= */

function comprobarRugidoDinosaurio() {

    if (!juegoActivo) {

        return;

    }


    if (!audioJuego.activado) {

        return;

    }


    if (
        !dinosaurios ||
        dinosaurios.length === 0
    ) {

        return;

    }


    const ahora =
        Date.now();


    if (
        ahora -
        ultimoRugidoDinosaurio <
        INTERVALO_RUGIDO_AUTOMATICO
    ) {

        return;

    }


    for (
        const dinosaurio of dinosaurios
    ) {

        if (!dinosaurio) {

            continue;

        }


        const distanciaHorizontal =
            Math.abs(
                dinosaurio.x -
                jugador.x
            );


        const distanciaVertical =
            Math.abs(
                dinosaurio.y -
                jugador.y
            );


        if (
            distanciaHorizontal <=
                DISTANCIA_RUGIDO &&
            distanciaVertical <=
                180
        ) {

            reproducirSonido(
                "dinosaur"
            );


            ultimoRugidoDinosaurio =
                ahora;


            break;

        }

    }

}


/* =========================================================
   ESTRELLAS
   ========================================================= */

function recogerEstrellas() {

    for (
        const estrella of estrellas
    ) {

        if (
            estrella.recogida
        ) {

            continue;

        }


        const distanciaX =
            jugador.x +
            jugador.ancho / 2 -
            estrella.x;


        const distanciaY =
            jugador.y +
            jugador.alto / 2 -
            estrella.y;


        const distancia =
            Math.sqrt(
                distanciaX *
                distanciaX +
                distanciaY *
                distanciaY
            );


        if (
            distancia < 60
        ) {

            estrella.recogida =
                true;


            jugador.estrellas++;


            reproducirSonido(
                "collect"
            );


            mostrarMensaje(
                "⭐ ¡ESTRELLA!"
            );

        }

    }

}


/* =========================================================
   CÁMARA
   ========================================================= */

function actualizarCamara() {

    const centroJugador =
        jugador.x +
        jugador.ancho / 2;


    camaraX =
        centroJugador -
        canvas.clientWidth / 2;


    if (
        camaraX < 0
    ) {

        camaraX = 0;

    }


    const mundoAncho =
        obtenerAnchoMundo();


    if (
        camaraX >
        mundoAncho -
        canvas.clientWidth
    ) {

        camaraX =
            Math.max(
                0,
                mundoAncho -
                canvas.clientWidth
            );

    }

}


/* =========================================================
   ANCHO MUNDO
   ========================================================= */

function obtenerAnchoMundo() {

    let ancho = 2000;


    if (nivelActual?.goal) {

        ancho =
            Math.max(
                ancho,
                nivelActual.goal.x +
                nivelActual.goal.width +
                220
            );

    }


    for (
        const plataforma of plataformas
    ) {

        ancho =
            Math.max(
                ancho,
                plataforma.x +
                plataforma.width +
                100
            );

    }


    return ancho;

}


/* =========================================================
   META
   ========================================================= */

function comprobarMeta() {

    if (
        !nivelActual?.goal ||
        nivelCompletado
    ) {

        return;

    }


    const meta =
        nivelActual.goal;


    const metaX =
        meta.x;


    const metaY =
        meta.y;


    const metaAncho =
        meta.width ||
        100;


    const metaAlto =
        meta.height ||
        120;


    const colision =

        jugador.x +
        jugador.ancho >
        metaX &&

        jugador.x <
        metaX +
        metaAncho &&

        jugador.y +
        jugador.alto >
        metaY &&

        jugador.y <
        metaY +
        metaAlto;


    if (colision) {

        completarNivel();

    }

}


/* =========================================================
   COMPLETAR NIVEL
   ========================================================= */

function completarNivel() {

    if (nivelCompletado) {

        return;

    }


    nivelCompletado = true;


    jugador.velocidadX = 0;

    jugador.velocidadY = 0;


    detenerMusica();


    reproducirSonido(
        "victory"
    );


    mostrarMensaje(
        "🏆 ¡NIVEL COMPLETADO!"
    );


    mostrarPanelNivelCompletado();


    console.log(
        `🏆 NIVEL ${indiceNivelActual + 1} COMPLETADO`
    );

}


/* =========================================================
   PERDER VIDA
   ========================================================= */

function perderVida() {

    if (
        nivelCompletado ||
        tiempoInvulnerable > 0
    ) {

        return;

    }


    jugador.vidas--;

    tiempoInvulnerable = 75;


    jugador.x =
        nivelActual?.player?.x ??
        120;


    jugador.y =
        nivelActual?.player?.y ??
        300;


    jugador.velocidadX = 0;

    jugador.velocidadY = 0;


    sonidoGolpeAutomatico();


    if (
        jugador.vidas <= 0
    ) {

        repetirNivel();

        return;

    }


    mostrarMensaje(
        `❤️ Te quedan ${jugador.vidas} vidas`
    );


    actualizarUI();

}


/* =========================================================
   UI
   ========================================================= */

function actualizarUI() {

    if (estrellasTexto) {

        estrellasTexto.textContent =
            jugador.estrellas;

    }


    if (nivelTexto) {

        nivelTexto.textContent =
            indiceNivelActual + 1;

    }


    if (vidasTexto) {

        vidasTexto.innerHTML =
            "";


        for (
            let i = 0;
            i < jugador.vidas;
            i++
        ) {

            vidasTexto.innerHTML +=
                "❤️";

        }

    }

}


/* =========================================================
   MENSAJES
   ========================================================= */

function mostrarMensaje(texto) {

    console.log(texto);

}


/* =========================================================
   PANEL DE NIVEL COMPLETADO
   ========================================================= */

function crearPanelFinal() {

    if (
        document.getElementById(
            "panelNivelFinal"
        )
    ) {

        return;

    }


    const panel =
        document.createElement(
            "div"
        );


    panel.id =
        "panelNivelFinal";


    panel.innerHTML = `

        <div class="panel-final-caja">

            <div
                id="iconoFinal"
                class="panel-final-icono"
            >
                🏆
            </div>

            <h2 id="tituloFinal">
                ¡NIVEL COMPLETADO!
            </h2>

            <p id="textoFinal">
                Excelente aventura.
            </p>

            <div
                id="estrellasFinal"
                class="estrellas-final"
            >
                ⭐ 0 estrellas
            </div>

            <div class="botones-final">

                <button
                    id="btnSiguienteNivel"
                    type="button"
                >
                    ➜ SIGUIENTE NIVEL
                </button>

                <button
                    id="btnRepetirNivel"
                    type="button"
                >
                    ↻ REPETIR NIVEL
                </button>

                <button
                    id="btnVolverInicio"
                    type="button"
                >
                    ⌂ INICIO
                </button>

            </div>

        </div>

    `;


    juego.appendChild(
        panel
    );


    const estilo =
        document.createElement(
            "style"
        );


    estilo.textContent = `

        #panelNivelFinal {

            position: fixed;

            inset: 0;

            z-index: 20000;

            display: none;

            align-items: center;

            justify-content: center;

            padding: 20px;

            box-sizing: border-box;

            background:
                rgba(3,8,24,.72);

            backdrop-filter:
                blur(7px);

        }


        .panel-final-caja {

            width:
                min(430px, 94vw);

            padding:
                28px 22px;

            box-sizing:
                border-box;

            text-align:
                center;

            border-radius:
                30px;

            background:
                linear-gradient(
                    145deg,
                    rgba(20,45,88,.98),
                    rgba(6,18,43,.98)
                );

            border:
                2px solid
                rgba(95,220,255,.65);

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.55),
                inset 0 1px 0
                rgba(255,255,255,.15);

            animation:
                aparecerPanel
                .3s ease;

        }


        @keyframes aparecerPanel {

            from {

                opacity: 0;

                transform:
                    translateY(25px)
                    scale(.92);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

            }

        }


        .panel-final-icono {

            font-size:
                54px;

            margin-bottom:
                8px;

        }


        #tituloFinal {

            margin:
                0 0 10px;

            color:
                white;

            font:
                900 27px Arial;

        }


        #textoFinal {

            margin:
                0 0 14px;

            color:
                #bfefff;

            font:
                500 16px Arial;

        }


        .estrellas-final {

            color:
                #ffd83d;

            font:
                800 18px Arial;

            margin-bottom:
                20px;

        }


        .botones-final {

            display:
                flex;

            flex-direction:
                column;

            gap:
                10px;

        }


        .botones-final button {

            min-height:
                52px;

            border:
                0;

            border-radius:
                16px;

            color:
                white;

            font:
                900 15px Arial;

            cursor:
                pointer;

            touch-action:
                manipulation;

            box-shadow:
                0 7px 18px
                rgba(0,0,0,.25);

            transition:
                transform .12s ease;

        }


        .botones-final button:active {

            transform:
                scale(.96);

        }


        #btnSiguienteNivel {

            background:
                linear-gradient(
                    135deg,
                    #00b8ff,
                    #1764ff
                );

        }


        #btnRepetirNivel {

            background:
                linear-gradient(
                    135deg,
                    #f39b24,
                    #d96a13
                );

        }


        #btnVolverInicio {

            background:
                rgba(255,255,255,.10);

            border:
                1px solid
                rgba(255,255,255,.25);

        }


        @media(max-width:600px) {

            .panel-final-caja {

                padding:
                    24px 17px;

                border-radius:
                    24px;

            }


            #tituloFinal {

                font-size:
                    23px;

            }

        }

    `;


    document.head.appendChild(
        estilo
    );


    document
        .getElementById(
            "btnSiguienteNivel"
        )
        .addEventListener(
            "click",
            siguienteNivel
        );


    document
        .getElementById(
            "btnRepetirNivel"
        )
        .addEventListener(
            "click",
            repetirNivel
        );


    document
        .getElementById(
            "btnVolverInicio"
        )
        .addEventListener(
            "click",
            volverAlInicio
        );

}


/* =========================================================
   MOSTRAR PANEL NIVEL COMPLETADO
   ========================================================= */

function mostrarPanelNivelCompletado() {

    crearPanelFinal();


    const panel =
        document.getElementById(
            "panelNivelFinal"
        );


    const titulo =
        document.getElementById(
            "tituloFinal"
        );


    const texto =
        document.getElementById(
            "textoFinal"
        );


    const icono =
        document.getElementById(
            "iconoFinal"
        );


    const estrellasFinal =
        document.getElementById(
            "estrellasFinal"
        );


    const botonSiguiente =
        document.getElementById(
            "btnSiguienteNivel"
        );


    if (
        indiceNivelActual >=
        nivelesDisponibles.length - 1
    ) {

        icono.textContent =
            "👑";


        titulo.textContent =
            "¡AVENTURA COMPLETADA!";


        texto.textContent =
            "Has superado los 12 mundos."


        botonSiguiente.style.display =
            "none";

    } else {

        icono.textContent =
            "🏆";


        titulo.textContent =
            "¡NIVEL COMPLETADO!";


        texto.textContent =
            `Prepárate para el nivel ${
                indiceNivelActual + 2
            }.`;

        botonSiguiente.style.display =
            "block";

    }


    estrellasFinal.textContent =
        `⭐ ${jugador.estrellas} estrellas`;


    panel.style.display =
        "flex";

}


/* =========================================================
   OCULTAR PANEL
   ========================================================= */

function ocultarPanelFinal() {

    const panel =
        document.getElementById(
            "panelNivelFinal"
        );


    if (panel) {

        panel.style.display =
            "none";

    }

}


/* =========================================================
   SIGUIENTE NIVEL
   ========================================================= */

function siguienteNivel() {

    if (
        indiceNivelActual >=
        nivelesDisponibles.length - 1
    ) {

        volverAlInicio();

        return;

    }


    indiceNivelActual++;


    ocultarPanelFinal();


    detenerMusica();


    if (
        !cargarNivelPorIndice()
    ) {

        indiceNivelActual--;

        cargarNivelPorIndice();

        mostrarMensaje(
            "No se pudo cargar el siguiente nivel."
        );

        return;

    }


    iniciarMusica();


    juegoActivo = true;


    mostrarMensaje(
        `🌴 NIVEL ${indiceNivelActual + 1}`
    );

}


/* =========================================================
   REPETIR NIVEL
   ========================================================= */

function repetirNivel() {

    ocultarPanelFinal();


    detenerMusica();


    if (
        !cargarNivelPorIndice()
    ) {

        mostrarMensaje(
            "No se pudo reiniciar el nivel."
        );

        return;

    }


    juegoActivo = true;


    iniciarMusica();


    mostrarMensaje(
        `↻ REPITIENDO NIVEL ${indiceNivelActual + 1}`
    );

}


/* =========================================================
   VOLVER AL INICIO
   ========================================================= */

function volverAlInicio() {

    juegoActivo = false;


    if (animacion) {

        cancelAnimationFrame(
            animacion
        );

        animacion = null;

    }


    detenerMusica();


    ocultarPanelFinal();


    juego.style.display =
        "none";


    juego.classList.add(
        "oculto"
    );


    inicio.style.display =
        "";


    aventuraTerminada =
        false;


    indiceNivelActual =
        0;


    console.log(
        "🏠 REGRESANDO AL INICIO"
    );

}


/* =========================================================
   DIBUJAR TODO
   ========================================================= */

function dibujar() {

    limpiarCanvas();

    dibujarFondo();

    dibujarPlataformas();

    dibujarEstrellas();

    dibujarDinosaurios();

    dibujarMeta();

    dibujarJugador();


    if (nivelCompletado) {

        dibujarPantallaVictoria();

    }

}


/* =========================================================
   LIMPIAR
   ========================================================= */

function limpiarCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.clientWidth,
        canvas.clientHeight
    );

}

/* =========================================================
   FONDOS DE LOS MUNDOS — 12 NIVELES
   ========================================================= */

function obtenerTamanoFondo() {

    return {
        W: canvas.clientWidth || window.innerWidth,
        H: canvas.clientHeight || window.innerHeight
    };

}


/* =========================================================
   FONDO PRINCIPAL
   ========================================================= */

function dibujarFondo() {

    const mundo = obtenerNivelActual()?.world || "jungle";

    switch (mundo) {

        case "jungle":
            dibujarMundoSelva();
            break;

        case "volcano":
            dibujarMundoVolcan();
            break;

        case "ice":
            dibujarMundoHielo();
            break;

        case "island":
            dibujarMundoIsla();
            break;

        case "desert":
            dibujarMundoDesierto();
            break;

        case "darkForest":
            dibujarMundoBosqueOscuro();
            break;

        case "giants":
            dibujarMundoGigantes();
            break;

        case "coast":
            dibujarMundoCosta();
            break;

        case "crater":
            dibujarMundoCrater();
            break;

        case "lostWorld":
            dibujarMundoPerdido();
            break;

        case "timePortal":
            dibujarMundoPortalTiempo();
            break;

        case "dinosaurKingdom":
            dibujarMundoReinoDinosaurios();
            break;

        default:
            dibujarMundoSelva();
            break;
    }
}


/* =========================================================
   MUNDO 01 — SELVA DE LOS DINOSAURIOS
   ========================================================= */

function dibujarMundoSelva() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#48bde8");
    cielo.addColorStop(0.45, "#9be6f4");
    cielo.addColorStop(1, "#63b64d");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Montañas */

    ctx.fillStyle = "#3b8148";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.53);

    ctx.lineTo(W * 0.18, H * 0.28);
    ctx.lineTo(W * 0.34, H * 0.53);

    ctx.lineTo(W * 0.52, H * 0.23);
    ctx.lineTo(W * 0.70, H * 0.53);

    ctx.lineTo(W * 0.86, H * 0.30);
    ctx.lineTo(W, H * 0.52);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Montañas lejanas */

    ctx.fillStyle = "#74aa5a";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.60);
    ctx.lineTo(W * 0.25, H * 0.42);
    ctx.lineTo(W * 0.43, H * 0.60);
    ctx.lineTo(W * 0.67, H * 0.39);
    ctx.lineTo(W, H * 0.60);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Árboles */

    dibujarArbolSelva(W * 0.08, H * 0.70, 1.1);
    dibujarArbolSelva(W * 0.90, H * 0.68, 1.25);
    dibujarArbolSelva(W * 0.54, H * 0.72, 0.75);

    /* Suelo */

    ctx.fillStyle = "#315f32";

    ctx.fillRect(
        0,
        H * 0.78,
        W,
        H * 0.22
    );
}


/* =========================================================
   ÁRBOL SELVA
   ========================================================= */

function dibujarArbolSelva(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#60422b";

    ctx.fillRect(
        -14,
        -145,
        28,
        145
    );

    ctx.fillStyle = "#1e6934";

    ctx.beginPath();

    ctx.arc(-40, -145, 48, 0, Math.PI * 2);
    ctx.arc(38, -145, 52, 0, Math.PI * 2);
    ctx.arc(0, -190, 62, 0, Math.PI * 2);

    ctx.fill();

    ctx.fillStyle = "#2e8a40";

    ctx.beginPath();

    ctx.arc(0, -200, 42, 0, Math.PI * 2);

    ctx.fill();

    ctx.restore();
}


/* =========================================================
   MUNDO 02 — VOLCÁN JURÁSICO
   ========================================================= */

function dibujarMundoVolcan() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#211326");
    cielo.addColorStop(0.35, "#692532");
    cielo.addColorStop(0.72, "#bd452d");
    cielo.addColorStop(1, "#241314");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Resplandor */

    const luz = ctx.createRadialGradient(
        W * 0.52,
        H * 0.50,
        20,
        W * 0.52,
        H * 0.50,
        W * 0.65
    );

    luz.addColorStop(
        0,
        "rgba(255,170,45,0.35)"
    );

    luz.addColorStop(
        1,
        "rgba(255,70,20,0)"
    );

    ctx.fillStyle = luz;
    ctx.fillRect(0, 0, W, H);

    /* Montañas volcánicas */

    ctx.fillStyle = "#25181a";

    ctx.beginPath();

    ctx.moveTo(-100, H * 0.70);

    ctx.lineTo(W * 0.20, H * 0.32);
    ctx.lineTo(W * 0.38, H * 0.52);

    ctx.lineTo(W * 0.51, H * 0.24);
    ctx.lineTo(W * 0.66, H * 0.52);

    ctx.lineTo(W * 0.82, H * 0.34);
    ctx.lineTo(W + 100, H * 0.70);

    ctx.lineTo(W + 100, H);
    ctx.lineTo(-100, H);

    ctx.closePath();
    ctx.fill();

    /* Lava */

    ctx.strokeStyle = "#ff6420";
    ctx.lineWidth = 8;

    ctx.beginPath();

    ctx.moveTo(W * 0.51, H * 0.25);

    ctx.quadraticCurveTo(
        W * 0.48,
        H * 0.42,
        W * 0.41,
        H * 0.72
    );

    ctx.stroke();

    ctx.strokeStyle = "#ffc238";
    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(W * 0.51, H * 0.28);

    ctx.quadraticCurveTo(
        W * 0.49,
        H * 0.43,
        W * 0.44,
        H * 0.68
    );

    ctx.stroke();

    /* Humo */

    dibujarHumoVolcan(W * 0.51, H * 0.18, 1);
    dibujarHumoVolcan(W * 0.55, H * 0.12, 0.65);

    /* Rocas */

    dibujarRocaVolcan(W * 0.08, H * 0.70, 1.2);
    dibujarRocaVolcan(W * 0.91, H * 0.67, 1.4);

    /* Suelo */

    const suelo = ctx.createLinearGradient(
        0,
        H * 0.70,
        0,
        H
    );

    suelo.addColorStop(0, "#351918");
    suelo.addColorStop(1, "#100a0b");

    ctx.fillStyle = suelo;

    ctx.fillRect(
        0,
        H * 0.70,
        W,
        H * 0.30
    );

    /* Grietas */

    ctx.strokeStyle = "#e85420";
    ctx.lineWidth = 3;

    for (let i = 0; i < 8; i++) {

        const x = (W / 8) * i + 20;
        const y = H * 0.80 + (i % 2) * 25;

        ctx.beginPath();

        ctx.moveTo(x, y);
        ctx.lineTo(x + 22, y - 10);
        ctx.lineTo(x + 42, y + 8);

        ctx.stroke();
    }
}


/* =========================================================
   HUMO VOLCÁN
   ========================================================= */

function dibujarHumoVolcan(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "rgba(30,25,30,0.65)";

    ctx.beginPath();

    ctx.arc(0, 0, 35, 0, Math.PI * 2);
    ctx.arc(35, -25, 42, 0, Math.PI * 2);
    ctx.arc(-30, -40, 38, 0, Math.PI * 2);
    ctx.arc(10, -70, 45, 0, Math.PI * 2);

    ctx.fill();

    ctx.restore();
}


/* =========================================================
   ROCA VOLCÁNICA
   ========================================================= */

function dibujarRocaVolcan(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#171316";

    ctx.beginPath();

    ctx.moveTo(-60, 20);
    ctx.lineTo(-35, -25);
    ctx.lineTo(10, -42);
    ctx.lineTo(55, -12);
    ctx.lineTo(65, 25);
    ctx.lineTo(30, 40);
    ctx.lineTo(-35, 38);

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#3a2928";

    ctx.beginPath();

    ctx.moveTo(-35, -18);
    ctx.lineTo(8, -35);
    ctx.lineTo(35, -10);
    ctx.lineTo(5, 0);

    ctx.closePath();
    ctx.fill();

    ctx.restore();
}


/* =========================================================
   MUNDO 03 — REINO DE HIELO
   ========================================================= */

function dibujarMundoHielo() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#75c9f0");
    cielo.addColorStop(0.45, "#d9f5ff");
    cielo.addColorStop(1, "#8bcde1");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Sol frío */

    ctx.fillStyle = "rgba(255,255,255,0.65)";

    ctx.beginPath();

    ctx.arc(
        W * 0.82,
        H * 0.20,
        55,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Montañas nevadas */

    ctx.fillStyle = "#9bcbdc";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.62);

    ctx.lineTo(W * 0.20, H * 0.25);
    ctx.lineTo(W * 0.36, H * 0.62);

    ctx.lineTo(W * 0.55, H * 0.20);
    ctx.lineTo(W * 0.73, H * 0.62);

    ctx.lineTo(W * 0.88, H * 0.30);
    ctx.lineTo(W, H * 0.62);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Nieve */

    ctx.fillStyle = "#f8fdff";

    ctx.beginPath();

    ctx.moveTo(W * 0.20, H * 0.25);
    ctx.lineTo(W * 0.12, H * 0.42);
    ctx.lineTo(W * 0.20, H * 0.37);
    ctx.lineTo(W * 0.27, H * 0.43);
    ctx.lineTo(W * 0.36, H * 0.62);
    ctx.lineTo(W * 0.20, H * 0.25);

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(W * 0.55, H * 0.20);
    ctx.lineTo(W * 0.45, H * 0.40);
    ctx.lineTo(W * 0.55, H * 0.34);
    ctx.lineTo(W * 0.65, H * 0.42);
    ctx.lineTo(W * 0.73, H * 0.62);
    ctx.closePath();

    ctx.fill();

    /* Lago helado */

    ctx.fillStyle = "#8ed7ea";

    ctx.fillRect(
        0,
        H * 0.72,
        W,
        H * 0.28
    );

    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 3;

    for (let i = 0; i < 8; i++) {

        const x = i * W / 7;

        ctx.beginPath();

        ctx.moveTo(x, H * 0.80);
        ctx.lineTo(x + 50, H * 0.76);
        ctx.lineTo(x + 90, H * 0.80);

        ctx.stroke();
    }
}


/* =========================================================
   MUNDO 04 — ISLA PERDIDA
   ========================================================= */

function dibujarMundoIsla() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#39bde8");
    cielo.addColorStop(0.55, "#a5e8f3");
    cielo.addColorStop(1, "#f5d88c");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Sol */

    ctx.fillStyle = "#ffe9a3";

    ctx.beginPath();

    ctx.arc(
        W * 0.78,
        H * 0.20,
        55,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Mar */

    ctx.fillStyle = "#159fc4";

    ctx.fillRect(
        0,
        H * 0.60,
        W,
        H * 0.40
    );

    /* Isla */

    ctx.fillStyle = "#76512f";

    ctx.beginPath();

    ctx.moveTo(W * 0.12, H * 0.72);
    ctx.quadraticCurveTo(
        W * 0.25,
        H * 0.55,
        W * 0.45,
        H * 0.63
    );

    ctx.quadraticCurveTo(
        W * 0.65,
        H * 0.50,
        W * 0.90,
        H * 0.72
    );

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Vegetación */

    dibujarPalmera(W * 0.18, H * 0.69, 1);
    dibujarPalmera(W * 0.82, H * 0.68, 1.2);
    dibujarPalmera(W * 0.62, H * 0.66, 0.75);

    /* Olas */

    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 3;

    for (let i = 0; i < 7; i++) {

        const y = H * 0.65 + i * 35;

        ctx.beginPath();

        ctx.moveTo(0, y);

        for (let x = 0; x < W; x += 80) {

            ctx.quadraticCurveTo(
                x + 20,
                y - 8,
                x + 40,
                y
            );

            ctx.quadraticCurveTo(
                x + 60,
                y + 8,
                x + 80,
                y
            );
        }

        ctx.stroke();
    }
}


/* =========================================================
   PALMERA
   ========================================================= */

function dibujarPalmera(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.strokeStyle = "#70472b";
    ctx.lineWidth = 14;

    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-10, -70, 8, -145);

    ctx.stroke();

    ctx.fillStyle = "#20723b";

    for (let i = 0; i < 7; i++) {

        const angulo =
            (Math.PI * 2 / 7) * i;

        ctx.save();

        ctx.translate(8, -145);
        ctx.rotate(angulo);

        ctx.beginPath();

        ctx.ellipse(
            45,
            0,
            55,
            12,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
    }

    ctx.restore();
}


/* =========================================================
   MUNDO 05 — DESIERTO JURÁSICO
   ========================================================= */

function dibujarMundoDesierto() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#f58d4a");
    cielo.addColorStop(0.45, "#ffd27a");
    cielo.addColorStop(1, "#e8a95a");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Sol */

    ctx.fillStyle = "#fff0a6";

    ctx.beginPath();

    ctx.arc(
        W * 0.78,
        H * 0.22,
        60,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Dunas lejanas */

    ctx.fillStyle = "#d28b45";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.62);

    ctx.quadraticCurveTo(
        W * 0.20,
        H * 0.45,
        W * 0.42,
        H * 0.62
    );

    ctx.quadraticCurveTo(
        W * 0.67,
        H * 0.43,
        W,
        H * 0.62
    );

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Duna principal */

    ctx.fillStyle = "#e6a450";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.73);

    ctx.quadraticCurveTo(
        W * 0.25,
        H * 0.55,
        W * 0.50,
        H * 0.72
    );

    ctx.quadraticCurveTo(
        W * 0.78,
        H * 0.53,
        W,
        H * 0.73
    );

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Cactus */

    dibujarCactus(W * 0.15, H * 0.77, 1);
    dibujarCactus(W * 0.85, H * 0.76, 1.2);

    /* Ruinas */

    dibujarRuinaDesierto(W * 0.53, H * 0.68, 1);
}


/* =========================================================
   CACTUS
   ========================================================= */

function dibujarCactus(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#367447";

    ctx.fillRect(
        -12,
        -100,
        24,
        100
    );

    ctx.fillRect(
        -45,
        -72,
        32,
        18
    );

    ctx.fillRect(
        -45,
        -72,
        18,
        50
    );

    ctx.fillRect(
        12,
        -58,
        34,
        18
    );

    ctx.fillRect(
        28,
        -58,
        18,
        42
    );

    ctx.restore();
}


/* =========================================================
   RUINA DEL DESIERTO
   ========================================================= */

function dibujarRuinaDesierto(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#8c6338";

    ctx.fillRect(
        -70,
        -80,
        140,
        80
    );

    ctx.fillRect(
        -60,
        -120,
        20,
        40
    );

    ctx.fillRect(
        40,
        -120,
        20,
        40
    );

    ctx.fillStyle = "#5f4329";

    ctx.fillRect(
        -20,
        -55,
        40,
        55
    );

    ctx.restore();
}


/* =========================================================
   MUNDO 06 — BOSQUE OSCURO
   ========================================================= */

function dibujarMundoBosqueOscuro() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#080d1d");
    cielo.addColorStop(0.50, "#172c34");
    cielo.addColorStop(1, "#101a17");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Luna */

    ctx.fillStyle = "#dce8d0";

    ctx.beginPath();

    ctx.arc(
        W * 0.76,
        H * 0.20,
        45,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Neblina */

    const niebla = ctx.createLinearGradient(
        0,
        H * 0.35,
        0,
        H
    );

    niebla.addColorStop(
        0,
        "rgba(100,145,135,0)"
    );

    niebla.addColorStop(
        1,
        "rgba(120,155,145,0.18)"
    );

    ctx.fillStyle = niebla;

    ctx.fillRect(
        0,
        H * 0.35,
        W,
        H * 0.65
    );

    /* Árboles oscuros */

    for (let i = 0; i < 8; i++) {

        const x =
            (W / 7) * i -
            30;

        dibujarArbolOscuro(
            x,
            H * 0.83,
            0.85 + (i % 3) * 0.20
        );
    }

    /* Suelo */

    ctx.fillStyle = "#0c1712";

    ctx.fillRect(
        0,
        H * 0.78,
        W,
        H * 0.22
    );
}


/* =========================================================
   ÁRBOL OSCURO
   ========================================================= */

function dibujarArbolOscuro(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#111915";

    ctx.fillRect(
        -12,
        -180,
        24,
        180
    );

    ctx.beginPath();

    ctx.moveTo(0, -200);
    ctx.lineTo(-65, -100);
    ctx.lineTo(65, -100);

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(0, -155);
    ctx.lineTo(-75, -65);
    ctx.lineTo(75, -65);

    ctx.closePath();
    ctx.fill();

    ctx.restore();
}


/* =========================================================
   MUNDO 07 — VALLE DE LOS GIGANTES
   ========================================================= */

function dibujarMundoGigantes() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#65b7d0");
    cielo.addColorStop(0.50, "#c7e8df");
    cielo.addColorStop(1, "#6a9c58");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Montañas gigantes */

    ctx.fillStyle = "#587c70";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.67);

    ctx.lineTo(W * 0.18, H * 0.18);
    ctx.lineTo(W * 0.35, H * 0.67);

    ctx.lineTo(W * 0.53, H * 0.12);
    ctx.lineTo(W * 0.72, H * 0.67);

    ctx.lineTo(W * 0.88, H * 0.22);
    ctx.lineTo(W, H * 0.67);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Nieve */

    ctx.fillStyle = "#e5f1eb";

    ctx.beginPath();

    ctx.moveTo(W * 0.53, H * 0.12);
    ctx.lineTo(W * 0.44, H * 0.34);
    ctx.lineTo(W * 0.53, H * 0.29);
    ctx.lineTo(W * 0.61, H * 0.35);

    ctx.closePath();

    ctx.fill();

    /* Árboles gigantes */

    dibujarArbolGigante(W * 0.12, H * 0.82, 1.3);
    dibujarArbolGigante(W * 0.88, H * 0.82, 1.45);

    /* Valle */

    ctx.fillStyle = "#4e813f";

    ctx.fillRect(
        0,
        H * 0.76,
        W,
        H * 0.24
    );
}


/* =========================================================
   ÁRBOL GIGANTE
   ========================================================= */

function dibujarArbolGigante(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#503d29";

    ctx.fillRect(
        -22,
        -220,
        44,
        220
    );

    ctx.fillStyle = "#265d35";

    ctx.beginPath();

    ctx.arc(-65, -205, 70, 0, Math.PI * 2);
    ctx.arc(65, -205, 75, 0, Math.PI * 2);
    ctx.arc(0, -270, 90, 0, Math.PI * 2);

    ctx.fill();

    ctx.restore();
}


/* =========================================================
   MUNDO 08 — COSTA PREHISTÓRICA
   ========================================================= */

function dibujarMundoCosta() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#3ebce1");
    cielo.addColorStop(0.55, "#b8edf1");
    cielo.addColorStop(1, "#d9cf93");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Océano */

    ctx.fillStyle = "#137fa8";

    ctx.fillRect(
        0,
        H * 0.52,
        W,
        H * 0.48
    );

    /* Isla / acantilados */

    ctx.fillStyle = "#514b3d";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.62);
    ctx.lineTo(W * 0.17, H * 0.42);
    ctx.lineTo(W * 0.32, H * 0.55);
    ctx.lineTo(W * 0.52, H * 0.39);
    ctx.lineTo(W * 0.68, H * 0.56);
    ctx.lineTo(W * 0.86, H * 0.43);
    ctx.lineTo(W, H * 0.62);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Vegetación */

    dibujarPalmera(W * 0.10, H * 0.65, 0.85);
    dibujarPalmera(W * 0.91, H * 0.65, 1);

    /* Espuma */

    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 4;

    for (let i = 0; i < 6; i++) {

        const y = H * 0.63 + i * 42;

        ctx.beginPath();

        ctx.moveTo(0, y);

        for (let x = 0; x < W; x += 100) {

            ctx.quadraticCurveTo(
                x + 25,
                y - 10,
                x + 50,
                y
            );

            ctx.quadraticCurveTo(
                x + 75,
                y + 10,
                x + 100,
                y
            );
        }

        ctx.stroke();
    }
}


/* =========================================================
   MUNDO 09 — CRÁTER FINAL
   ========================================================= */

function dibujarMundoCrater() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#160d19");
    cielo.addColorStop(0.45, "#4b1820");
    cielo.addColorStop(1, "#160b0c");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Resplandor central */

    const brillo = ctx.createRadialGradient(
        W * 0.50,
        H * 0.60,
        10,
        W * 0.50,
        H * 0.60,
        W * 0.55
    );

    brillo.addColorStop(
        0,
        "rgba(255,80,20,0.45)"
    );

    brillo.addColorStop(
        1,
        "rgba(255,30,10,0)"
    );

    ctx.fillStyle = brillo;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );

    /* Montañas */

    ctx.fillStyle = "#241719";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.70);

    ctx.lineTo(W * 0.20, H * 0.32);
    ctx.lineTo(W * 0.37, H * 0.62);

    ctx.lineTo(W * 0.52, H * 0.24);
    ctx.lineTo(W * 0.70, H * 0.62);

    ctx.lineTo(W * 0.86, H * 0.34);
    ctx.lineTo(W, H * 0.70);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Cráter */

    ctx.fillStyle = "#100b0c";

    ctx.beginPath();

    ctx.ellipse(
        W * 0.50,
        H * 0.78,
        W * 0.38,
        H * 0.17,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Lava interior */

    ctx.strokeStyle = "#ff5b20";
    ctx.lineWidth = 14;

    ctx.beginPath();

    ctx.ellipse(
        W * 0.50,
        H * 0.80,
        W * 0.27,
        H * 0.09,
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    ctx.strokeStyle = "#ffc238";
    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.ellipse(
        W * 0.50,
        H * 0.80,
        W * 0.18,
        H * 0.055,
        0,
        0,
        Math.PI * 2
    );

    ctx.stroke();

    /* Humo */

    dibujarHumoVolcan(
        W * 0.50,
        H * 0.30,
        1.2
    );
}


/* =========================================================
   MUNDO 10 — MUNDO PERDIDO
   ========================================================= */

function dibujarMundoPerdido() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#397b80");
    cielo.addColorStop(0.45, "#89b98e");
    cielo.addColorStop(1, "#365d39");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Montañas antiguas */

    ctx.fillStyle = "#3f6655";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.63);

    ctx.lineTo(W * 0.18, H * 0.24);
    ctx.lineTo(W * 0.36, H * 0.63);

    ctx.lineTo(W * 0.55, H * 0.19);
    ctx.lineTo(W * 0.74, H * 0.63);

    ctx.lineTo(W * 0.90, H * 0.28);
    ctx.lineTo(W, H * 0.63);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Ruinas cubiertas */

    dibujarRuinaPerdida(
        W * 0.50,
        H * 0.75,
        1.2
    );

    /* Árboles */

    dibujarArbolSelva(
        W * 0.10,
        H * 0.82,
        1.4
    );

    dibujarArbolSelva(
        W * 0.91,
        H * 0.82,
        1.5
    );

    /* Vegetación */

    ctx.fillStyle = "#214d2d";

    ctx.fillRect(
        0,
        H * 0.78,
        W,
        H * 0.22
    );
}


/* =========================================================
   RUINAS DEL MUNDO PERDIDO
   ========================================================= */

function dibujarRuinaPerdida(x, y, escala = 1) {

    ctx.save();

    ctx.translate(x, y);
    ctx.scale(escala, escala);

    ctx.fillStyle = "#5e604d";

    /* Templo */

    ctx.fillRect(
        -100,
        -100,
        200,
        100
    );

    /* Columnas */

    for (let i = -3; i <= 3; i++) {

        ctx.fillRect(
            i * 28 - 8,
            -90,
            16,
            90
        );
    }

    /* Techo */

    ctx.beginPath();

    ctx.moveTo(-120, -100);
    ctx.lineTo(0, -145);
    ctx.lineTo(120, -100);

    ctx.closePath();

    ctx.fill();

    /* Vegetación sobre ruinas */

    ctx.strokeStyle = "#28623a";
    ctx.lineWidth = 9;

    ctx.beginPath();

    ctx.moveTo(-90, -100);
    ctx.lineTo(-120, -150);

    ctx.moveTo(80, -100);
    ctx.lineTo(110, -155);

    ctx.stroke();

    ctx.restore();
}


/* =========================================================
   MUNDO 11 — PORTAL DEL TIEMPO
   ========================================================= */

function dibujarMundoPortalTiempo() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, W, H);

    cielo.addColorStop(0, "#08051b");
    cielo.addColorStop(0.35, "#251052");
    cielo.addColorStop(0.70, "#153d70");
    cielo.addColorStop(1, "#050a18");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Estrellas */

    ctx.fillStyle = "#ffffff";

    for (let i = 0; i < 65; i++) {

        const x =
            (i * 97) % W;

        const y =
            (i * 53) % (H * 0.65);

        const radio =
            1 + (i % 3);

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radio,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }

    /* Nebulosa */

    const nebulosa = ctx.createRadialGradient(
        W * 0.50,
        H * 0.48,
        20,
        W * 0.50,
        H * 0.48,
        W * 0.48
    );

    nebulosa.addColorStop(
        0,
        "rgba(110,65,255,0.45)"
    );

    nebulosa.addColorStop(
        0.55,
        "rgba(30,150,255,0.18)"
    );

    nebulosa.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = nebulosa;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );

    /* Portal */

    const px = W * 0.50;
    const py = H * 0.52;

    for (let i = 0; i < 5; i++) {

        ctx.strokeStyle =
            `rgba(100,180,255,${0.35 - i * 0.05})`;

        ctx.lineWidth =
            12 - i;

        ctx.beginPath();

        ctx.ellipse(
            px,
            py,
            130 + i * 20,
            185 + i * 25,
            0,
            0,
            Math.PI * 2
        );

        ctx.stroke();
    }

    /* Centro del portal */

    const portal = ctx.createRadialGradient(
        px,
        py,
        10,
        px,
        py,
        150
    );

    portal.addColorStop(
        0,
        "rgba(255,255,255,0.75)"
    );

    portal.addColorStop(
        0.30,
        "rgba(105,210,255,0.55)"
    );

    portal.addColorStop(
        1,
        "rgba(50,60,255,0)"
    );

    ctx.fillStyle = portal;

    ctx.beginPath();

    ctx.ellipse(
        px,
        py,
        100,
        155,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Suelo */

    ctx.fillStyle = "#0b1729";

    ctx.fillRect(
        0,
        H * 0.78,
        W,
        H * 0.22
    );
}


/* =========================================================
   MUNDO 12 — REINO DE LOS DINOSAURIOS
   ========================================================= */

function dibujarMundoReinoDinosaurios() {

    const { W, H } = obtenerTamanoFondo();

    const cielo = ctx.createLinearGradient(0, 0, 0, H);

    cielo.addColorStop(0, "#45a9c4");
    cielo.addColorStop(0.42, "#b8e2c2");
    cielo.addColorStop(0.72, "#6eaa55");
    cielo.addColorStop(1, "#315e35");

    ctx.fillStyle = cielo;
    ctx.fillRect(0, 0, W, H);

    /* Sol */

    ctx.fillStyle = "rgba(255,245,180,0.85)";

    ctx.beginPath();

    ctx.arc(
        W * 0.78,
        H * 0.18,
        65,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Montañas majestuosas */

    ctx.fillStyle = "#4e7764";

    ctx.beginPath();

    ctx.moveTo(0, H * 0.65);

    ctx.lineTo(W * 0.15, H * 0.22);
    ctx.lineTo(W * 0.31, H * 0.65);

    ctx.lineTo(W * 0.50, H * 0.12);
    ctx.lineTo(W * 0.69, H * 0.65);

    ctx.lineTo(W * 0.87, H * 0.20);
    ctx.lineTo(W, H * 0.65);

    ctx.lineTo(W, H);
    ctx.lineTo(0, H);

    ctx.closePath();
    ctx.fill();

    /* Nieve de las cumbres */

    ctx.fillStyle = "#dce9df";

    ctx.beginPath();

    ctx.moveTo(W * 0.50, H * 0.12);
    ctx.lineTo(W * 0.42, H * 0.32);
    ctx.lineTo(W * 0.50, H * 0.27);
    ctx.lineTo(W * 0.59, H * 0.34);

    ctx.closePath();

    ctx.fill();

    /* Cascada */

    ctx.fillStyle = "#83d8df";

    ctx.beginPath();

    ctx.moveTo(W * 0.50, H * 0.28);
    ctx.lineTo(W * 0.55, H * 0.28);
    ctx.lineTo(W * 0.58, H * 0.70);
    ctx.lineTo(W * 0.47, H * 0.70);

    ctx.closePath();

    ctx.fill();

    /* Gran vegetación */

    dibujarArbolGigante(
        W * 0.08,
        H * 0.84,
        1.35
    );

    dibujarArbolGigante(
        W * 0.92,
        H * 0.84,
        1.45
    );

    dibujarArbolGigante(
        W * 0.72,
        H * 0.82,
        0.90
    );

    /* Valle */

    ctx.fillStyle = "#397342";

    ctx.fillRect(
        0,
        H * 0.76,
        W,
        H * 0.24
    );

    /* Camino central */

    ctx.fillStyle = "#6f8b50";

    ctx.beginPath();

    ctx.moveTo(W * 0.40, H);
    ctx.quadraticCurveTo(
        W * 0.48,
        H * 0.84,
        W * 0.53,
        H * 0.76
    );

    ctx.quadraticCurveTo(
        W * 0.58,
        H * 0.84,
        W * 0.66,
        H
    );

    ctx.closePath();

    ctx.fill();
}

/* =========================================================
   PLATAFORMAS
   ========================================================= */

function dibujarPlataformas() {

    for (
        const plataforma of plataformas
    ) {

        const x =
            plataforma.x -
            camaraX;


        const y =
            plataforma.y;


        if (
            x >
                canvas.clientWidth + 100 ||
            x +
                plataforma.width <
                -100
        ) {

            continue;

        }


        ctx.fillStyle =
            "#5d3b24";


        ctx.fillRect(
            x,
            y,
            plataforma.width,
            plataforma.height
        );


        ctx.fillStyle =
            "#3d8b3d";


        ctx.fillRect(
            x,
            y,
            plataforma.width,
            12
        );


        ctx.fillStyle =
            "#72b84a";


        ctx.fillRect(
            x,
            y,
            plataforma.width,
            5
        );

    }

}


/* =========================================================
   ESTRELLAS
   ========================================================= */

function dibujarEstrellas() {

    for (
        const estrella of estrellas
    ) {

        if (
            estrella.recogida
        ) {

            continue;

        }


        const x =
            estrella.x -
            camaraX;


        const y =
            estrella.y;


        if (
            x < -50 ||
            x >
                canvas.clientWidth + 50
        ) {

            continue;

        }


        ctx.save();


        ctx.translate(
            x,
            y
        );


        ctx.rotate(
            tiempoHeroe * 0.03
        );


        ctx.fillStyle =
            "#ffd83d";


        ctx.shadowColor =
            "rgba(255,220,60,0.8)";


        ctx.shadowBlur =
            15;


        dibujarEstrella(
            0,
            0,
            18,
            8
        );


        ctx.restore();

    }

}


/* =========================================================
   FORMA ESTRELLA
   ========================================================= */

function dibujarEstrella(
    x,
    y,
    radioExterior,
    radioInterior
) {

    ctx.beginPath();


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const radio =
            i % 2 === 0
                ? radioExterior
                : radioInterior;


        const angulo =
            -Math.PI / 2 +
            i * Math.PI / 5;


        const px =
            x +
            Math.cos(angulo) *
            radio;


        const py =
            y +
            Math.sin(angulo) *
            radio;


        if (i === 0) {

            ctx.moveTo(
                px,
                py
            );

        } else {

            ctx.lineTo(
                px,
                py
            );

        }

    }


    ctx.closePath();

    ctx.fill();

}


/* =========================================================
   DINOSAURIOS
   ========================================================= */

function dibujarDinosaurios() {

    for (
        const dinosaurio of dinosaurios
    ) {

        const tamano =
            obtenerTamanoDinosaurio(
                dinosaurio.type
            );


        const x =
            dinosaurio.x -
            camaraX;


        const desplazamientoBase =
            120 -
            tamano.alto;


        const y =
            dinosaurio.y +
            desplazamientoBase +
            (
                dinosaurio.animacionY ||
                0
            );


        if (
            x +
                tamano.ancho <
                -100 ||
            x >
                canvas.clientWidth +
                100
        ) {

            continue;

        }


        if (
            dinosaurio.type ===
            "trex"
        ) {

            dibujarTRex(
                x,
                y,
                dinosaurio.direction,
                dinosaurio
            );

        }


        if (
            dinosaurio.type ===
            "triceratops"
        ) {

            dibujarTriceratops(
                x,
                y,
                dinosaurio.direction,
                dinosaurio
            );

        }

    }

}


/* =========================================================
   T-REX
   ========================================================= */

function dibujarTRex(
    x,
    y,
    direccion,
    dinosaurio
) {

    const ancho = 70;

    const alto = 67;


    ctx.save();


    ctx.fillStyle =
        "rgba(0,0,0,0.20)";


    ctx.beginPath();


    ctx.ellipse(
        x + ancho / 2,
        y + alto - 1,
        ancho * 0.30,
        4,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.translate(
        x + ancho / 2,
        y + alto / 2
    );


    if (
        direccion === 1
    ) {

        ctx.scale(
            -1,
            1
        );

    }


    const paso =
        dinosaurio?.paso ||
        0;


    const movimientoCuerpo =
        Math.sin(
            paso
        ) *
        0.45;


    const movimientoCabeza =
        Math.sin(
            paso + 0.5
        ) *
        0.25;


    ctx.translate(
        0,
        movimientoCuerpo
    );


    if (trexCargado) {

        ctx.shadowColor =
            "rgba(0,0,0,0.25)";


        ctx.shadowBlur = 4;

        ctx.shadowOffsetY = 2;


        ctx.drawImage(
            imagenTrex,

            -ancho / 2,

            -alto / 2 +
                movimientoCabeza,

            ancho,

            alto
        );

    }


    ctx.restore();

}


/* =========================================================
   TRICERATOPS
   ========================================================= */

function dibujarTriceratops(
    x,
    y,
    direccion,
    dinosaurio
) {

    const ancho = 66;

    const alto = 63;


    ctx.save();


    ctx.fillStyle =
        "rgba(0,0,0,0.20)";


    ctx.beginPath();


    ctx.ellipse(
        x + ancho / 2,
        y + alto - 1,
        ancho * 0.30,
        4,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.translate(
        x + ancho / 2,
        y + alto / 2
    );


    if (
        direccion === 1
    ) {

        ctx.scale(
            -1,
            1
        );

    }


    const paso =
        dinosaurio?.paso ||
        0;


    const movimientoCuerpo =
        Math.sin(
            paso
        ) *
        0.40;


    const movimientoCabeza =
        Math.sin(
            paso + 0.6
        ) *
        0.25;


    ctx.translate(
        0,
        movimientoCuerpo
    );


    if (triceratopsCargado) {

        ctx.shadowColor =
            "rgba(0,0,0,0.25)";


        ctx.shadowBlur = 4;

        ctx.shadowOffsetY = 2;


        ctx.drawImage(
            imagenTriceratops,

            -ancho / 2,

            -alto / 2 +
                movimientoCabeza,

            ancho,

            alto
        );

    }


    ctx.restore();

}


/* =========================================================
   META
   ========================================================= */

function dibujarMeta() {

    if (
        !nivelActual?.goal
    ) {

        return;

    }


    const meta =
        nivelActual.goal;


    const x =
        meta.x -
        camaraX;


    const y =
        meta.y;


    const ancho =
        meta.width ||
        110;


    const alto =
        meta.height ||
        130;


    ctx.save();


    const pulso =
        Math.sin(
            tiempoHeroe * 2
        ) *
        5;


    ctx.shadowColor =
        "#ffdf3f";


    ctx.shadowBlur =
        25 +
        pulso;


    const gradiente =
        ctx.createLinearGradient(
            x,
            y,
            x + ancho,
            y + alto
        );


    gradiente.addColorStop(
        0,
        "#6c3cff"
    );


    gradiente.addColorStop(
        0.5,
        "#00d9ff"
    );


    gradiente.addColorStop(
        1,
        "#ff4fd8"
    );


    ctx.fillStyle =
        gradiente;


    ctx.beginPath();


    ctx.roundRect(
        x,
        y,
        ancho,
        alto,
        20
    );


    ctx.fill();


    ctx.shadowBlur = 0;


    ctx.fillStyle =
        "rgba(10,20,55,0.88)";


    ctx.beginPath();


    ctx.roundRect(
        x + 12,
        y + 12,
        ancho - 24,
        alto - 24,
        15
    );


    ctx.fill();


    ctx.strokeStyle =
        "#ffffff";


    ctx.lineWidth = 4;

    ctx.globalAlpha = 0.8;


    ctx.beginPath();


    ctx.ellipse(
        x + ancho / 2,
        y + alto / 2,
        ancho * 0.30,
        alto * 0.34,
        0,
        0,
        Math.PI * 2
    );


    ctx.stroke();


    ctx.strokeStyle =
        "#7ee7ff";


    ctx.lineWidth = 2;


    ctx.beginPath();


    ctx.ellipse(
        x + ancho / 2,
        y + alto / 2,
        ancho * 0.18,
        alto * 0.25,
        0,
        0,
        Math.PI * 2
    );


    ctx.stroke();


    ctx.globalAlpha = 1;


    ctx.shadowColor =
        "rgba(0,0,0,0.7)";


    ctx.shadowBlur = 6;


    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 17px Arial";


    ctx.textAlign =
        "center";


    ctx.fillText(
        "META",
        x + ancho / 2,
        y - 14
    );


    /* BANDERA */

    ctx.shadowBlur = 12;

    ctx.shadowColor =
        "rgba(255,50,50,0.5)";


    ctx.fillStyle =
        "#4a2a16";


    ctx.fillRect(
        x + ancho + 14,
        y - 42,
        9,
        alto + 42
    );


    ctx.fillStyle =
        "#a86b32";


    ctx.fillRect(
        x + ancho + 14,
        y - 42,
        3,
        alto + 42
    );


    const banderaX =
        x + ancho + 23;


    const banderaY =
        y - 40;


    const banderaAncho = 72;

    const banderaAlto = 48;


    const gradienteBandera =
        ctx.createLinearGradient(
            banderaX,
            banderaY,
            banderaX +
                banderaAncho,
            banderaY +
                banderaAlto
        );


    gradienteBandera.addColorStop(
        0,
        "#ff3030"
    );


    gradienteBandera.addColorStop(
        0.5,
        "#ff1744"
    );


    gradienteBandera.addColorStop(
        1,
        "#b8002a"
    );


    ctx.fillStyle =
        gradienteBandera;


    ctx.beginPath();


    ctx.moveTo(
        banderaX,
        banderaY
    );


    ctx.lineTo(
        banderaX +
        banderaAncho,
        banderaY + 13
    );


    ctx.lineTo(
        banderaX +
        banderaAncho -
        12,
        banderaY +
        banderaAlto / 2
    );


    ctx.lineTo(
        banderaX +
        banderaAncho,
        banderaY +
        banderaAlto -
        7
    );


    ctx.lineTo(
        banderaX,
        banderaY +
        banderaAlto
    );


    ctx.closePath();


    ctx.fill();


    ctx.shadowBlur = 0;


    ctx.fillStyle =
        "rgba(255,255,255,0.9)";


    ctx.beginPath();


    ctx.arc(
        banderaX + 25,
        banderaY + 24,
        6,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.restore();

}


/* =========================================================
   VICTORIA
   ========================================================= */

function dibujarPantallaVictoria() {

    const ancho =
        canvas.clientWidth ||
        window.innerWidth;


    const alto =
        canvas.clientHeight ||
        window.innerHeight;


    ctx.save();


    ctx.fillStyle =
        "rgba(5,12,30,0.42)";


    ctx.fillRect(
        0,
        0,
        ancho,
        alto
    );


    ctx.restore();

}


/* =========================================================
   JUGADOR
   ========================================================= */

function dibujarJugador() {

    const x =
        jugador.x -
        camaraX;


    const y =
        jugador.y;


    ctx.save();


    if (
        tiempoInvulnerable > 0 &&
        Math.floor(
            tiempoInvulnerable / 6
        ) % 2 === 0
    ) {

        ctx.globalAlpha =
            0.45;

    }


    ctx.fillStyle =
        "rgba(0,0,0,0.25)";


    ctx.beginPath();


    ctx.ellipse(
        x + jugador.ancho / 2,
        y + jugador.alto + 3,
        22,
        7,
        0,
        0,
        Math.PI * 2
    );


    ctx.fill();


    let movimientoY = 0;


    if (
        !jugador.enSuelo
    ) {

        movimientoY = -2;

    } else if (
        estadoHeroe ===
        "corriendo"
    ) {

        movimientoY =
            Math.sin(
                tiempoHeroe * 5
            ) *
            2;

    }


    ctx.translate(
        x +
        jugador.ancho / 2,

        y +
        jugador.alto / 2 +
        movimientoY
    );


    if (
        direccionHeroe === -1
    ) {

        ctx.scale(
            -1,
            1
        );

    }


    if (heroeCargado) {

        ctx.shadowColor =
            "rgba(0,0,0,0.35)";


        ctx.shadowBlur = 10;

        ctx.shadowOffsetY = 5;


        ctx.drawImage(
            imagenHeroe,

            -jugador.ancho / 2,

            -jugador.alto / 2,

            jugador.ancho,

            jugador.alto
        );

    } else {

        dibujarHeroeFallback();

    }


    ctx.restore();

}


/* =========================================================
   HÉROE FALLBACK
   ========================================================= */

function dibujarHeroeFallback() {

    ctx.fillStyle =
        "#c91d2e";


    ctx.beginPath();


    ctx.arc(
        0,
        -20,
        19,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillRect(
        -18,
        -3,
        36,
        42
    );


    ctx.fillStyle =
        "#1e4fa3";


    ctx.fillRect(
        -18,
        10,
        36,
        29
    );


    ctx.fillStyle =
        "#ffffff";


    ctx.beginPath();


    ctx.ellipse(
        -7,
        -22,
        6,
        9,
        -0.3,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.beginPath();


    ctx.ellipse(
        7,
        -22,
        6,
        9,
        0.3,
        0,
        Math.PI * 2
    );


    ctx.fill();

}


/* =========================================================
   CANVAS
   ========================================================= */

function ajustarCanvas() {

    if (!canvas) {

        return;

    }


    const dpr =
        Math.min(
            window.devicePixelRatio ||
            1,
            2
        );


    const ancho =
        window.innerWidth;


    const alto =
        window.innerHeight;


    canvas.style.width =
        ancho + "px";


    canvas.style.height =
        alto + "px";


    canvas.width =
        Math.floor(
            ancho * dpr
        );


    canvas.height =
        Math.floor(
            alto * dpr
        );


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}

/* =========================================================
   CONTROLES MÓVILES
   SISTEMA TÁCTIL PARA CELULAR
   ========================================================= */

function crearControlesMovil() {

    const controles =
        document.getElementById("controlesMoviles") ||
        document.getElementById("controlesMovil");

    if (!controles) {
        console.warn("⚠️ No se encontró el contenedor de controles móviles");
        return;
    }

    const izquierda =
        document.getElementById("btnIzquierda");

    const derecha =
        document.getElementById("btnDerecha");

    const salto =
        document.getElementById("btnSaltar") ||
        document.getElementById("btnSalto");

    if (!izquierda || !derecha || !salto) {
        console.warn("⚠️ No se encontraron todos los botones móviles");
        return;
    }

    /*
       Evita configurar los mismos botones dos veces
    */

    if (controles.dataset.configurado === "true") {
        return;
    }

    controles.dataset.configurado = "true";

    /*
       Evita que el navegador haga gestos sobre los botones
    */

    [
        controles,
        izquierda,
        derecha,
        salto
    ].forEach(elemento => {

        elemento.style.touchAction = "none";
        elemento.style.webkitUserSelect = "none";
        elemento.style.userSelect = "none";

    });


    /* =====================================================
       MOVIMIENTO IZQUIERDA / DERECHA
       ===================================================== */

    function configurarMovimiento(boton, tecla) {

        let presionando = false;

        const comenzar = evento => {

            evento.preventDefault();
            evento.stopPropagation();

            presionando = true;

            teclas[tecla] = true;

            boton.classList.add("presionado");

            /*
               Captura el dedo aunque salga un poco
               del botón mientras lo mantiene presionado.
            */

            if (boton.setPointerCapture && evento.pointerId !== undefined) {

                try {

                    boton.setPointerCapture(
                        evento.pointerId
                    );

                } catch (error) {}

            }

        };


        const terminar = evento => {

            evento.preventDefault();
            evento.stopPropagation();

            presionando = false;

            teclas[tecla] = false;

            boton.classList.remove("presionado");

            if (
                boton.releasePointerCapture &&
                evento.pointerId !== undefined
            ) {

                try {

                    boton.releasePointerCapture(
                        evento.pointerId
                    );

                } catch (error) {}

            }

        };


        boton.addEventListener(
            "pointerdown",
            comenzar,
            {
                passive: false
            }
        );


        boton.addEventListener(
            "pointerup",
            terminar,
            {
                passive: false
            }
        );


        boton.addEventListener(
            "pointercancel",
            terminar,
            {
                passive: false
            }
        );


        boton.addEventListener(
            "lostpointercapture",
            () => {

                if (presionando) {

                    teclas[tecla] = false;

                    boton.classList.remove(
                        "presionado"
                    );

                    presionando = false;

                }

            }
        );

    }


    configurarMovimiento(
        izquierda,
        "arrowleft"
    );


    configurarMovimiento(
        derecha,
        "arrowright"
    );


    /* =====================================================
       BOTÓN DE SALTO
       ===================================================== */

    let saltoPresionado = false;


    const ejecutarSalto = evento => {

        evento.preventDefault();
        evento.stopPropagation();

        if (saltoPresionado) {
            return;
        }

        saltoPresionado = true;

        salto.classList.add(
            "presionado"
        );

        /*
           Ejecutamos el mismo sistema de salto
           que utiliza el teclado.
        */

        saltar();


        setTimeout(() => {

            salto.classList.remove(
                "presionado"
            );

            saltoPresionado = false;

        }, 140);

    };


    salto.addEventListener(
        "pointerdown",
        ejecutarSalto,
        {
            passive: false
        }
    );


    /*
       También permitimos toque directo en celulares
       que tengan comportamiento táctil antiguo.
    */

    salto.addEventListener(
        "touchstart",
        evento => {

            evento.preventDefault();

        },
        {
            passive: false
        }
    );


    console.log(
        "📱 CONTROLES TÁCTILES ACTIVADOS"
    );

}


/* =========================================================
   ACTIVAR CONTROLES CUANDO EL DOCUMENTO ESTÉ LISTO
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        crearControlesMovil
    );

} else {

    crearControlesMovil();

}


/* =========================================================
   REDIMENSIONAR
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        ajustarCanvas();

    }
);


/* =========================================================
   ORIENTACIÓN
   ========================================================= */

window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(
            () => {

                ajustarCanvas();

            },
            150
        );

    }
);


/* =========================================================
   EVITAR SCROLL
   ========================================================= */

window.addEventListener(
    "touchmove",
    evento => {

        if (juegoActivo) {

            evento.preventDefault();

        }

    },
    {
        passive: false
    }
);


/* =========================================================
   CANVAS TÁCTIL
   ========================================================= */

if (canvas) {

    canvas.style.touchAction =
        "none";

    canvas.style.userSelect =
        "none";

    canvas.style.webkitUserSelect =
        "none";

}


/* =========================================================
   AUDIO PRIMER TOQUE
   ========================================================= */

document.addEventListener(
    "pointerdown",
    () => {

        if (
            audioJuego.activado
        ) {

            obtenerAudioContext();

        }

    },
    {
        once: true
    }
);


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

crearPanelFinal();


console.log(
    "🕷️ MOTOR AVENTURA ARÁCNIDA CARGADO"
);

console.log(
    "🦖 12 NIVELES CONECTADOS"
);

console.log(
    "🔊 SISTEMA DE AUDIO LISTO"
);

console.log(
    "🎵 MÚSICA LISTA"
);

console.log(
    "🦖 RUGIDO DE DINOSAURIOS LISTO"
);

console.log(
    "➡️ SISTEMA SIGUIENTE NIVEL LISTO"
);

console.log(
    "↻ SISTEMA REPETIR NIVEL LISTO"
);