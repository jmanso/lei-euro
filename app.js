let exchangeRate = 5.05;

const amount = document.getElementById("amount");
const direction = document.getElementById("direction");
const result = document.getElementById("result");
const rate = document.getElementById("rate");
const convert = document.getElementById("convert");

async function loadRate() {

    try {

        const response = await fetch("https://open.er-api.com/v6/latest/EUR");

        if (!response.ok) {
            throw new Error("Error obteniendo el cambio");
        }

        const data = await response.json();

        if (!data.rates || !data.rates.RON) {
            throw new Error("Respuesta inválida");
        }

        exchangeRate = data.rates.RON;

        localStorage.setItem("exchangeRate", exchangeRate);

        rate.innerHTML = `1 EUR = <strong>${exchangeRate.toFixed(4)}</strong> LEI`;

    } catch (error) {

        console.error(error);

        const saved = localStorage.getItem("exchangeRate");

        if (saved) {

            exchangeRate = Number(saved);

            rate.innerHTML =
                `📶 Offline · 1 EUR = <strong>${exchangeRate.toFixed(4)}</strong> LEI`;

        } else {

            rate.innerHTML =
                "❌ No se pudo obtener el tipo de cambio";

        }

    }

}

function convertMoney(value = null) {

    const amountValue = value ?? Number(amount.value);

    if (!amountValue) {
        result.innerHTML = "—";
        return;
    }

    if (direction.value === "RON-EUR") {

        result.innerHTML =
            `${(amountValue / exchangeRate).toFixed(2)} €`;

    } else {

        result.innerHTML =
            `${(amountValue * exchangeRate).toFixed(2)} LEI`;

    }

}

convert.addEventListener("click", convertMoney);

amount.addEventListener("input", convertMoney);

direction.addEventListener("change", convertMoney);

document.querySelectorAll(".quickBtn").forEach(button => {

    button.addEventListener("click", () => {

        amount.value = button.textContent;

        convertMoney(Number(button.textContent));

    });

});

loadRate();
