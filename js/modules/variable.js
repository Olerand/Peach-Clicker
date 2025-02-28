
// Доходы
localStorage.money = Number(localStorage.money) || 0;
localStorage.click_cost = Number(localStorage.click_cost) || 1;
localStorage.passive_income_per_second = Number(localStorage.passive_income_per_second) || 0;

//Бонусы
localStorage.coef_click = Number(localStorage.coef_click) || 1;
localStorage.double_click = Number(localStorage.double_click) || 1;
localStorage.sizePeach = localStorage.sizePeach || 0;
localStorage.prestige_bonus = Number(localStorage.prestige_bonus) || 1;

// Ачивки
localStorage.fill_bar = localStorage.fill_bar || "false";
localStorage.farmer = localStorage.farmer || false;
localStorage.chest = localStorage.chest || false;
localStorage.chestDateLock;
localStorage.prestige = localStorage.prestige || false;

// prestige
export function resetSettings() {
    localStorage.click_cost = 1;
    localStorage.money = 0;
    localStorage.passive_income_per_second = 0;
    localStorage.coef_click = 1;
    localStorage.fill_bar = false; 
    localStorage.double_click = 1;
    localStorage.farmer = false;
    localStorage.sizePeach = 0;
    localStorage.coef_click = 1;
    localStorage.chest = false;
    localStorage.prestige = false;
    localStorage.prestige_bonus = Number(localStorage.prestige_bonus) + 1
    location.reload()
}