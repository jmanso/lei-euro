const leiInput = document.getElementById("lei");
const eurInput = document.getElementById("eur");
const rateLabel = document.getElementById("rate");
const swapButton = document.getElementById("swap");

let rate = 5.05;
let direction = "LEI_TO_EUR";

// ---------- Cargar cambio ----------

async function loadRate() {

    try {

        const response = await fetch("https://open.er-api.com/v6/latest/EUR");
        const data = await response.json();

        rate = data.rates.RON;

        localStorage.setItem("rate", rate);

        rateLabel.innerHTML =
            `🟢 1 EUR = <b>${rate.toFixed(4)}</b> LEI`;

    } catch {

        rate = Number(localStorage.getItem("rate")) || 5.05;

        rateLabel.innerHTML =
            `🟡 Offline · 1 EUR = <b>${rate.toFixed(4)}</b> LEI`;

    }

}

loadRate();

// ---------- Conversión ----------

function convertLeiToEuro() {

    const value = parseFloat(leiInput.value);

    if (isNaN(value)) {

        eurInput.value = "";
        return;

    }

    eurInput.value = (value / rate).toFixed(2);

}

function convertEuroToLei() {

    const value = parseFloat(eurInput.value);

    if (isNaN(value)) {

        leiInput.value = "";
        return;

    }

    leiInput.value = (value * rate).toFixed(2);

}

// ---------- Eventos ----------

leiInput.addEventListener("input", () => {

    if (direction === "LEI_TO_EUR")
        convertLeiToEuro();

});

eurInput.addEventListener("input", () => {

    if (direction === "EUR_TO_LEI")
        convertEuroToLei();

});

// ---------- Cambiar sentido ----------

swapButton.addEventListener("click", () => {

    swapButton.animate(

        [
            { transform: "rotate(0deg)" },
            { transform: "rotate(180deg)" }
        ],

        {
            duration: 250
        }

    );

    if (direction === "LEI_TO_EUR") {

        direction = "EUR_TO_LEI";

        eurInput.focus();

    } else {

        direction = "LEI_TO_EUR";

        leiInput.focus();

    }

});

// ---------- Botones rápidos ----------

document.querySelectorAll(".quick button").forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        if (direction === "LEI_TO_EUR") {

            leiInput.value = value;
            convertLeiToEuro();

        } else {

            eurInput.value = value;
            convertEuroToLei();

        }

    });

});

// ---------- Estado inicial ----------

leiInput.focus();
