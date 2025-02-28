window.onload = function(){
    const mainMusic = new Audio("music/main.mp3")
    mainMusic.volume = soundLevel;
    mainMusic.play()
}

export let soundLevel = 0.2;

export async function audioAdd(nameMusic){

    let audio = new Audio("music/"+ nameMusic +".mp3")
    audio.volume = soundLevel;
    audio.play()
}

document.getElementById("range-music").addEventListener("input",(event)=>{
    soundLevel = event.target.value
})
document.getElementById("music").onclick=()=>{
    document.getElementById("modal-music").style.display = "flex";
    document.getElementById("overlay").style.display = "block"
}