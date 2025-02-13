import {header__money,header__passiveIncome,header__clickCost} from './main.js'
function parseCompactNumber(str) {
  const multipliers = {
    Y: 1e24, // Йотта
    Z: 1e21, // Зетта
    E: 1e18, // Экса
    P: 1e15, // Пета
    T: 1e12, // Тера
    B: 1e9,  // Альтернативный вариант для миллиарда
    M: 1e6,  // Миллион
    K: 1e3,  // Тысяча

  };
  if(str.match(/[a-zA-Z]/)){
    return parseFloat(str)*multipliers[str[str.length-1]]
  }else{
    return parseFloat(str)
  }
}
document.getElementById("peach").onclick = (event) =>{
   localStorage.money = Number(localStorage.money) + Number(localStorage.click_cost);
   event.target.style.animation = "peach-scale 0.1s"
   setTimeout(()=>{
    event.target.style.animation = ""
   },100)

}
document.querySelectorAll(".click-buy").forEach(button => {
  button.onclick = (event) => {
    const power = parseCompactNumber(event.target.parentElement.querySelector(".power").textContent)
    const price = parseCompactNumber(event.target.parentElement.querySelector(".price__wrapper").querySelector(".price-title").textContent)
    if(Number(localStorage.money) >= price){
        localStorage.money = Number(localStorage.money) - Number(price)
        localStorage.click_cost = Number(localStorage.click_cost) + Number(power)
    }else{
      event.target.style.animation = "glitch 0.3s";
      setTimeout(()=>{
        event.target.style.animation = ""
      },300)
    }

  };
});
document.querySelectorAll(".income-buy").forEach(button => {
  button.onclick = (event) => {
    const power = parseCompactNumber(event.target.parentElement.querySelector(".power").textContent)
    const price = parseCompactNumber(event.target.parentElement.querySelector(".price__wrapper").querySelector(".price-title").textContent)
    if(Number(localStorage.money)>= Number(price)){
      localStorage.money = Number(localStorage.money) - Number(price)
      localStorage.passive_income_per_second =  Number(localStorage.passive_income_per_second) + Number(power)
    }
  };
});
const formatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});







setInterval(() => {
    header__money.innerHTML = `<h1 class = "money__title"> ${formatter.format(localStorage.money)}</h1>
    <svg class= "money__svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__clickCost.innerHTML = `<h1 class = "money__title">Сила клика:${formatter.format(localStorage.click_cost)}</h1><svg class= "money__svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__passiveIncome.innerHTML = `<h1 class = "money__title">Пас.Доход:${formatter.format(localStorage.passive_income_per_second)}</h1><svg class= "money__svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;

}, 100);
setInterval(()=>{
  localStorage.money = Number(localStorage.money) + Number(localStorage.passive_income_per_second)

},1000)
let level = 0; 
document.getElementById("fillbar").onclick = () => {
            if (level < 100) {
                level += 5; 
                document.getElementById("fill").style.width = level + "%"; 
            }
        }
setInterval(() => {
  console.log(level)
    if (level > 0) {
        level = level - 5; 
        document.getElementById("fill").style.width = level + "%";
    }
    if(document.getElementById("fill").style.width == "100%"){
      alert(level)
     }
}, 500); 