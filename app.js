let exchangeRate = 5.05;

const lei = document.getElementById("lei");
const eur = document.getElementById("eur");
const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

let editing = "lei";

async function loadRate() {

    try {

        const response = await fetch("https://open.er-api.com/v6/latest/EUR");

        const data = await response.json();

        exchangeRate = data.rates.RON;

        localStorage.setItem("lei2eur-rate", exchangeRate);

        rate.innerHTML =
            `🟢 1 EUR = <b>${exchangeRate.toFixed(4)}</b> LEI`;

    } catch {

        exchangeRate =
            Number(localStorage.getItem("lei2eur-rate")) || 5.05;

        rate.innerHTML =
            `🟡 Offline · 1 EUR = <b>${exchangeRate.toFixed(4)}</b> LEI`;

    }

}

function format(n){

    return Number(n).toLocaleString("es-ES",{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    });

}

function fromLei(){

    if(lei.value===""){

        eur.value="";
        return;

    }

    eur.value=format(Number(lei.value)/exchangeRate);

}

function fromEuro(){

    if(eur.value===""){

        lei.value="";
        return;

    }

    lei.value=format(Number(eur.value.replace(",","."))*exchangeRate);

}

lei.addEventListener("input",()=>{

    editing="lei";

    fromLei();

});

eur.addEventListener("input",()=>{

    editing="eur";

    fromEuro();

});

swap.onclick=()=>{

    swap.animate([
        {transform:"rotate(0deg)"},
        {transform:"rotate(180deg)"}
    ],{
        duration:250
    });

    const l=lei.value;
    const e=eur.value;

    lei.value=e;
    eur.value=l;

    if(editing==="lei"){

        editing="eur";
        eur.focus();

    }else{

        editing="lei";
        lei.focus();

    }

};

document.querySelectorAll(".quick button").forEach(btn=>{

    btn.onclick=()=>{

        if(editing==="lei"){

            lei.value=btn.innerText;
            fromLei();

        }else{

            eur.value=btn.innerText;
            fromEuro();

        }

        document.activeElement.blur();

    };

});

loadRate();

lei.focus();
