
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

function kor_off(x) {
    let random = Random(0, 1);
    let equation, solHTML, kof, ravno;
    
    if (random == 0) {
        kof = Random(1, 20);
        ravno = Math.sqrt(x + kof);
        while (ravno % 1 !== 0) {
            kof = Random(1, 20);
            ravno = Math.sqrt(x + kof);
        }
        equation = `<span>&radic;</span><span style="border-top: 1px solid black">x + ${kof}</span> = ${ravno}`;
        solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>Возводим обе части в квадрат:</p>
                   <p>x + ${kof} = ${ravno * ravno}</p>
                   <p>x = ${ravno * ravno} - ${kof} = <b>${x}</b></p>`;
    } else {
        kof = Random(1, 20);
        ravno = Math.sqrt(x - kof);
        while (ravno % 1 !== 0 || isNaN(ravno)) {
            kof = Random(1, 20);
            if (x - kof >= 0) {
                ravno = Math.sqrt(x - kof);
            }
        }
        equation = `<span>&radic;</span><span style="border-top: 1px solid black">x - ${kof}</span> = ${ravno}`;
        solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>Возводим обе части в квадрат:</p>
                   <p>x - ${kof} = ${ravno * ravno}</p>
                   <p>x = ${ravno * ravno} + ${kof} = <b>${x}</b></p>`;
    }
    
    return {
        eqHTML: `<p>${equation}</p>`,
        answers: [x],
        ansHTML: `<p>x = ${x}</p>`,
        solHTML: solHTML
    };
}

function kor_on(x1, x2) {
    let a = 1, b = -(x1 + x2), c = x1 * x2;
    let k = Random(1, 5);
    c += k*k;
    
    let eq = `<span>&radic;</span><span style="border-top: 1px solid black">${kvad_format(a, b, c)}</span> = ${k}`;
    let solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Возводим в квадрат:</p>
                   <p>${kvad_format(a, b, c)} = ${k*k}</p>
                   <p>${kvad_format(a, b, c - k*k)} = 0</p>
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
            let x1 = Random(-20, -6);
            let x2 = Random(6, 20);
            data = kor_on(x1, x2);
        } else {
            let x = Random(2, 40);
            data = kor_off(x);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
