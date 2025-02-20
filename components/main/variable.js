
localStorage.money = Number(localStorage.money) || 0;
localStorage.click_cost = Number(localStorage.click_cost) || 0.1;
localStorage.passive_income_per_second = Number(localStorage.passive_income_per_second) || 0;
localStorage.coef_click = Number(localStorage.coef_click) || 1;
localStorage.fill_bar = localStorage.fill_bar || "false";
localStorage.achiev_fillBar = false;


function resetSettings() {
  localStorage.click_cost = 0.1;
  localStorage.money = 0;
  localStorage.passive_income_per_second = 0;
  localStorage.coef_click = 1;
  localStorage.fill_bar = false; 
}

function boost(){
  localStorage.click_cost = 100000
}