
var on_off = 0;

function system_off() {
    let x = Random(-10, 10);
    let y = Random(-10, 10);

    // a1*x + b1*y = c1
    // a2*x + b2*y = c2

    // Простая система (метод сложения)
    let a1 = Random(1, 5);
    let b1 = Random(1, 5);
    let a2 = Random(1, 5);
    let b2 = -b1; // Чтобы легко складывалось

    let c1 = a1 * x + b1 * y;
    let c2 = a2 * x + b2 * y;

    let eqHTML = `<div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <div style="font-size: 3rem; font-weight: 300;">{</div>
                    <div>
                        <p>${a1}x ${b1 > 0 ? '+' : '-'} ${Math.abs(b1)}y = ${c1}</p>
                        <p>${a2}x ${b2 > 0 ? '+' : '-'} ${Math.abs(b2)}y = ${c2}</p>
                    </div>
                  </div>`;

    let solHTML = `<p>Сложим два уравнения:</p>
                   <p>(${a1}x ${b1 > 0 ? '+' : '-'} ${Math.abs(b1)}y) + (${a2}x ${b2 > 0 ? '+' : '-'} ${Math.abs(b2)}y) = ${c1} + ${c2}</p>
                   <p>${a1+a2}x = ${c1+c2}</p>
                   <p><b>x = ${x}</b></p>
                   <p>Подставим x в первое уравнение:</p>
                   <p>${a1}*(${x}) + ${b1}y = ${c1}</p>
                   <p>${a1*x} + ${b1}y = ${c1}</p>
                   <p>${b1}y = ${c1 - a1*x}</p>
                   <p><b>y = ${y}</b></p>`;

    return {
        eqHTML: eqHTML,
        answers: [x, y],
        ansHTML: `<p>x = ${x}, y = ${y}</p>`,
        solHTML: solHTML
    };
}

function system_on() {
    let x = Random(-15, 15);
    let y = Random(-15, 15);

    let a1 = Random(2, 7);
    let b1 = Random(2, 7);
    let a2 = Random(1, 5);
    let b2 = Random(1, 5);

    if (a1*b2 === a2*b1) {
        a2++; // Избегаем линейной зависимости
    }

    let c1 = a1 * x + b1 * y;
    let c2 = a2 * x + b2 * y;

    let eqHTML = `<div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
                    <div style="font-size: 3rem; font-weight: 300;">{</div>
                    <div>
                        <p>${a1}x ${b1 > 0 ? '+' : '-'} ${Math.abs(b1)}y = ${c1}</p>
                        <p>${a2}x ${b2 > 0 ? '+' : '-'} ${Math.abs(b2)}y = ${c2}</p>
                    </div>
                  </div>`;

    let solHTML = `<p>Метод Крамера:</p>
                   <p>Δ = ${a1}*${b2} - ${b1}*${a2} = ${a1*b2 - b1*a2}</p>
                   <p>Δx = ${c1}*${b2} - ${b1}*${c2} = ${c1*b2 - b1*c2}</p>
                   <p>Δy = ${a1}*${c2} - ${c1}*${a2} = ${a1*c2 - c1*a2}</p>
                   <p>x = Δx / Δ = ${c1*b2 - b1*c2} / ${a1*b2 - b1*a2} = <b>${x}</b></p>
                   <p>y = Δy / Δ = ${a1*c2 - c1*a2} / ${a1*b2 - b1*a2} = <b>${y}</b></p>`;

    return {
        eqHTML: eqHTML,
        answers: [x, y],
        ansHTML: `<p>x = ${x}, y = ${y}</p>`,
        solHTML: solHTML
    };
}


function fun1() {
    var chbox = document.getElementById('one');
    on_off = chbox.checked ? 1 : 0;
}

const btn = document.getElementById('button');
const urovnenie = document.getElementById('urovnenie');

if (btn) {
    btn.onclick = function() {
        let data;
        if (on_off == 1) {
            data = system_on();
        } else {
            data = system_off();
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
