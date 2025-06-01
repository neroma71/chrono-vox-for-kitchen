const synth = window.speechSynthesis;
let chrono = document.querySelector('#chrono');
let start = document.querySelector("#start");
let stop = document.querySelector("#stop");
let res = document.querySelector("#reset");
let clip = document.querySelector('#clip');
let uttHasBeenSpoken = new Array(); // Tableau pour suivre si les phrases ont été prononcées
let h = 0; 
let m = 0;
let s = 0;

// Tableau des phrases et moments où elles doivent être dites
const phrases = [
    { time: { min: 2, sec: 0 }, text: "les œeufs sont pochés" },
    { time: { min: 3, sec: 0 }, text: "Prépare les mouilettes, les oeufs coques sont prèts" },
    { time: { min: 6, sec: 0 }, text: "les œufs sont mollets" },
    { time: { min: 9, sec: 0 }, text: "Les oeufs durs sont prèts" }
];

function count() {
    s++;
    if (s === 60) {
        s = 0;
        m++;
    }
    if (m === 60) {
        m = 0;
        h++;
    }
    if (h === 24) {
        h = 0; 
    }
    phrases.forEach((phrase, index) => {
        if (m === phrase.time.min && s === phrase.time.sec && !uttHasBeenSpoken[index]) {
            let utt = new SpeechSynthesisUtterance(phrase.text);
            speechSynthesis.speak(utt);
            uttHasBeenSpoken[index] = true;
        }
    });

    chrono.textContent = `${h}h ${m}m ${s}s`;
    clip.style.backgroundColor = clip.style.backgroundColor == "lime" ? "pink" : "lime";
}

let interval;
start.addEventListener('click', () => {
    interval = setInterval(count, 1000);
    start.disabled = true;
});

stop.addEventListener('click', () => {
    clearInterval(interval);
    start.disabled = false;
});

res.addEventListener('click', () => {
    clearInterval(interval);
    s = 0;
    m = 0;
    h = 0;
    chrono.textContent = `${h}h ${m}m ${s}s`;
    start.disabled = false;
    uttHasBeenSpoken = new Array(phrases.length).fill(false); // Réinitialiser les indices
});