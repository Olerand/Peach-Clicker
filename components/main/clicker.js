import {header__money,header__passiveIncome,header__clickCost, progress__bar,header__bonus} from './main.js'
window.onload = function () {
  checkFillBar()
  checkDoubleClick()
  checkFarmer()
  checkPeachSize()
  localStorage.coef_click = 1

};
let levelPeachBoost;
function checkPeachSize(){

  const levelPeach = {
    "0":{
      size:"50px",
      boost: 1.00,
      price: "100M"
    },
    "1":{
      size:"100px",
      boost: 1.10,
      price :"1B"
    },
    "2":{
      size:"150px",
      boost: 1.20,
      price:"10B"
    },
    "3":{
      size:"200px",
      boost: 1.30,
      price:"100B"
    },
    "4":{
      size:"250px",
      boost: 1.40,
      price: "1T"
    },
    "5":{
      size:"300px",
      boost: 1.60,
      price:"10T"
    },
    "6":{
      size:"350px",
      boost: 1.70,
      price:"100T"
    },
    "7":{
      size:"400px",
      boost: 1.80,
      price:"1P"
    },
    "8":{
      size:"450px",
      boost: 2,
      price:"10P"
    },
  }
  const priceBBS = document.getElementById("price_BBS")
    const peach = document.getElementById("peach")
    peach.style.width = levelPeach[localStorage.sizePeach].size
    peach.style.height = levelPeach[localStorage.sizePeach].size
    levelPeachBoost = levelPeach[localStorage.sizePeach].boost
    priceBBS.textContent = levelPeach[localStorage.sizePeach].price
  if(Number(localStorage.sizePeach) == 8){
    console.log(document.getElementById("BBS").closest(".card").style.display = "none")
  }
}
function checkFarmer(){
  if(localStorage.getItem("farmer") === "true"){
    const element = document.getElementById("div-peach");
    const coordinates = 350;
    const event = new MouseEvent('click', {
      clientX: coordinates, 
      clientY: coordinates, 
});
    document.getElementById("Farmer").closest(".card").style.display = "none";
    setInterval(()=>{
      element.dispatchEvent(event);
    },2000)
  }else{
    document.getElementById("Farmer").closest(".card").style.display = "flex";
  }
}
function checkFillBar(){
  if (localStorage.getItem("fill_bar") === "true") {
    progress__bar.style.display = "flex";
    document.getElementById("card__fill-bar").style.display = "none";
  } else {
    progress__bar.style.display = "none";
  }  
}
function checkDoubleClick(){
  if(localStorage.double_click == 2){
    document.getElementById("Double Click").closest(".card").style.display = "none";
  }else{
    document.getElementById("Double Click").closest(".card").style.display = "flex";
  }
}
let levelFillBar = 0; 
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
let boostOfClick = false;
let boostTimeout;
function coefBoost() {
  if (!boostOfClick) {
    boostOfClick = true;
    localStorage.coef_click = Number(localStorage.coef_click) * 2;
    function checkLevel() {
      if (levelFillBar >= 100) {
        clearTimeout(boostTimeout); 
        boostTimeout = setTimeout(() => {
          boostOfClick = false;
          localStorage.coef_click = Number(localStorage.coef_click) / 2;
        }, 5000); 
      }
    }
    boostTimeout = setInterval(checkLevel, 1000);
  }
}

function fillBar(){
  const fill = document.getElementById("fill")
  if (levelFillBar < 100) {
    levelFillBar += 5; 
    fill.style.width = levelFillBar + "%"; 
  }
}
setInterval(() => {
    if (levelFillBar > 0) {
      levelFillBar = levelFillBar - 3; 
      fill.style.width = levelFillBar + "%";
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
  div.textContent = formatBigNumber(Number(localStorage.click_cost)*Number(localStorage.coef_click)*Number(localStorage.double_click)*levelPeachBoost)
  div.style.left = x+"px";
  div.style.top = y+"px"
  place.appendChild(div)
  setTimeout(() => {
    div.remove(); 
  }, 1000);

}
function formatBigNumber(num) {
  if (num < 1e3) return num.toFixed(0); 
  const suffixes = ["K", "M", "B", "T", "P", "E"];
  let i = 0;
  while (num >= 1000 && i < suffixes.length - 1) {
    num /= 1000;
    i++;
  }
  num = Math.round(num * 100) / 100
  return num.toFixed(0) + suffixes[i];
}

function audioAdd(){
  let audio = new Audio("music/peach.mp3")
  audio.volume = 0.5;
  audio.play()
}
function  glitchAnimation(event){
  event.target.style.animation = "glitch 0.3s";
  setTimeout(()=>{
    event.target.style.animation = ""
  },300)
}
// Click peach to make a lot of money
document.getElementById("div-peach").onclick = (event) =>{
  localStorage.money = Number(localStorage.money) + (Number(localStorage.click_cost)*Number(localStorage.coef_click)*Number(localStorage.double_click)*levelPeachBoost);
  clickCostUp(event.clientX,event.clientY)
  audioAdd()
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
    const price = parseCompactNumber(event.target.closest(".card").querySelector(".card__main-price").textContent)
    const card = event.target.closest(".card")
    switch(achiev){
      case "Fill-Bar":{
        if(Number(localStorage.money)>=price && localStorage.getItem("fill_bar") === "false"){
          localStorage.money = Number(localStorage.money) - price
          localStorage.fill_bar = true;
          progress__bar.style.display = "flex";
          card.style.display = "none";
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
          checkFarmer();
        }else{
          glitchAnimation(event)
        }
      }
      case "BBS":{
        if(Number(localStorage.money)>=price && localStorage.sizePeach < 9){
          localStorage.money = Number(localStorage.money) - price
          localStorage.sizePeach = Number(localStorage.sizePeach) + 1;
          checkPeachSize()
          if(Number(localStorage.sizePeach) == 8){
            card.style.display = "none";
          }
        }else{
          glitchAnimation(event)
        }
      }
    }
    

  }  
});
// Passive-income
document.querySelectorAll(".card__buy-income").forEach(button => {
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





// Intervals
setInterval(() => {
  let money = formatBigNumber(Number(localStorage.money))
  let bonus = Number(localStorage.coef_click)*Number(localStorage.double_click)*levelPeachBoost
  let clickCost = formatBigNumber(Number(localStorage.click_cost)*bonus)
  let income = formatBigNumber(Number(localStorage.passive_income_per_second))
    header__money.innerHTML = `<h1 class = "header__money-title"> ${money}</h1>
    <svg class= "header__money-svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__clickCost.innerHTML = `<h1 class = "header__money-title">Сила клика:${clickCost}</h1>
    <svg class= "header__money-svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__passiveIncome.innerHTML = `<h1 class = "header__money-title">Пас.Доход:${income}</h1>
    <svg class= "header__money-svg" 
    xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 48 48"><g fill="orange" stroke="currentColor" stroke-width="4"><path stroke-linejoin="round" d="M10.077 13.431c4.97-5.56 13.61-3.116 16.923-1.43c1.657-.633 6.197-1.358 9.18.664c3.727 2.528 8.423 9.24 4.074 18.719C36.775 38.968 27.69 42.157 24.376 43c-2.485-1.053-7.946-3.168-13.77-8.448c-5.28-4.788-6.741-14.169-.529-21.12Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M27 12c-1.924.75-5.772 2.25-7.87 6.75c-2.256 4.836-.525 9 0 11.25"/><path stroke-linecap="round" d="M21 4c.333.167 2.5.5 3 2.5c.437 1.749-.333 2.833-.5 4"/><path d="M28.479 11.329a1.477 1.477 0 0 1-1.416-1.808c.27-1.287.882-3.044 2.267-4.129c1.384-1.084 3.236-1.259 4.55-1.213a1.477 1.477 0 0 1 1.417 1.807c-.27 1.288-.883 3.045-2.267 4.13c-1.384 1.084-3.236 1.258-4.551 1.213Z"/></g></svg>`;
    header__bonus.innerHTML = `<h1 class = "header__money-title">Бонус клика:X${bonus}</h1>`
}, 100);
setInterval(()=>{
  localStorage.money = Number(localStorage.money) + Number(localStorage.passive_income_per_second)

},1000)
