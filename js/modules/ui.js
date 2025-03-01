import { formatBigNumber,parseCompactNumber } from "./helper.js";
import { levelPeachBoost } from "./progressManager.js";
import { resetSettings } from "./variable.js";
//Categories open-lock
document.getElementById("first-categories").onclick = () => {
    document.getElementById("first-block").style.display = "flex"
    document.getElementById("second-block").style.display = "none"
    document.getElementById("third-block").style.display = "none"
};

document.getElementById("second-categories").onclick = () => {
    document.getElementById("first-block").style.display = "none"
    document.getElementById("second-block").style.display = "flex"
    document.getElementById("third-block").style.display = "none"
};

document.getElementById("third-categories").onclick = () => {
    document.getElementById("first-block").style.display = "none"
    document.getElementById("second-block").style.display = "none"
    document.getElementById("third-block").style.display = "flex"
};

// Number,who adding when you tapping peach
export function clickCostUp(x,y){
    const place = document.getElementById("div-peach")
    const div = document.createElement('h1');
    div.classList.add("fly-numbers")
    div.textContent = formatBigNumber(Number(localStorage.click_cost)*Number(localStorage.coef_click)*Number(localStorage.double_click)*levelPeachBoost*Number(localStorage.prestige_bonus))
    div.style.left = x+"px";
    div.style.top = y+"px"
    place.appendChild(div)
    setTimeout(() => {
    div.remove(); 
    }, 1000);
}  

// Modal-windows
const modal = document.getElementById("modal")
export function openModalChest(status,time){
if(status){
    modal.innerHTML = 
    `
        <div class="modal__inner">
            <svg onclick="event.target.closest('.modal').style.display = 'none';document.getElementById('overlay').style.display = 'none';" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"/></svg>
        </div>
        <h1 id="modal-title" class="modal__title">Сундук готов явить свои дары!</h1>
        <h2 id="modal-text" class="modal__title">Ваш доход:<span class="modal__span">${formatBigNumber((localStorage.passive_income_per_second*time)/4)}</span></h2>
    `
    localStorage.chestDateLock = new Date();
    localStorage.money = Number(localStorage.money) + ((localStorage.passive_income_per_second*time)/4)
    audioAdd("treasure")
    modal.style.display = "flex";
    document.getElementById("overlay").style.display = "block"
}else{
    modal.innerHTML = 
    `
        <div class="modal__inner">
            <svg onclick="event.target.closest('.modal').style.display = 'none';document.getElementById('overlay').style.display = 'none';" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"/></svg>
        </div>
        <h1 id="modal-title" class="modal__title">Сундук ещё не готов явить свои дары!</h1>
        <h2 id="modal-text" class="modal__title">Он откроется через <span class="modal__span">${time}</span>секунд</h2>
    `
    modal.style.display = "flex";
    document.getElementById("overlay").style.display = "block"
}
}
export function openModalPrestige(status,pricePrestige){
if(status){
    modal.innerHTML = `
        <div class="modal__inner">
            <svg onclick="event.target.closest('.modal').style.display = 'none';document.getElementById('overlay').style.display = 'none';" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"/></svg>
        </div>
        <h1 id="modal-title" class="modal__title">Вы можете потерять все свои достижения и начать жизнь с чистого листа.</h1>
        <h2 id="modal-text" class="modal__title">Получив при этом бонус:<span class="modal__span">X${Number(localStorage.prestige_bonus)+1}</span></h2>
        <button id = "prestige-reset" class="modal__button">Престиж</button>
    `
    document.getElementById("prestige-reset").addEventListener("click",resetSettings)
    modal.style.display = "flex"
    document.getElementById("overlay").style.display = "block"

}else{
    modal.innerHTML = `
        <div class="modal__inner">
            <svg onclick="event.target.closest('.modal').style.display = 'none';document.getElementById('overlay').style.display = 'none';" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m15.5 15.5l-10-10zm0-10l-10 10"/></svg>
        </div>
        <h1 id="modal-title" class="modal__title">У вас не хватает средств на новую жизнь и документы.</h1>
        <h2 id="modal-text" class="modal__title">Накопите ещё:<span class="modal__span">${formatBigNumber(Number(parseCompactNumber(pricePrestige))-Number(localStorage.money))}</span></h2>
    `
    modal.style.display = "flex"
    document.getElementById("overlay").style.display = "block"
}
}