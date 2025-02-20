import {header__money,header__passiveIncome,header__clickCost, progress__bar} from './main.js'
window.onload = function () {
  console.log("Страница полностью загружена!");
  console.log(localStorage.fill_bar)
  if (localStorage.getItem("fill_bar") === "true") {
    progress__bar.style.display = "flex";
    document.getElementById("card__fill-bar").style.display = "none";
  } else {
    progress__bar.style.display = "none";
  }  
  localStorage.coef_click = 1
};
let level = 0; 
function parseCompactNumber(str) {
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
let boostOfClick = false
function coefBoost(){
  if(!boostOfClick){
    boostOfClick = true
  localStorage.coef_click = Number(localStorage.coef_click)*2
  setTimeout(()=>{
    if(level>=99){
      coefBoost()
    }else{
      boostOfClick = false
      localStorage.coef_click = Number(localStorage.coef_click)/2
    }
  },10000)
  }}
function fillBar(){
  const fill = document.getElementById("fill")
  if (level < 100) {
    level += 5; 
    fill.style.width = level + "%"; 
  }
}
  setInterval(() => {
    if (level > 0) {
      level = level - 3; 
      fill.style.width = level + "%";
      fill.style.transition = "width 1s linear"
    }
    if(fill.style.width == "100%"){
      coefBoost()
    }
  }, 500); 
// fly numbers
function clickCostUp(x,y){
  const place = document.getElementById("div-peach")
  const div = document.createElement('h1');
  div.classList.add("fly-numbers")
  div.textContent = formatter.format(Number(localStorage.click_cost) * Number(localStorage.coef_click))
  div.style.left = x+"px";
  div.style.top = y+"px"
  place.appendChild(div)
  setTimeout(() => {
    div.remove(); 
  }, 1000);

}

function  glitchAnimation(event){
  event.target.style.animation = "glitch 0.3s";
  setTimeout(()=>{
    event.target.style.animation = ""
  },300)
}
// Click peach to make a lot of money
document.getElementById("div-peach").onclick = (event) =>{
  localStorage.money = Number(localStorage.money) + (Number(localStorage.click_cost)*Number(localStorage.coef_click));
  clickCostUp(event.clientX,event.clientY)
  event.target.style.animation = "peach-scale 0.05s"
  if(localStorage.getItem("fill_bar") === "true"){
    fillBar()}
  setTimeout(()=>{
    event.target.style.animation = ""
  },100)

}
// Click-cost upgrading
document.querySelectorAll(".card__buy-click").forEach(button => {
  button.onclick = (event) => {
    let price = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-price").textContent)
    let power = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-power").textContent)
    if(Number(localStorage.money) >= price){
        localStorage.money = Number(localStorage.money) - Number(price)
        localStorage.click_cost = Number(localStorage.click_cost) + Number(power)
    }else{
      glitchAnimation(event)
    }

  };
});
// Third categories
document.querySelectorAll(".card__buy-achiev").forEach(button => {
  button.onclick = (event) => {
    const name = event.target.closest('.card__buy-achiev')
    const achiev = name.id
    console.log(name,achiev)
    switch(achiev){
      case "Fill-Bar":{
        if(Number(localStorage.money)>=100000 && localStorage.getItem("fill_bar") === "false"){
          localStorage.money = Number(localStorage.money) - 100000
          localStorage.fill_bar = true;
          progress__bar.style.display = "flex";
          event.target.closest(".card").style.display = "none";
        }else{
          glitchAnimation()
        }
        break
      }
      case "Double Click":{
        break
      }
    }
    

  }  
});
// Passive-income
document.querySelectorAll(".income-buy").forEach(button => {
  button.onclick = (event) => {
    let price = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-price").textContent)
    let power = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-power").textContent)
    if(Number(localStorage.money)>= Number(price)){
      localStorage.money = Number(localStorage.money) - Number(price)
      localStorage.passive_income_per_second =  Number(localStorage.passive_income_per_second) + Number(power)
    }else{
      glitchAnimation()
    }
  };
});

const formatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
});



// Intervals
setInterval(() => {
    header__money.innerHTML = `<h1 class = "header__money-title"> ${formatter.format(localStorage.money)}</h1>
    <svg class= "header__money-svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__clickCost.innerHTML = `<h1 class = "header__money-title">Сила клика:${formatter.format(Number(localStorage.click_cost)*Number(localStorage.coef_click))}</h1>
    <svg class= "header__money-svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__passiveIncome.innerHTML = `<h1 class = "header__money-title">Пас.Доход:${formatter.format(localStorage.passive_income_per_second)}</h1>
    <svg class= "header__money-svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;

}, 100);
setInterval(()=>{
  localStorage.money = Number(localStorage.money) + Number(localStorage.passive_income_per_second)

},1000)

            
