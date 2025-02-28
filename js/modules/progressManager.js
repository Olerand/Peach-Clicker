window.onload = function () {
    checkFillBar()
    checkDoubleClick()
    checkFarmer()
    checkChest()
    checkPeachSize()
    checkPresige()
    localStorage.coef_click = 1

};
export let levelPeachBoost;
export function checkPresige(){
    if(localStorage.getItem("prestige") === "true"){
        document.getElementById("Prestige").closest(".card").style.display = "none";
        document.getElementById("clicker-prestige").style.display = "flex";
    }else{
        document.getElementById("clicker-prestige").style.display = "none";
    }
}
export function checkChest(){
    if(localStorage.getItem("chest")=== "true"){
        document.getElementById("Chest").closest(".card").style.display = "none"
        document.getElementById("clicker-chest").style.display = "flex";
    }else{
        document.getElementById("clicker-chest").style.display = "none";
    }
}
export function checkPeachSize(){
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
    },}
const priceBBS = document.getElementById("price_BBS")
const peach = document.getElementById("peach")
peach.style.width = levelPeach[localStorage.sizePeach].size
peach.style.height = levelPeach[localStorage.sizePeach].size
levelPeachBoost = levelPeach[localStorage.sizePeach].boost
priceBBS.textContent = levelPeach[localStorage.sizePeach].price
if(Number(localStorage.sizePeach) == 8){
    document.getElementById("BBS").closest(".card").style.display = "none"
}}

export function checkFarmer(){
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

export function checkFillBar(){
    if (localStorage.getItem("fill_bar") === "true") {
        progress__bar.style.display = "flex";
        document.getElementById("card__fill-bar").style.display = "none";
    } else {
    progress__bar.style.display = "none";
}}

export function checkDoubleClick(){
    if(localStorage.double_click == 2){
        document.getElementById("Double Click").closest(".card").style.display = "none";
    }else{
        document.getElementById("Double Click").closest(".card").style.display = "flex";
}}

let levelFillBar = 0; 
let boostOfClick = false;
let boostTimeout;
const progress__bar = document.getElementById("progress__bar")

export function coefBoost() {
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

export function fillBar(){
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