
var on_off = 0;

function line_off(x) {
    let equation;
    let random = Random(0, 1);
    let ans;
    let solutionHTML;

    if (random == 0) {
        equation = 'x - ' + x + ' = 0';
        ans = [x];
        solutionHTML = `<p>Исходное уравнение: <b>x - ${x} = 0</b></p>
                        <p>Перенесем известное в правую часть: <b>x = ${x}</b></p>`;
    } else {
        equation = 'x + ' + x + ' = 0';
        ans = [-x];
        solutionHTML = `<p>Исходное уравнение: <b>x + ${x} = 0</b></p>
                        <p>Перенесем известное в правую часть: <b>x = ${-x}</b></p>`;
    }

    return {
        eqHTML: `<p>${equation}</p>`,
        answers: ans,
        ansHTML: `<p>x = ${ans[0]}</p>`,
        solHTML: solutionHTML
    };
}

function line_on(x) {
    let peremen1 = Random(1, 20);
    let peremen2 = Random(1, 10);
    let peremen3 = Random(2, 10);

    let otvet1 = (Number(peremen1) + Number(x)) / (Number(peremen3) + Number(peremen2));

    while (otvet1 % 1 != 0) {
        x = Random(1, 100);
        otvet1 = (Number(peremen1) + Number(x)) / (Number(peremen3) + Number(peremen2));
    }

    let equation = peremen3 + 'x - ' + peremen1 + ' + ' + peremen2 + 'x - ' + x + ' = 0';
    let ans = [otvet1];

    let solutionHTML = `<p>Исходное уравнение: <b>${equation}</b></p>
                        <p>Сгруппируем слагаемые с x: <b>(${peremen3} + ${peremen2})x = ${peremen3 + peremen2}x</b></p>
                        <p>Сгруппируем числа: <b>-${peremen1} - ${x} = -${peremen1 + x}</b></p>
                        <p>Получаем: <b>${peremen3 + peremen2}x - ${peremen1 + x} = 0</b></p>
                        <p>Переносим число вправо: <b>${peremen3 + peremen2}x = ${peremen1 + x}</b></p>
                        <p>Делим на коэффициент при x: <b>x = ${peremen1 + x} / ${peremen3 + peremen2} = ${ans[0]}</b></p>`;

    return {
        eqHTML: `<p>${equation}</p>`,
        answers: ans,
        ansHTML: `<p>x = ${ans[0]}</p>`,
        solHTML: solutionHTML
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
        var x = Random(1, 20);
        let data;
        if (on_off == 1) {
            data = line_on(x);
        } else {
            data = line_off(x);
        }

        urovnenie.innerHTML = data.eqHTML;
        setEquationData(data.answers, data.ansHTML, data.solHTML);
    }
}
