
var on_off = 0;

const trigVals = [
    { val: "0", display: "0", arcsin: "pi*k", arccos: "pi/2 + pi*k", arctg: "pi*k" },
    { val: "1/2", display: "1/2", arcsin: "(-1)^k * pi/6 + pi*k", arccos: "±pi/3 + 2*pi*k", arctg: "N/A" },
    { val: "sqrt(2)/2", display: "√2/2", arcsin: "(-1)^k * pi/4 + pi*k", arccos: "±pi/4 + 2*pi*k", arctg: "N/A" },
    { val: "sqrt(3)/2", display: "√3/2", arcsin: "(-1)^k * pi/3 + pi*k", arccos: "±pi/6 + 2*pi*k", arctg: "N/A" },
    { val: "1", display: "1", arcsin: "pi/2 + 2*pi*k", arccos: "2*pi*k", arctg: "pi/4 + pi*k" },
    { val: "-1/2", display: "-1/2", arcsin: "(-1)^(k+1) * pi/6 + pi*k", arccos: "±2*pi/3 + 2*pi*k", arctg: "N/A" },
    { val: "-sqrt(2)/2", display: "-√2/2", arcsin: "(-1)^(k+1) * pi/4 + pi*k", arccos: "±3*pi/4 + 2*pi*k", arctg: "N/A" },
    { val: "-sqrt(3)/2", display: "-√3/2", arcsin: "(-1)^(k+1) * pi/3 + pi*k", arccos: "±5*pi/6 + 2*pi*k", arctg: "N/A" },
    { val: "-1", display: "-1", arcsin: "-pi/2 + 2*pi*k", arccos: "pi + 2*pi*k", arctg: "-pi/4 + pi*k" },
    { val: "sqrt(3)", display: "√3", arcsin: "N/A", arccos: "N/A", arctg: "pi/3 + pi*k" },
    { val: "-sqrt(3)", display: "-√3", arcsin: "N/A", arccos: "N/A", arctg: "-pi/3 + pi*k" },
    { val: "sqrt(3)/3", display: "√3/3", arcsin: "N/A", arccos: "N/A", arctg: "pi/6 + pi*k" },
    { val: "-sqrt(3)/3", display: "-√3/3", arcsin: "N/A", arccos: "N/A", arctg: "-pi/6 + pi*k" }
];

function trig_off() {
    let funcs = ["sin(x)", "cos(x)", "tg(x)"];
    let fIdx = Random(0, 2);
    let func = funcs[fIdx];

    let validVals = trigVals.filter(v => {
        if (fIdx === 0) return v.arcsin !== "N/A";
        if (fIdx === 1) return v.arccos !== "N/A";
        if (fIdx === 2) return v.arctg !== "N/A";
        return false;
    });

    let vIdx = Random(0, validVals.length - 1);
    let val = validVals[vIdx];

    let eq = `${func} = ${val.display}`;
    let ansStr = fIdx === 0 ? val.arcsin : (fIdx === 1 ? val.arccos : val.arctg);

    let solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Это табличное значение.</p>
                   <p><b>x = ${ansStr.replace('pi', 'π').replace('pi', 'π').replace('pi', 'π')}</b></p>`;

    return {
        eqHTML: `<p>${eq}</p>`,
        answers: [ansStr], // Строковый ответ
        ansHTML: `<p>x = ${ansStr.replace('pi', 'π').replace('pi', 'π').replace('pi', 'π')}</p>`,
        solHTML: solHTML
    };
}

function trig_on() {
    // Простое сведение к замене
    let funcs = ["sin", "cos"];
    let fIdx = Random(0, 1);
    let func = funcs[fIdx];

    let validVals = trigVals.filter(v => fIdx === 0 ? v.arcsin !== "N/A" : v.arccos !== "N/A");

    // Выбираем корень t1
    let val1 = validVals[Random(0, validVals.length - 1)];
    // Выбираем второй корень t2 (специально берем "плохой", чтобы он отсеялся)
    let badVals = [2, -2, 3, -3];
    let t2 = badVals[Random(0, 3)];

    // (t - t1)(t - t2) = t^2 - (t1+t2)t + t1*t2 = 0
    // Для простоты, мы просто генерируем текст уравнения

    let eq = `(${func}(x) - ${val1.display})(${func}(x) - ${t2}) = 0`;

    let ansStr = fIdx === 0 ? val1.arcsin : val1.arccos;

    let solHTML = `<p>Исходное уравнение: <b>${eq}</b></p>
                   <p>Произведение равно нулю, если хотя бы один из множителей равен нулю.</p>
                   <p>1) ${func}(x) - ${t2} = 0 => ${func}(x) = ${t2}. Нет решений, так как область значений [-1; 1].</p>
                   <p>2) ${func}(x) - ${val1.display} = 0 => ${func}(x) = ${val1.display}.</p>
                   <p>Решаем базовое тригонометрическое уравнение:</p>
                   <p><b>x = ${ansStr.replace('pi', 'π').replace('pi', 'π').replace('pi', 'π')}</b></p>`;

    return {
        eqHTML: `<p>${eq}</p>`,
        answers: [ansStr],
        ansHTML: `<p>x = ${ansStr.replace('pi', 'π').replace('pi', 'π').replace('pi', 'π')}</p>`,
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
            data = trig_on();
        } else {
            data = trig_off();
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
