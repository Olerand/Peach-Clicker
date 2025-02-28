import { audioAdd } from "./music.js";

export function  glitchAnimation(event){
    event.target.style.animation = "glitch 0.3s";
    audioAdd("lose-buy")
    setTimeout(()=>{
        event.target.style.animation = ""
    },300)
}
export function parseCompactNumber(str) {
    const multipliers = {
      Y: 1e24, // Йотта
      Z: 1e21, // Зетта
      E: 1e18, // Экса
      P: 1e15, // Пета
      T: 1e12, // Тера
      B: 1e9,  // Миллиард
      M: 1e6,  // Миллион
      K: 1e3,  // Тысяча
    };
    if(str.match(/[a-zA-Z]/)){
      return parseFloat(str) * multipliers[str[str.length-1]]
    }else{
        return parseFloat(str)
    }
}
export function formatBigNumber(num) {
    num = Number(num);
    if (num < 1e3) return parseFloat(num.toFixed(1));

    const suffixes = ["K", "M", "B", "T", "P", "E", "Z", "Y"];
    let i = -1;

    while (num >= 1000 && i < suffixes.length - 1) 
        {
        num /= 1000;
        i++;
        }

    return num.toFixed(1) + suffixes[i]; 
}
