
var on_off = 0;

function kvad_format(a, b, c) {
    let eq = "";
    if (a !== 0) {
        if (a === 1) eq += "x²";
        else if (a === -1) eq += "-x²";
        else eq += a + "x²";
    }
    
    if (b !== 0) {
        if (b > 0 && a !== 0) eq += " + ";
        else if (b < 0) { eq += " - "; b = -b; }

        if (b === 1) eq += "x";
        else eq += b + "x";
    }

    if (c !== 0) {
        if (c > 0 && (a !== 0 || b !== 0)) eq += " + ";
        else if (c < 0) { eq += " - "; c = -c; }

        eq += c;
    }
    if (eq === "") return "0";
    return eq;
}

function step_off(x) {
    let osnova = Random(2, 5);
    let right_val = Math.pow(osnova, Math.abs(x));
    let eq, solHTML;

    if (x > 0) {
        eq = `${osnova}<sup>x</sup> = ${right_val}`;
        solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Представим правую часть в виде степени с основанием ${osnova}:</p>
                   <p>${right_val} = ${osnova}<sup>${x}</sup></p>
                   <p>Получаем: ${osnova}<sup>x</sup> = ${osnova}<sup>${x}</sup></p>
                   <p><b>x = ${x}</b></p>`;
    } else if (x < 0) {
        eq = `${osnova}<sup>x</sup> = <sup>1</sup>/<sub>${right_val}</sub>`;
        solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Представим правую часть в виде степени с основанием ${osnova}:</p>
                   <p>1 / ${right_val} = ${osnova}<sup>${x}</sup></p>
                   <p>Получаем: ${osnova}<sup>x</sup> = ${osnova}<sup>${x}</sup></p>
                   <p><b>x = ${x}</b></p>`;
    } else {
        eq = `${osnova}<sup>x</sup> = 1`;
        solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Любое число в нулевой степени равно 1.</p>
                   <p><b>x = 0</b></p>`;
    }

    return {
        eqHTML: `<p>${eq}</p>`,
        answers: [x],
        ansHTML: `<p>x = ${x}</p>`,
        solHTML: solHTML
    };
}

function step_on(x1, x2) {
    let osnov = Random(2, 10);
    let a = 1, b = -(x1 + x2), c = x1 * x2;
    let eq = `${osnov}<sup>${kvad_format(a, b, c)}</sup> = 1`;
    
    let solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Представим 1 как ${osnov}<sup>0</sup>:</p>
                   <p>${osnov}<sup>${kvad_format(a, b, c)}</sup> = ${osnov}<sup>0</sup></p>
                   <p>Приравниваем показатели:</p>
                   <p>${kvad_format(a, b, c)} = 0</p>
                   <p>Корни: <b>x₁ = ${x1}, x₂ = ${x2}</b></p>`;

    return {
        eqHTML: `<p>${eq}</p>`,
        answers: [x1, x2],
        ansHTML: `<p>x₁ = ${x1}&nbsp;&nbsp;&nbsp;&nbsp;x₂ = ${x2}</p>`,
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
            let x1 = Random(-10, -1);
            let x2 = Random(1, 10);
            data = step_on(x1, x2);
        } else {
            let x = Random(-5, 5);
            data = step_off(x);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
