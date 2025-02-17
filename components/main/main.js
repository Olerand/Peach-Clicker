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
const header__money = document.getElementById("header__money");
const header__passiveIncome =  document.getElementById("header__passive-income")
const header__clickCost = document.getElementById("header__click-cost")
const progress__bar = document.getElementById("progress__bar")
export {header__money,header__passiveIncome,header__clickCost,progress__bar};

