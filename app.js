let exchangeRate = 5.05;
let mode = "RON-EUR";

const lei = document.getElementById("lei");
const eur = document.getElementById("eur");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

async function loadRate() {
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/EUR");
        const data = await response.json();

        exchangeRate = data.rates.RON;

        localStorage.setItem("exchangeRate", exchangeRate);

        rate.innerHTML = `1 EUR = <b>${exchangeRate.toFixed(4)}</b> LEI`;

    } catch {

        exchangeRate = Number(localStorage.getItem("exchangeRate")) || 5.05;

        rate.innerHTML = `📶 Offline · 1 EUR = <b>${exchangeRate.toFixed(4)}</b> LEI`;
    }
}

function fromLei() {

    if (lei.value === "") {
        eur.value = "";
        return;
    }

    eur.value = (Number(lei.value) / exchangeRate).toFixed(2);
}

function fromEuro() {

    if (eur.value === "") {
        lei.value = "";
        return;
    }

    lei.value = (Number(eur.value) * exchangeRate).toFixed(2);
}

lei.addEventListener("input", () => {

    mode = "RON-EUR";

    fromLei();

});

eur.addEventListener("input", () => {

    mode = "EUR-RON";

    fromEuro();

});

swap.addEventListener("click", () => {

    swap.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(180deg)" }
    ], {
        duration: 250
    });

    if (mode === "RON-EUR") {

        eur.focus();

        eur.select();

        mode = "EUR-RON";

    } else {

        lei.focus();

        lei.select();

        mode = "RON-EUR";

    }

});

document.querySelectorAll(".quick button").forEach(btn => {

    btn.onclick = () => {

        if (mode === "RON-EUR") {

            lei.value = btn.innerText;

            fromLei();

        } else {

            eur.value = btn.innerText;

            fromEuro();

        }

    };

});

loadRate();

lei.focus();
