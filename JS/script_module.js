
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

function module_off(kof, ravno, random) {
    let x1, x2, equation, solHTML;

    if (random == 0) {
        x1 = ravno + kof;
        x2 = (-ravno) + kof;
        equation = `|x - ${kof}| = ${ravno}`;
        solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>Раскрываем модуль:</p>
                   <p>1) x - ${kof} = ${ravno} => x = ${ravno} + ${kof} = <b>${x1}</b></p>
                   <p>2) x - ${kof} = -${ravno} => x = -${ravno} + ${kof} = <b>${x2}</b></p>`;
    } else {
        x1 = ravno - kof;
        x2 = (-ravno) - kof;
        equation = `|x + ${kof}| = ${ravno}`;
        solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>Раскрываем модуль:</p>
                   <p>1) x + ${kof} = ${ravno} => x = ${ravno} - ${kof} = <b>${x1}</b></p>
                   <p>2) x + ${kof} = -${ravno} => x = -${ravno} - ${kof} = <b>${x2}</b></p>`;
    }
    
    return {
        eqHTML: `<p>${equation}</p>`,
        answers: [x1, x2],
        ansHTML: `<p>x₁ = ${x1}&nbsp;&nbsp;&nbsp;&nbsp;x₂ = ${x2}</p>`,
        solHTML: solHTML
    };
}

function module_on(x1, x2) {
    let a = 1, b = -(x1 + x2), c = x1 * x2;
    let eq = `|${kvad_format(a, b, c)}| = 0`;
    
    let solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Модуль равен нулю, только если подмодульное выражение равно нулю:</p>
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
            let x1 = Random(-15, 15);
            let x2 = Random(-15, 15);
            data = module_on(x1, x2);
        } else {
            let random = Random(0, 1);
            let kof = Random(1, 9);
            let ravno = Random(1, 9);
            data = module_off(kof, ravno, random);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
