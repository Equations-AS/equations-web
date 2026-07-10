// Глобальные переменные для хранения текущего ответа и решения
let currentAnswers = [];
let currentSolution = "";
let hasAttempted = false;

// Функция для установки новых данных уравнения (вызывается из скриптов генерации)
function setEquationData(answers, answerHTML, solutionHTML) {
    currentAnswers = answers;
    currentSolution = solutionHTML;
    hasAttempted = false;

    // Обновляем HTML ответа и решения, но скрываем их
    const otvetContent = document.getElementById('otvet_content');
    const solutionContent = document.getElementById('solution_content');

    if(otvetContent) otvetContent.innerHTML = answerHTML;
    if(solutionContent) solutionContent.innerHTML = solutionHTML;

    document.getElementById('otvet_na').classList.remove('show');
    document.getElementById('solution').classList.remove('show');

    // Сбрасываем инпуты
    const inputArea = document.getElementById('input-area');
    if (inputArea) {
        inputArea.style.display = 'block';
    }

    document.getElementById('result-message').className = 'result-message hidden';
    document.getElementById('result-message').innerText = '';

    // Скрываем кнопки
    const btnAnswer = document.getElementById('btn-show-answer');
    const btnSolution = document.getElementById('btn-show-solution');
    if (btnAnswer) btnAnswer.style.display = 'none';
    if (btnSolution) btnSolution.style.display = 'none';

    const input1 = document.getElementById('user_answer_1');
    const input2 = document.getElementById('user_answer_2');
    const label2 = document.getElementById('label_answer_2');

    if (input1) input1.value = '';
    if (input2) {
        input2.value = '';
        if (answers.length > 1) {
            input2.style.display = 'inline-block';
            if (label2) label2.style.display = 'inline-block';
        } else {
            input2.style.display = 'none';
            if (label2) label2.style.display = 'none';
        }
    }

    // Для дробных уравнений с одним корнем, но x2 это выколотая точка
    if (answers.length === 1 && typeof answers[0] === 'object' && answers[0].type === 'drob_off') {
         if (input2) {
            input2.style.display = 'none';
            if (label2) label2.style.display = 'none';
        }
    }
    if (answers.length === 2 && typeof answers[0] === 'object' && answers[0].type === 'drob_on') {
        if (input2) {
            input2.style.display = 'inline-block';
            if (label2) label2.style.display = 'inline-block';
        }
    }
}

function revealButtons() {
    hasAttempted = true;
    const btnAnswer = document.getElementById('btn-show-answer');
    const btnSolution = document.getElementById('btn-show-solution');
    if (btnAnswer) btnAnswer.style.display = 'inline-block';
    if (btnSolution) btnSolution.style.display = 'inline-block';
}

function checkAnswer() {
    const resultMsg = document.getElementById('result-message');

    if (currentAnswers.length === 0) return;
    revealButtons();

    const val1 = document.getElementById('user_answer_1') ? document.getElementById('user_answer_1').value.trim() : null;
    const val2 = document.getElementById('user_answer_2') ? document.getElementById('user_answer_2').value.trim() : null;

    // Для line
    if (document.getElementById('user_answer') && !document.getElementById('user_answer_1')) {
        const val = document.getElementById('user_answer').value.trim();
        if (val === '') {
            showResult(resultMsg, false, "Введите ответ.");
            return;
        }
        if (Number(val) === Number(currentAnswers[0])) {
            showResult(resultMsg, true, "Правильно!");
        } else {
            showResult(resultMsg, false, "Неправильно. Попробуйте еще раз.");
        }
        return;
    }

    // Для дробных (особая проверка)
    if (typeof currentAnswers[0] === 'object' && currentAnswers[0].type === 'drob_off') {
        if (val1 === '') {
            showResult(resultMsg, false, "Введите ответ.");
            return;
        }
        if (Number(val1) === Number(currentAnswers[0].x1)) {
             showResult(resultMsg, true, "Правильно!");
        } else {
             showResult(resultMsg, false, "Неправильно. Попробуйте еще раз.");
        }
        return;
    }

    if (typeof currentAnswers[0] === 'object' && currentAnswers[0].type === 'drob_on') {
         if (val1 === '' || val2 === '') {
            showResult(resultMsg, false, "Введите оба ответа.");
            return;
        }
        const u1 = Number(val1);
        const u2 = Number(val2);
        const a1 = Number(currentAnswers[0].x1);
        const a2 = Number(currentAnswers[0].x2);

        if ((u1 === a1 && u2 === a2) || (u1 === a2 && u2 === a1)) {
            showResult(resultMsg, true, "Правильно!");
        } else {
            showResult(resultMsg, false, "Неправильно. Попробуйте еще раз.");
        }
        return;
    }

    // Обычная проверка
    if (currentAnswers.length === 1) {
        if (val1 === '') {
            showResult(resultMsg, false, "Введите ответ.");
            return;
        }
        if (Number(val1) === Number(currentAnswers[0])) {
            showResult(resultMsg, true, "Правильно!");
        } else {
            showResult(resultMsg, false, "Неправильно. Попробуйте еще раз.");
        }
    } else if (currentAnswers.length === 2) {
        if (val1 === '' || val2 === '') {
            showResult(resultMsg, false, "Введите оба ответа.");
            return;
        }

        const u1 = Number(val1);
        const u2 = Number(val2);
        const a1 = Number(currentAnswers[0]);
        const a2 = Number(currentAnswers[1]);

        // Порядок не важен
        if ((u1 === a1 && u2 === a2) || (u1 === a2 && u2 === a1)) {
            showResult(resultMsg, true, "Правильно!");
        } else {
            showResult(resultMsg, false, "Неправильно. Попробуйте еще раз.");
        }
    }
}

function showResult(el, isCorrect, msg) {
    el.innerText = msg;
    el.className = 'result-message ' + (isCorrect ? 'result-correct' : 'result-incorrect');
}

function toggleAnswer() {
    if (!hasAttempted) return;
    const el = document.getElementById('otvet_na');
    if (el) el.classList.toggle('show');
}

function toggleSolution() {
    if (!hasAttempted) return;
    const el = document.getElementById('solution');
    if (el) el.classList.toggle('show');
}

// Utility:
function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
