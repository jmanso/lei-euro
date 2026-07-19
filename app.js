const leiInput = document.getElementById("lei");
const eurInput = document.getElementById("eur");
const rateLabel = document.getElementById("rate");
const swapButton = document.getElementById("swap");
const directionLabel = document.getElementById("direction");

let rate = 5.05;
let direction = "LEI_TO_EUR";

async function loadRate() {

    try {

        const response = await fetch("https://open.er-api.com/v6/latest/EUR");
        const data = await response.json();

        rate = data.rates.RON;

        localStorage.setItem("rate", rate);

    } catch {

        rate = Number(localStorage.getItem("rate")) || 5.05;

    }

    rateLabel.innerHTML = `1 EUR = ${rate.toFixed(4)} LEI`;

}

loadRate();

function updateMode() {

    if (direction === "LEI_TO_EUR") {

     document.getElementById("swapIcon").style.transform = "rotate(0deg)";

        directionLabel.textContent = "LEI → EUR";

        leiInput.readOnly = false;
        eurInput.readOnly = true;

        leiInput.type = "number";
        eurInput.type = "text";

        leiInput.focus();

        convertLei();

    } else {

        document.getElementById("swapIcon").style.transform = "rotate(180deg)";

        directionLabel.textContent = "EUR → LEI";

        eurInput.readOnly = false;
        leiInput.readOnly = true;

        eurInput.type = "number";
        leiInput.type = "text";

        eurInput.focus();

        convertEuro();

    }

}

function convertLei() {

    const value = parseFloat(leiInput.value);

    if (isNaN(value)) {

        eurInput.value = "";
        return;

    }

    eurInput.value = (value / rate).toFixed(2);

}

function convertEuro() {

    const value = parseFloat(eurInput.value);

    if (isNaN(value)) {

        leiInput.value = "";
        return;

    }

    leiInput.value = (value * rate).toFixed(2);

}

leiInput.addEventListener("input", () => {

    if (direction === "LEI_TO_EUR")
        convertLei();

});

eurInput.addEventListener("input", () => {

    if (direction === "EUR_TO_LEI")
        convertEuro();

});

swapButton.addEventListener("click", () => {

    direction =
        direction === "LEI_TO_EUR"
            ? "EUR_TO_LEI"
            : "LEI_TO_EUR";

    leiInput.value = "";
    eurInput.value = "";

    updateMode();

});

document.querySelectorAll(".quick button").forEach(button => {

    button.onclick = () => {

        if (direction === "LEI_TO_EUR") {

            leiInput.value = button.dataset.value;
            convertLei();

        } else {

            eurInput.value = button.dataset.value;
            convertEuro();

        }

    };

});

updateMode();
