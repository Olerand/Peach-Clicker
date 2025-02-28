import { parseCompactNumber,formatBigNumber,glitchAnimation } from "./helper.js";
import { audioAdd } from "./music.js";
import { openModalChest,openModalPrestige } from "./ui.js";
import { checkFarmer,checkChest,checkPresige } from "./progressManager.js";

document.querySelectorAll(".card__buy-click").forEach(button => {
    button.onclick = (event) => {
        const price = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-price").textContent)
        const power = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-power").textContent)
        if(Number(localStorage.money) >= price){
        localStorage.money = Number(localStorage.money) - Number(price)
        localStorage.click_cost = Number(localStorage.click_cost) + Number(power)
        audioAdd("purchase")
    }else{
        glitchAnimation(event)
    }
};
}
);
// Third categories
document.querySelectorAll(".card__buy-achiev").forEach(button => {
    button.onclick = (event) => {
        const name = event.target.closest('.card__buy-achiev')
        const achiev = name.id
        const price = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-price").textContent)
        const card = event.target.closest(".card")
        switch(achiev){
            case "Fill-Bar":{
                if(Number(localStorage.money)>=price && localStorage.getItem("fill_bar") === "false"){
                    localStorage.money = Number(localStorage.money) - price
                    localStorage.fill_bar = true;
                    progress__bar.style.display = "flex";
                    card.style.display = "none";
                    audioAdd("purchase")
                }else{
                    glitchAnimation(event)
                }
            break
                }
            case "Double Click":{
                if(Number(localStorage.money)>=price && localStorage.double_click == 1){
                    localStorage.money = Number(localStorage.money) - price
                    localStorage.double_click = 2;
                    card.style.display = "none";
                    audioAdd("purchase")
                }else{
                    glitchAnimation(event);
                }
            break
                }
            case "Farmer":{
                if(Number(localStorage.money)>=price && localStorage.getItem("farmer") === "false"){
                    localStorage.money = Number(localStorage.money) - price
                    localStorage.farmer = true;
                    card.style.display = "none";
                    audioAdd("purchase")
                    checkFarmer();
                }else{
                    glitchAnimation(event)
                }
            break
            }
            case "BBS":{
                if(Number(localStorage.money)>=price && localStorage.sizePeach < 8){
                    localStorage.money = Number(localStorage.money) - price
                    localStorage.sizePeach = Number(localStorage.sizePeach) + 1;
                    audioAdd("purchase")
                    checkPeachSize()
                    if(Number(localStorage.sizePeach) == 8){
                        card.style.display = "none";
                    }
                }else{
                    glitchAnimation(event)
                }
            break
            }
            case "Chest":{
                if(Number(localStorage.money)>=price && localStorage.getItem("chest") === "false"){
                    localStorage.money = Number(localStorage.money) - price
                    localStorage.chest = true;
                    localStorage.chestDateLock = new Date();
                    audioAdd("purchase")
                    checkChest()
                }else{
                    glitchAnimation(event)
                }
            break
            }
            case "Prestige":{
                if(Number(localStorage.money) >=price && localStorage.getItem("prestige") === "false"){
                    localStorage.money = Number(localStorage.money) - price
                    localStorage.prestige = true;
                    audioAdd("purchase")
                    checkPresige()
                }else{
                    glitchAnimation(event)
                }
            break;
            }
        }
}});
// Passive-income
document.querySelectorAll(".card__buy-income").forEach(button => {
    button.onclick = (event) => {
        let price = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-price").textContent)
        let power = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-power").textContent)
        if(Number(localStorage.money)>= Number(price)){
            audioAdd("purchase")
            localStorage.money = Number(localStorage.money) - Number(price)
            localStorage.passive_income_per_second =  Number(localStorage.passive_income_per_second) + Number(power)
        }else{
            glitchAnimation(event)
        }
        };
});
// PRESTIGE
document.getElementById("clicker-prestige").onclick = ()=>{
    let pricePrestige = "250P"
    if(localStorage.money >= parseCompactNumber(pricePrestige)){
        openModalPrestige(true,pricePrestige)
    }else{
        openModalPrestige(false,pricePrestige)
    }
}
  // chest
document.getElementById("clicker-chest").onclick = () =>{
    let lockDate = (Date.parse(localStorage.chestDateLock)/1000).toFixed(0)
    let nowDate = (Date.now()/1000).toFixed(0)
    let timeForOpenChest = 3600
    if(nowDate - lockDate >= timeForOpenChest){
        openModalChest(true,timeForOpenChest)
    }else{
        openModalChest(false,timeForOpenChest - (nowDate-lockDate))
    }
}