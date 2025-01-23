function Random (min, max){ 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var rand

const btn = document.getElementById('button');
const random = document.getElementById('random');

btn.onclick = function() {
    var rand = Random(0, 6)
    if (rand == 0) {
        random.innerHTML = '<a href="/pages/line.html">Нажми</a>';
    }
    else if (rand == 1) {
        random.innerHTML = '<a href="/pages/kvad.html">Нажми</a>';
    }
    else if (rand == 2) {
        random.innerHTML = '<a href="/pages/log.html">Нажми</a>';
    }
    else if (rand == 3) {
        random.innerHTML = '<a href="/pages/module.html">Нажми</a>';
    }
    else if (rand == 4) {
        random.innerHTML = '<a href="/pages/kor.html">Нажми</a>';
    }
    else if (rand == 5) {
        random.innerHTML = '<a href="/pages/step.html">Нажми</a>';
    }
    else if (rand == 6) {
        random.innerHTML = '<a href="/pages/drob.html">Нажми</a>';
    }
}
