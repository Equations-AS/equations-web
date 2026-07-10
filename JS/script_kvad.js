
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
    
    return eq + " = 0";
}

function kvad_off(x1, x2) {
    let a = 1;
    let b = -(x1 + x2);
    let c = x1 * x2;
    
    let equation = kvad_format(a, b, c);

    let solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>Используем теорему Виета:</p>
                   <p>x₁ + x₂ = ${-b}</p>
                   <p>x₁ * x₂ = ${c}</p>
                   <p>Отсюда корни: <b>x₁ = ${x1}, x₂ = ${x2}</b></p>`;

    return {
        eqHTML: `<p>${equation}</p>`,
        answers: [x1, x2],
        ansHTML: `<p>x₁ = ${x1}&nbsp;&nbsp;&nbsp;&nbsp;x₂ = ${x2}</p>`,
        solHTML: solHTML
    };
}

function kvad_on(x1, x2) {
    let k = Random(2, 4);
    let a = k;
    let b = -k * (x1 + x2);
    let c = k * x1 * x2;
    
    let equation = kvad_format(a, b, c);

    let D = b*b - 4*a*c;

    let solHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                   <p>Найдем дискриминант: D = b² - 4ac = (${b})² - 4*(${a})*(${c}) = ${b*b} - ${4*a*c} = ${D}</p>
                   <p>√D = ${Math.sqrt(D)}</p>
                   <p>x₁,₂ = (-b ± √D) / 2a = (${-b} ± ${Math.sqrt(D)}) / ${2*a}</p>
                   <p><b>x₁ = ${x1}, x₂ = ${x2}</b></p>`;

    return {
        eqHTML: `<p>${equation}</p>`,
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
            let x1 = Random(-20, 20);
            let x2 = Random(-20, 20);
            data = kvad_on(x1, x2);
        } else {
            let x1 = Random(-8, -1);
            let x2 = Random(1, 8);
            data = kvad_off(x1, x2);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
