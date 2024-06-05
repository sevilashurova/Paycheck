document.addEventListener('DOMContentLoaded', function () {
    const guzestliCheckbox = document.getElementById('guzestli');
    const secondSelect = document.getElementById('second-select');

    secondSelect.style.display = 'none';

    guzestliCheckbox.addEventListener('change', function () {
        if (guzestliCheckbox.checked) {
            secondSelect.style.display = 'block';
        } else {
            secondSelect.style.display = 'none';
        }

    });
});
document.getElementById("form").addEventListener("submit", function (event) {
    if (document.getElementById("salary").value === "") {

        alert("Məvəcibinizi qeyd edin");
        event.preventDefault();
        window.location.reload();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let beliCheckbox = document.getElementById("yes");
    let xeyrCheckbox = document.getElementById("no");
    let memberInput = document.getElementById("member");

    memberInput.style.display = "none";

    beliCheckbox.addEventListener("change", function () {
        if (beliCheckbox.checked) {
            memberInput.style.display = "block";
            xeyrCheckbox.checked = false;
        }
    });

    xeyrCheckbox.addEventListener("change", function () {
        if (xeyrCheckbox.checked) {
            memberInput.style.display = "none";
            beliCheckbox.checked = false;
        }
    });

});
// Hesabla
let form = document.querySelector('#form');
let salary_input = document.querySelector('#salary');
let prize_select = document.querySelector('#prize');
let first_select = document.querySelector('#firstSelect');
let second_select = document.querySelector('#second-select');
let second_select_wrapper = document.querySelector('#second-select-wrapper');

let tradeInput = document.querySelector('#trade');
let guzestliCheckbox = document.querySelector('#guzestli');
let result = document.querySelector('#result');
let yesCheckbox = document.getElementById('yes');
let memberInput = document.getElementById('member');
let resultDiv = document.getElementById('result');


let salary;
let prize;

let totalAmount = 0;
let incomeTaxRez = 0;
let incomeTaxqht = 0;
let incomeTax = 0;
let dsmf = 0;
let dsmfqht = 0;
let medicals = 0;
let unemployed = 0;
let party = 0;
let trade = 0;
let guzestRez = 0;
let guzesttax = 0;
let guzestqht = 0;

let guzestNumber;
let insertedSalary;




form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculateTaxes();
    updateResultTable();
});

function calculateIncomeTaxRez(salary) {
    return salary > 8000 ? (salary - 8000) * 0.05 : 0;
}
function calculateguzestRez(guzestNumber) {
    return guzestNumber > 8000 ? (guzestNumber - 8000) * 0.05 : 0;
}
//dovletin gelir vergisi
function calculateIncomeTax(salary) {
    return salary > 2500 ? 350 + (salary - 2500) * 0.25 : (salary - 200) * 0.14;
}
function calculateguzesttax(guzestNumber) {
    return guzestNumber > 2500 ? 350 + (guzestNumber - 2500) * 0.25 : (guzestNumber - 200) * 0.14;
}
//qeyri dovletin gelir vergisi
function calculateIncomeTaxqht(salary) {
    return salary > 8000 ? (salary - 8000) * 0.14 : 0;
}
function calculateguzestqht(guzestNumber) {
    return guzestNumber > 8000 ? (guzestNumber - 8000) * 0.14 : 0;
}

//hem rezident hem de dovletde dsmf vergisi
function calculateDsmf(salary) {
    return salary * 0.03;
}
// qeyridovletde dsmf vergisi
function calculateDsmfqht(salary) {
    return salary < 200 ? salary * 0.03 : 6 + (salary - 200) * 0.1;
}

//tibbi sigorta vergisi
function calculateMedicals(salary) {
    console.log('calculate medicals: ', salary < 8000 ? salary * 0.02 : 160 + (salary - 8000) * 0.005);
    return salary < 8000 ? salary * 0.02 : 160 + (salary - 8000) * 0.005;
}
//issizliye gore vergi
function calculateUnemployed(salary) {
    return salary * 0.005;
}
//siyasi partiya uzvluyu - bunun deyeri inputdan gelmelidi
function calculateParty(salary) {
    return salary * (yesCheckbox.checked ? memberInput.value / 100 : 0);
}
function calculateTrade(salary) {
    return salary * (tradeInput.value / 100)

}

function calculateTaxes() {
    salary = parseFloat(salary_input.value);
    insertedSalary = salary;
    console.log(" inserted salar", insertedSalary)
    prize = parseFloat(prize_select.value);


    if (prize == 1) {
        salary += salary * 0.25;
        console.log('prize 1: ', salary);
    } else if (prize == 2) {
        salary += salary * 0.5;
        console.log('prize 2: ', salary)
    } else if (prize == 3) {
        salary += salary * 0.75;
    } else if (prize == 4) {
        salary += salary;
    } else if (prize == 0) { 
        salary
    }


    if (guzestliCheckbox.checked) {
        let guzestliValue = parseFloat(second_select_wrapper.value);

        if (guzestliValue == 1) {
            guzestNumber = salary - 400;
            console.log('guzest: ', guzestNumber)
        } else if (guzestliValue == 2) {
            guzestNumber = salary - 200;

        } else if (guzestliValue == 3) {
            guzestNumber = salary - 100;
        } else if (guzestliValue == 4) {
            guzestNumber = salary - 50;
        }
    }


    console.log('salary before funcs: ', salary)
    incomeTaxRez = calculateIncomeTaxRez(salary);
    incomeTaxqht = calculateIncomeTaxqht(salary);
    incomeTax = calculateIncomeTax(salary);
    guzestRez = calculateguzestRez(guzestNumber);
    guzesttax = calculateguzesttax(guzestNumber);
    guzestqht = calculateguzestqht(guzestNumber);
    dsmf = calculateDsmf(salary);
    dsmfqht = calculateDsmfqht(salary);
    medicals = calculateMedicals(salary);
    unemployed = calculateUnemployed(salary);
    party = calculateParty(salary);
    trade = calculateTrade(salary);




    if (first_select.value == 1) {
        if (guzestliCheckbox.checked) {
            totalAmount = salary - (guzestRez + dsmf + medicals + unemployed + party + trade);
            console.log('salary before funcs: ', totalAmount)
        } else {

            totalAmount = salary - (incomeTaxRez + dsmf + medicals + unemployed + party + trade);

        }




        totalAmountCell.textContent = totalAmount.toFixed(2);

    } else if (first_select.value == 2) {

        if (guzestliCheckbox.checked) {
            totalAmount = salary - (guzesttax + dsmf + medicals + unemployed + party + trade);
        } else {
            totalAmount = salary - (incomeTax + dsmf + medicals + unemployed + party + trade);

        }
        totalAmountCell.textContent = totalAmount.toFixed(2);




    } else if (first_select.value == 3) {

        if (guzestliCheckbox.checked) {
            totalAmount = salary - (guzestqht + dsmfqht + medicals + unemployed + party + trade);
        } else {
            totalAmount = salary - (incomeTaxqht + dsmfqht + medicals + unemployed + party + trade);
        }
        totalAmountCell.textContent = totalAmount.toFixed(2);


    }



    resultDiv.textContent = totalAmount
}


// result table

function updateResultTable() {
    const salaryCell = document.getElementById('salaryCell');
    const incomeTaxRezCell = document.getElementById('incomeTaxCell');
    const incomeTaxCell = document.getElementById('incomeTaxCell');
    const incomeTaxqhtCell = document.getElementById('incomeTaxCell');
    const guzestRezCell = document.getElementById('incomeTaxCell')
    const guzesttaxCell = document.getElementById('incomeTaxCell')
    const guzestqhtCell = document.getElementById('incomeTaxCell')
    const dsmfCell = document.getElementById('dsmfCell');
    const dsmfqhtCell = document.getElementById('dsmfCell');
    const medicalsCell = document.getElementById('medicalsCell');
    const tradeCell = document.getElementById('tradeCell');
    const unemployedCell = document.getElementById('unemployedCell');
    const partyCell = document.getElementById('partyCell');
    const totalAmountCell = document.getElementById('totalAmountCell');

    if (first_select.value == 1) {
        if (guzestliCheckbox.checked) {

            guzestRezCell.textContent = guzestRez.toFixed(2);
            salaryCell.textContent = salary.toFixed(2);
            dsmfCell.textContent = dsmf.toFixed(2);
            medicalsCell.textContent = medicals.toFixed(2);
            tradeCell.textContent = trade.toFixed(2);
            unemployedCell.textContent = unemployed.toFixed(2);
            partyCell.textContent = party.toFixed(2);
            totalAmountCell.textContent = totalAmount.toFixed(2);
        } else {
            incomeTaxRezCell.textContent = incomeTaxRez.toFixed(2);
            salaryCell.textContent = salary.toFixed(2);
            dsmfCell.textContent = dsmf.toFixed(2);
            medicalsCell.textContent = medicals.toFixed(2);
            tradeCell.textContent = trade.toFixed(2);
            unemployedCell.textContent = unemployed.toFixed(2);
            partyCell.textContent = party.toFixed(2);
            totalAmountCell.textContent = totalAmount.toFixed(2);

        }
    } else if (first_select.value == 2) {
        if (guzestliCheckbox.checked) {

            guzesttaxCell.textContent = guzesttax.toFixed(2);
            salaryCell.textContent = salary.toFixed(2);
            dsmfCell.textContent = dsmf.toFixed(2);
            medicalsCell.textContent = medicals.toFixed(2);
            tradeCell.textContent = trade.toFixed(2);
            unemployedCell.textContent = unemployed.toFixed(2);
            partyCell.textContent = party.toFixed(2);
            totalAmountCell.textContent = totalAmount.toFixed(2);
        } else {
            incomeTaxCell.textContent = incomeTax.toFixed(2);
            salaryCell.textContent = salary.toFixed(2);
            dsmfCell.textContent = dsmf.toFixed(2);
            medicalsCell.textContent = medicals.toFixed(2);
            tradeCell.textContent = trade.toFixed(2);
            unemployedCell.textContent = unemployed.toFixed(2);
            partyCell.textContent = party.toFixed(2);
            totalAmountCell.textContent = totalAmount.toFixed(2);

        }

    } else if (first_select.value == 3) {
        if (guzestliCheckbox.checked) {

            guzestqhtCell.textContent = guzestqht.toFixed(2);
             salaryCell.textContent = salary.toFixed(2);
            dsmfCell.textContent = dsmf.toFixed(2);
            medicalsCell.textContent = medicals.toFixed(2);
            tradeCell.textContent = trade.toFixed(2);
            unemployedCell.textContent = unemployed.toFixed(2);
            partyCell.textContent = party.toFixed(2); 
            totalAmountCell.textContent = totalAmount.toFixed(2);
        } else {
            incomeTaxqhtCell.textContent = incomeTaxqht.toFixed(2);
            salaryCell.textContent = salary.toFixed(2);
            dsmfqhtCell.textContent = dsmf.toFixed(2);
            medicalsCell.textContent = medicals.toFixed(2);
            tradeCell.textContent = trade.toFixed(2);
            unemployedCell.textContent = unemployed.toFixed(2);
            partyCell.textContent = party.toFixed(2);
            totalAmountCell.textContent = totalAmount.toFixed(2);

        }

    }



    console.log('update table func called!!!')
}

