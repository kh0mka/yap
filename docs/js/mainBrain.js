var isTotalCalculated = false;
var addedDishes = [];

function addRow(tableId) {

    const select = document.querySelector('select');
    const NameDish = select.options[select.selectedIndex].text;
    let Ccal = document.getElementById("foodList").value;
    let ValueOfDishes = document.getElementById("value").value;

    let errorElement = document.getElementById('error');

    const inputs = [NameDish, Ccal, ValueOfDishes];

    const validationResult = validateInputs(inputs);

    if (!validationResult) {
        errorElement.innerHTML = 'Заполните все поля';
		errorElement.className += 'error-background';

        return;
    }

    let table = document.getElementById(tableId);

    if (addedDishes.includes(NameDish)) {
        let rowCount = table.rows.length;
        for (let i = 0; i < rowCount; i++) {
            let row = table.rows[i];
            if (row.cells[0].innerHTML === NameDish) {
                let currentCсal = row.cells[3].innerHTML;
                let currentValuesOfDishes = row.cells[2].innerHTML;

                const recalculatedCcal = +currentCсal + (+Ccal * ValueOfDishes);
                const recalculatedValuesOfDishes = +currentValuesOfDishes + +ValueOfDishes;

                row.cells[3].innerHTML = recalculatedCcal;
                row.cells[2].innerHTML = recalculatedValuesOfDishes;
				recalculateTotal(tableId);
                return;
            }
        }
    }

    let rowIndex = -1;

    if (isTotalCalculated) rowIndex = table.rows.length - 1;

    let row = table.insertRow(rowIndex);
    let tableIndexes = 0;

    let dishNameCell = row.insertCell(tableIndexes);
    dishNameCell.innerHTML = NameDish;
    tableIndexes++;

    let dishCcalCell = row.insertCell(tableIndexes);
    dishCcalCell.innerHTML = Ccal;
    tableIndexes++;

    let dishAmountCell = row.insertCell(tableIndexes);
    dishAmountCell.innerHTML = ValueOfDishes;
    tableIndexes++;

    let dishCcal = row.insertCell(tableIndexes);
    dishCcal.innerHTML = (Ccal * ValueOfDishes).toFixed(2);
    tableIndexes++;
	
	recalculateTotal(tableId);
    
    addedDishes.push(NameDish);
	
}

function calculateTotal(tableId) {
    let table = document.getElementById(tableId);

    let rowCount = table.rows.length;
    let total = 0;

    for (let i = 1; i < rowCount; i++) {
        let row = table.rows[i];
        let ccals = row.cells[3].innerHTML;
        total += parseFloat(ccals);
    }

    let row = table.insertRow(-1);
    row.className += 'total-ccals';

    let nameCell = row.insertCell(0);
    nameCell.innerHTML = 'Итого';

    let totalCell = row.insertCell(1);
    totalCell.innerHTML = total.toFixed(2) + ' ккал.';
    totalCell.colSpan = 4;

    let fatBoy = document.getElementById('fatBoy');

    if (total > 5000) {
        alert("Вы толстый");

        return;
    }

    isTotalCalculated = true;
}

function clearAllRows(tableId) {
    let tableBody = document.getElementById(tableId);
    let rowCount = tableBody.rows.length;

    for (let i = rowCount - 1; i > 0; i--) {
        tableBody.deleteRow(i);
    }

    isTotalCalculated = false;
    clearError();
}

function recalculateTotal(tableId) {
    if (isTotalCalculated) {
        let table = document.getElementById(tableId);
        let rowCount = table.rows.length;
        table.deleteRow(rowCount - 1);

        calculateTotal(tableId);
    }
}

function validateInputs(inputs) {

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] === '' || inputs[i] === null || inputs[i] === undefined || inputs[i] === NaN) {
            return false;
        }
    }
    return true;
}