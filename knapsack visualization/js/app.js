"use strict";

let knapsackCapacity = null;
let itemsAmount = null;
let startButtonIsAvailable = true;
let answerButtonIsAvailable = false;
let stepButtonIsAvailable = false;
let rowPosition = 0;
let cellPosition = 0;
let weightsList = [];
let pricesList = [];
let answerItems = [];

let guideButton = document.querySelector('#guide_button');
let aboutAlgoButton = document.querySelector('#about_algo_button');
let classicTaskButton = document.querySelector('#classic_task_button');
let altTaskButton = document.querySelector('#alt_task_button');

let startButton = document.querySelector("#start_button");
let answerButton = document.querySelector("#answer_button");
let stepButton = document.querySelector("#step_button");

let algoTable = document.querySelector("#dynamic_table");
let itemsNumberInput = document.querySelector("#items_number_input");
let capacityInput = document.querySelector("#capacity_input");
let stepInfo = document.querySelector("#step_info_block");
let resultInfo = document.querySelector("#result_block");
let weightsArray = document.querySelector("#w_array");
let pricesArray = document.querySelector("#p_array");

// ******************* top_menu buttons actions *********************

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

//********************** control_menu_actions ***********************

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

startButton.addEventListener('click', function() {
    if (startButtonIsAvailable) {
        rowPosition = 0;
        cellPosition = 0;
        //очищаем все поля в content
        algoTable.innerHTML = "";
        stepInfo.innerHTML = "";
        resultInfo.innerHTML = "";
        //забираем данные из input`ов в массивы
        let inputsW = document.getElementById("w_array").getElementsByTagName("input");
        for (let i = 0; i < inputsW.length; i++) {
            weightsList.push(inputsW[i].value);
        }
        let inputsP = document.getElementById("p_array").getElementsByTagName("input");
        for (let i = 0; i < inputsP.length; i++) {
            pricesList.push(inputsP[i].value);
        }
        //проверяем введеные числа
        let passedCheck = true;
        for (let weight of weightsList) {
            if (weight < 1) {
                passedCheck = false;
                alert("Вес предмета должен быть больше нуля! Исправьте введенные данные");
                break;
            }
        }
        for (let price of pricesList) {
            if (price < 0) {
                passedCheck = false;
                alert("Цена предмета не должна быть отрицательной! Исправьте введенные данные");
                break;
            }
        }
        if (passedCheck) {
            //создаем таблицу нужных размеров, заполняем пустотой
            createTable();
            //обновляем значения доступности кнопок
            answerButtonIsAvailable = true;
            stepButtonIsAvailable = true;
            startButtonIsAvailable = false;
        }  else {
            weightsList = [];
            pricesList = [];
        }
    } else {
        alert('Алгоритм уже запущен, чтобы завершить сразу, нажмите "получить ответ"');
    }
});

answerButton.addEventListener('click', function() {
    if (answerButtonIsAvailable) {
        while (rowPosition <= itemsAmount + 1) {
            make_step();
            cellPosition++;
            if (cellPosition > knapsackCapacity + 1) {
                cellPosition = 2;
                rowPosition++;
            }
        }
        let row = algoTable.firstChild.firstChild.rows;
        for (let i = 1; i < itemsAmount + 2; i++) {
            let col = row[i].cells;
            for (let j = 1; j < knapsackCapacity + 2; j++) {
                col[j].className = "";
            }
        }
        find_result(itemsAmount + 1, knapsackCapacity + 1);
        print_result();
        answerButtonIsAvailable = false;
        stepButtonIsAvailable = false;
        startButtonIsAvailable = true;
    } else {
        alert('Сначала запустите алгоритм с помощью кнопки "старт"');
    }
});

stepButton.addEventListener('click', function() {
    if (stepButtonIsAvailable) {
        let row = algoTable.firstChild.firstChild.rows;
        for (let i = 1; i < itemsAmount + 2; i++) {
            let col = row[i].cells;
            for (let j = 1; j < knapsackCapacity + 2; j++) {
                col[j].className = "";
            }
        }
        if (rowPosition > itemsAmount + 1) {
            find_result(itemsAmount + 1, knapsackCapacity + 1);
            print_result();
            stepButtonIsAvailable = false;
            answerButtonIsAvailable = false;
            startButtonIsAvailable = true;
        } else {
            make_step();
            cellPosition++;
            if (cellPosition > knapsackCapacity + 1) {
                cellPosition = 2;
                rowPosition++;
            }
        }
    } else {
        alert('Сначала запустите алгорим с помощью кнопки "старт"');
    }
});

function createWeightInputs() {
    weightsArray.innerHTML = "";
    for (let i = 0; i < itemsAmount; i++) {
        let tmp = document.createElement("input");
        tmp.setAttribute("type", "number");
        tmp.setAttribute("value", 1);
        weightsArray.appendChild(tmp);
    }
}

function createPricesInputs() {
    pricesArray.innerHTML = "";
    for (let i = 0; i < itemsAmount; i++) {
        let tmp = document.createElement("input");
        tmp.setAttribute("type", "number");
        tmp.setAttribute("value", 1);
        pricesArray.appendChild(tmp);
    }
}

function createTable() {
    let tbl = document.createElement("table");
    for (let i = 0; i < itemsAmount + 2; i++) {
        let tr = tbl.insertRow();
        for (let j = 0; j < knapsackCapacity + 2; j++) {
            let td = tr.insertCell();
            if (i == 0 && j == 0) {
                td.appendChild(document.createTextNode(""));
            } else if (j == 0) {
                td.appendChild(document.createTextNode(`k = ${i - 1}`));
            } else if (i == 0) {
                td.appendChild(document.createTextNode(j - 1));
            } else if (i == 1 && j != 0 || j == 1 && i != 0) {
                td.appendChild(document.createTextNode(0));
            }
        }
    }
    algoTable.appendChild(tbl);
    rowPosition = 2;
    cellPosition = 2;
}

function make_step() {
    let validB = false;
    let row = algoTable.firstChild.firstChild.rows;
    // find a
    let col = row[rowPosition - 1].cells;
    let a = col[cellPosition].innerHTML;
    // find b
    let b = 0;
    if (cellPosition > weightsList[rowPosition - 2]) {
        validB = true;
        b = Number(col[cellPosition - weightsList[rowPosition - 2]].innerHTML) + Number(pricesList[rowPosition - 2]);
    }
    col = row[rowPosition].cells;
    col[cellPosition].innerHTML = Math.max(a, b);
    col[cellPosition].className = "current_cell";
    if (validB) {
        if (a >= b) {
            col = row[rowPosition - 1].cells;
            col[cellPosition].className = "previous_good_cell";
            col[cellPosition - weightsList[rowPosition - 2]].className = "previous_bad_cell";
        } else {
            col = row[rowPosition - 1].cells;
            col[cellPosition].className = "previous_bad_cell";
            col[cellPosition - weightsList[rowPosition - 2]].className = "previous_good_cell";
        }
    } else {
        col = row[rowPosition - 1].cells;
        col[cellPosition].className = "previous_good_cell";
    }
    // надо добавить вывод сообщения в поле и подсветку a и b
}

function find_result(k, s) {
    let row = algoTable.firstChild.firstChild.rows;
    // find a and b
    let col = row[k].cells; 
    let a = Number(col[s].innerHTML);
    if (a == 0) {
        return;
    }
    col[s].className = "went_item";
    col = row[k - 1].cells;
    let b = Number(col[s].innerHTML);
    if (a == b) {
        find_result(k - 1, s);
    } else {
        col = row[k].cells;
        col[s].className = "taken_item";
        find_result(k - 1, s - Number(weightsList[k - 2]));
        answerItems.push(k - 1);
    }
}

function print_result() {
    let p = document.createElement('p');
    p.className = "answer_message";
    let row = algoTable.firstChild.firstChild.rows;
    let col = row[itemsAmount + 1].cells; 
    let a = Number(col[knapsackCapacity + 1].innerHTML);
    p.innerHTML = `Максимально возмжожная стоимоть: ${a}`;
    resultInfo.append(p);
    p = document.createElement('p');
    p.className = "answer_message";
    p.innerHTML = `Для этого нужно взять предметы напротив оранжевых ячеек`;
    resultInfo.append(p);
}
