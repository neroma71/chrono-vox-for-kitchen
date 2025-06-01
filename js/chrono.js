const synth = window.speechSynthesis;
let utt = new SpeechSynthesisUtterance("Prépare les mouilettes, les oeufs coques sont prèts");
let utt2 = new SpeechSynthesisUtterance("Les oeufs durs sont prèts");
let chrono = document.querySelector('#chrono');
let start = document.querySelector("#start");
let stop = document.querySelector("#stop");
let res = document.querySelector("#reset");
let clip = document.querySelector('#clip');
let uttHasBeenSpoken = false; 
let utt2HasBeenSpoken = false;
let h = 0; 
let m = 0;
let s = 0;

function count(){
s++;
if(s === 60 ){
s = 0;
m++;
}
if(m === 3 && s === 0 && !uttHasBeenSpoken){
    speechSynthesis.speak(utt);
    uttHasBeenSpoken = true;  
  }
if(m === 3 && s === 40 && uttHasBeenSpoken){
    synth.cancel();
  }
if(m === 9 && s === 0 && !utt2HasBeenSpoken){
    speechSynthesis.speak(utt2);
    utt2HasBeenSpoken = true;  
  }
if(m === 9 && s === 40 && utt2HasBeenSpoken){
    synth.cancel();
  }
if(m === 60){
m = 0;
h++;
}
chrono.textContent = `${h}h ${m}m ${s}s`;
clip.style.backgroundColor = clip.style.backgroundColor == "lime" ? "pink" : "lime";
}
let interval;
start.addEventListener('click', ()=>{
interval = setInterval(count, 1000);
start.disabled = true;
});
stop.addEventListener('click', ()=>{
clearInterval(interval);
start.disabled = false;
});
res.addEventListener('click', ()=>{
clearInterval(interval);
s = 0;
m = 0;
h = 0;
chrono.textContent = `${h}h ${m}m ${s}s`;
start.disabled = false;
});