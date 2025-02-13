// localStorage.click_cost = 0.1
//  localStorage.money = 0
localStorage.money = Number(localStorage.money) || 0;
localStorage.click_cost = Number(localStorage.click_cost) || 1;
localStorage.passive_income_per_second = Number(localStorage.passive_income_per_second) || 0;
console.log(exitTime)
window.onbeforeunload = function() {
    alert(1);
  };