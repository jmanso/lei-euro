let exchangeRate = 5.05;

const amount = document.getElementById("amount");
const direction = document.getElementById("direction");
const result = document.getElementById("result");
const rate = document.getElementById("rate");
const convert = document.getElementById("convert");

async function loadRate() {

    try {

        const response = await fetch(
            "https://api.frankfurter.app/latest?from=EUR&to=RON"
        );

        const data = await response.json();

        exchangeRate = data.rates.RON;

        localStorage.setItem("exchangeRate", exchangeRate);

        rate.innerHTML =
            `1 EUR = <b>${exchangeRate.toFixed(4)}</b> LEI`;

    } catch {

        const saved = localStorage.getItem("exchangeRate");

        if (saved) {

            exchangeRate = Number(saved);

            rate.innerHTML =
                `📶 Sin conexión · 1 EUR = <b>${exchangeRate.toFixed(4)}</b> LEI`;

        } else {

            rate.innerHTML =
                "No se pudo obtener el tipo de cambio";

        }

    }

}

function convertMoney(value = null) {

    let amountValue = value ?? Number(amount.value);

    if (!amountValue) {

        result.innerHTML = "—";

        return;

    }

    if (direction.value === "RON-EUR") {

        result.innerHTML =
            (amountValue / exchangeRate).toFixed(2) + " €";

    } else {

        result.innerHTML =
            (amountValue * exchangeRate).toFixed(2) + " LEI";

    }

}

convert.addEventListener("click", () => convertMoney());

amount.addEventListener("input", () => convertMoney());

direction.addEventListener("change", () => convertMoney());

document.querySelectorAll(".quickBtn").forEach(button => {

    button.addEventListener("click", () => {

        amount.value = button.innerText;

        convertMoney(Number(button.innerText));

    });

});

loadRate();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
