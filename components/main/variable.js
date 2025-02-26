
localStorage.money = Number(localStorage.money) || 0;
localStorage.click_cost = Number(localStorage.click_cost) || 1;
localStorage.passive_income_per_second = Number(localStorage.passive_income_per_second) || 0;
localStorage.coef_click = Number(localStorage.coef_click) || 1;
localStorage.fill_bar = localStorage.fill_bar || "false";
localStorage.double_click = Number(localStorage.double_click) || 1;
localStorage.farmer = localStorage.farmer || false;
localStorage.sizePeach = localStorage.sizePeach || 0;
localStorage.chest = localStorage.chest || false;
localStorage.chestDateLock;
localStorage.prestige = localStorage.prestige || false;
localStorage.prestige_bonus = Number(localStorage.prestige) || 1;


function boost(){
  localStorage.click_cost = 100000000000000000
}
// boost()
// resetSettings()
/*

localStorage.prestige_bonus = Number(localStorage.prestige_bonus) + 1
*/