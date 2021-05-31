"use strict";

let knapsackCapacity = null;
let itemsAmount = null;
let weightsList = [];
let pricesList = [];
let tableOfDP = [];

//********************** control_menu_actions ***********************

let itemsNumberInput = document.querySelector("#items_number_input");
itemsNumberInput.addEventListener('blur', function() {
    let newVal = Math.trunc(itemsNumberInput.value);
    if (newVal != itemsNumberInput.value) {
        alert("Ваше число округлено до: " + newVal);
    }
    if (newVal <= 0) {
        alert("Подходят только положительные числа!");
    } else {
        if (itemsAmount != newVal) {
            itemsAmount = newVal;
            createWeightInputs();
            createPricesInputs();
        }
    }
});

let capacityInput = document.querySelector("#capacity_input");
capacityInput.addEventListener('blur', function() {
    let newVal = Math.trunc(capacityInput.value);
    if (newVal != capacityInput.value) {
        alert("Ваше число округлено до: " + newVal);
    }
    if (newVal <= 0) {
        alert("Подходят только положительные числа!");
    } else {
        if (knapsackCapacity != newVal) {
            knapsackCapacity = newVal;
        }
    }
});

function createWeightInputs() {
    let weightsArray = document.querySelector("#w_array");
    weightsArray.innerHTML = "";
    for (let i = 0; i < itemsAmount; i++) {
        let tmp = document.createElement("input");
        tmp.setAttribute("type", "number");
        weightsArray.appendChild(tmp);
    }
}

function createPricesInputs() {
    let pricesArray = document.querySelector("#p_array");
    pricesArray.innerHTML = "";
    for (let i = 0; i < itemsAmount; i++) {
        let tmp = document.createElement("input");
        tmp.setAttribute("type", "number");
        pricesArray.appendChild(tmp);
    }
}

// ******************* top_menu buttons actions *********************

let guideButton = document.querySelector('#guide_button');
guideButton.addEventListener('click', function() {
    if (this.className == "button") {
        this.className = "active_button";
        document.querySelector("#control_panel").className = "inactive_window";
        document.querySelector("#content").className = "inactive_window";
        document.querySelector("#instruction").className = "active_window";
        document.querySelector("#about_algorithm").className = "inactive_window";
        document.querySelector("#about_algo_button").className = "button";
        document.querySelector("#classic_task_button").className = "button";
        document.querySelector("#alt_task_button").className = "button";
    }
});

let aboutAlgoButton = document.querySelector('#about_algo_button');
aboutAlgoButton.addEventListener('click', function() {
    if (this.className == "button") {
        this.className = "active_button";
        document.querySelector("#control_panel").className = "inactive_window";
        document.querySelector("#content").className = "inactive_window";
        document.querySelector("#instruction").className = "inactive_window";
        document.querySelector("#about_algorithm").className = "active_window";
        document.querySelector("#guide_button").className = "button";
        document.querySelector("#classic_task_button").className = "button";
        document.querySelector("#alt_task_button").className = "button";
    }
});

let classicTaskButton = document.querySelector('#classic_task_button');
classicTaskButton.addEventListener('click', function() {
    if (this.className == "button") {
        this.className = "active_button";
        document.querySelector("#control_panel").className = "active_window";
        document.querySelector("#content").className = "active_window";
        document.querySelector("#instruction").className = "inactive_window";
        document.querySelector("#about_algorithm").className = "inactive_window";
        document.querySelector("#guide_button").className = "button";
        document.querySelector("#about_algo_button").className = "button";
        document.querySelector("#alt_task_button").className = "button";
    }
});

let altTaskButton = document.querySelector('#alt_task_button');
altTaskButton.addEventListener('click', function() {
    alert("Данная функция в текущий момент находится в разработке");
    /*
    if (this.className == "button") {
        this.className = "active_button";
        document.querySelector("#control_panel").className = "active_window";
        document.querySelector("#content").className = "active_window";
        document.querySelector("#instruction").className = "inactive_window";
        document.querySelector("#about_algorithm").className = "inactive_window";
        document.querySelector("#guide_button").className = "button";
        document.querySelector("#about_algo_button").className = "button";
        document.querySelector("#classic_task_button").className = "button";
    }
    */
});
