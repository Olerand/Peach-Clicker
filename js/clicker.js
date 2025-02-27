import {audioAdd } from "./modules/music.js";
import {formatBigNumber} from "./modules/helper.js";
import { clickCostUp } from "./modules/ui.js";
import { levelPeachBoost,fillBar } from "./modules/progressManager.js";

// Click peach to make a lot of money
document.getElementById("div-peach").onclick = (event) =>{
  localStorage.money =  Number(localStorage.money) + (Number(localStorage.click_cost)*Number(localStorage.coef_click)*Number(localStorage.double_click)*Number(levelPeachBoost)*Number(localStorage.prestige_bonus));
  clickCostUp(event.clientX,event.clientY)
  audioAdd("peach")
  if(localStorage.getItem("fill_bar") === "true"){
    fillBar()}
    setTimeout(()=>{
    event.target.style.animation = ""
  },100)

}


// Intervals

const header = document.getElementById("header-inner")

setInterval(() => {
  let money = formatBigNumber(Number(localStorage.money))
  let bonus = Number(localStorage.coef_click)*Number(localStorage.double_click)*Number(levelPeachBoost)*Number(localStorage.prestige_bonus)
  let clickCost = formatBigNumber(Number(localStorage.click_cost)*Number(bonus))
  let income = formatBigNumber(Number(localStorage.passive_income_per_second))
  header.innerHTML= 
  `<div class="header__money" id="header__money">
    <h1 class = "header__money-title"> ${money}</h1>
      <svg class= "header__money-svg" 
      xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>
    </div>
    <div class="header__money" id="header__click-cost">
      <h1 class = "header__money-title">Сила клика:${clickCost}</h1>
      <svg class= "header__money-svg" 
      xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>
    </div>
    <div class="header__money" id="header__passive-income"> 
      <h1 class = "header__money-title">Пас.Доход:${income}</h1>
      <svg class= "header__money-svg" 
      xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>
    </div>
    <div class="header__money" id="header__bonus"> 
      <h1 class = "header__money-title">Бонус клика:X${bonus}</h1>
    </div>
  `
  
}, 100);
setInterval(()=>{
  localStorage.money = Number(localStorage.money) + (Number(localStorage.passive_income_per_second)*Number(localStorage.coef_click)*Number(localStorage.double_click)*Number(levelPeachBoost)*Number(localStorage.prestige_bonus))
},1000)