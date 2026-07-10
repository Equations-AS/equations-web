
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

function log_off(osnov) {
    let random = Random(0, 1);
    let ravno, otvet, equation, solHTML;

    if (random == 0) {
        ravno = Random(1, 3);
        otvet = Math.pow(osnov, ravno);
        equation = `log<sub>x</sub>(${otvet}) = ${ravno}`;
        solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>По определению логарифма: x<sup>${ravno}</sup> = ${otvet}</p>
                   <p>x = <sup>${ravno}</sup>√${otvet} = <b>${osnov}</b></p>`;
    } else {
        ravno = Random(-3, -1);
        let val = Math.pow(osnov, -ravno);
        equation = `log<sub>x</sub>(<sup>1</sup>/<sub>${val}</sub>) = ${ravno}`;
        solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>По определению логарифма: x<sup>${ravno}</sup> = 1/${val}</p>
                   <p>x = <b>${osnov}</b></p>`;
    }

    return {
        eqHTML: `<p>${equation}</p>`,
        answers: [osnov],
        ansHTML: `<p>x = ${osnov}</p>`,
        solHTML: solHTML
    };
}

function log_on(x1, x2) {
    let random = Random(0, 1); // Упростил для стабильности генерации и решения
    let osnov = Random(2, 20);
    let a = 1, b = -(x1 + x2), c = x1 * x2;
    let eq, eqRight, solHTML;

    if (random == 0) {
        c += 1;
        let pod_log = kvad_format(a, b, c);
        eq = `log<sub>${osnov}</sub>(${pod_log}) = 0`;
        solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>По определению: ${pod_log} = ${osnov}<sup>0</sup></p>
                   <p>${pod_log} = 1</p>
                   <p>${kvad_format(a, b, c - 1)} = 0</p>
                   <p>Корни квадратного уравнения: <b>x₁ = ${x1}, x₂ = ${x2}</b></p>`;
    } else {
        let p1 = Random(1, 10);
        c += p1;
        let pod_log = kvad_format(a, b, c);
        eq = `log<sub>${osnov}</sub>(${pod_log}) = log<sub>${osnov}</sub>(${p1})`;
        solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Так как основания равны, приравниваем аргументы:</p>
                   <p>${pod_log} = ${p1}</p>
                   <p>${kvad_format(a, b, c - p1)} = 0</p>
                   <p>Корни квадратного уравнения: <b>x₁ = ${x1}, x₂ = ${x2}</b></p>`;
    }

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
            data = log_on(x1, x2);
        } else {
            let osnov = Random(2, 10);
            data = log_off(osnov);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
