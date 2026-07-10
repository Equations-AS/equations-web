
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

function line_format(root) {
    if (root > 0) return `(x - ${root})`;
    if (root < 0) return `(x + ${-root})`;
    return `x`;
}

function drob_off(x1, x2) {
    let eq1 = line_format(x1);
    let eq2 = line_format(x2);
    
    let eqHTML = `<div style="text-align:center;">
                    <div style="border-bottom: 1px solid black; display: inline-block; padding: 0 10px;">${eq1}</div>
                    <br>
                    <div style="display: inline-block; padding: 0 10px;">${eq2}</div>
                    <span style="vertical-align: 15px;"> = 0</span>
                  </div>`;

    let solHTML = `<p>Дробь равна нулю, когда числитель равен нулю, а знаменатель не равен нулю.</p>
                   <p>Числитель: ${eq1} = 0 => <b>x = ${x1}</b></p>
                   <p>Знаменатель: ${eq2} ≠ 0 => x ≠ ${x2}</p>
                   <p>Корень числителя не совпадает с выколотой точкой. Значит ответ: <b>x = ${x1}</b></p>`;

    return {
        eqHTML: eqHTML,
        answers: [{type: 'drob_off', x1: x1, x2: x2}],
        ansHTML: `<p>x = ${x1}&nbsp;&nbsp;&nbsp;&nbsp;(x ≠ ${x2})</p>`,
        solHTML: solHTML
    };
}

function drob_on(x1, x2, x3) {
    let num_eq = kvad_format(1, -(x1 + x2), x1 * x2);
    let den_eq = line_format(x3);
    
    let eqHTML = `<div style="text-align:center;">
                    <div style="border-bottom: 1px solid black; display: inline-block; padding: 0 10px;">${num_eq}</div>
                    <br>
                    <div style="display: inline-block; padding: 0 10px;">${den_eq}</div>
                    <span style="vertical-align: 15px;"> = 0</span>
                  </div>`;

    let solHTML = `<p>Дробь равна нулю, когда числитель равен нулю, а знаменатель не равен нулю.</p>
                   <p>Числитель: ${num_eq} = 0 => Корни <b>x₁ = ${x1}, x₂ = ${x2}</b></p>
                   <p>Знаменатель: ${den_eq} ≠ 0 => <b>x ≠ ${x3}</b></p>
                   <p>Оба корня не совпадают с выколотой точкой. Ответ: <b>x₁ = ${x1}, x₂ = ${x2}</b></p>`;

    return {
        eqHTML: eqHTML,
        answers: [{type: 'drob_on', x1: x1, x2: x2, x3: x3}],
        ansHTML: `<p>x₁ = ${x1}&nbsp;&nbsp;&nbsp;&nbsp;x₂ = ${x2}&nbsp;&nbsp;&nbsp;&nbsp;(x ≠ ${x3})</p>`,
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
            let x1 = Random(-10, 10);
            let x2 = Random(-10, 10);
            while (x1 === x2) x2 = Random(-10, 10);
            let x3 = Random(-10, 10);
            while (x3 === x1 || x3 === x2) x3 = Random(-10, 10);
            data = drob_on(x1, x2, x3);
        } else {
            let x1 = Random(-10, 10);
            let x2 = Random(-10, 10);
            while (x1 === x2) x2 = Random(-10, 10);
            data = drob_off(x1, x2);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
