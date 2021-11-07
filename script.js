let game = document.getElementById('game');
let field = game.querySelector('.field');
let items = field.querySelectorAll('.item');
let itemsWithoutImages = Array.from(items);
let images = [
    'images/bug.svg',
    'images/cat.svg',
    'images/crab.svg',
    'images/dog.svg',
    'images/jaguar.svg',
    'images/ox.svg',
    'images/panda.svg',
    'images/unicorn.svg',
];

images.forEach(function (imagePath) {
    let item1 = getItemWithoutImage();

    addImageToItem(item1, imagePath);

    let item2 = getItemWithoutImage();

    addImageToItem(item2, imagePath);
});

let gameStart = false,
    firstItem = null,
    winsCounter = localStorage.getItem('results_count') || 0;


if (winsCounter > 0) {
    let result = document.querySelector('.results');
    result.innerHTML = winsCounter;
}

function formatSeconds(seconds) {
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    if (hours <= 9) {
        hours = '0' + hours;
    }

    if (minutes <= 9) {
        minutes = '0' + minutes;
    }

    if (seconds <= 9) {
        seconds = '0' + seconds;
    }
    
    return hours + ':' + minutes + ':' + seconds;
}

if (localStorage.getItem('best_time') > 0) {
    let bestTimeResult = document.querySelector('.best-time-result');

    bestTimeResult.innerHTML = formatSeconds(localStorage.getItem('best_time'));
}


items.forEach(function (item) {
    item.addEventListener('click', function () {
        console.log('---------------------------')

        if (item.classList.contains('show')) {
            return;
        }

        if (gameStart === false) {
            gameStart = true;
            startTimer();
        }

        item.classList.add('show');

        console.log(firstItem)

        if (!firstItem) {
            // первый клик
            console.log('Это первый клик!');
            firstItem = item;
        } else {
            // второй клик
            console.log('Это второй клик!');

            if (firstItem.querySelector('img').src === item.querySelector('img').src) {
                // если совпадают картинки
                console.log('Картинки совпали');

                let itemsWhichShowCount = 0;

                items.forEach(function (itemCurrent) {
                    if (itemCurrent.classList.contains('show')) {
                        itemsWhichShowCount++;
                    }
                });

                console.log(itemsWhichShowCount);


                if (itemsWhichShowCount === 16) {
                    let result = document.querySelector('.results');
                    winsCounter++;
                    result.innerHTML = winsCounter;
                    localStorage.setItem('results_count', winsCounter);

                    let gameTime = second + minute * 60 + hour * 60 * 60;

                    let bestTimeResult = document.querySelector('.best-time-result');

                    if (localStorage.getItem('best_time') != null) {
                        if (gameTime < localStorage.getItem('best_time')) {
                            localStorage.setItem('best_time', gameTime);
                            bestTimeResult.innerHTML = formatSeconds(gameTime);
                        }
                    } else {
                        localStorage.setItem('best_time', gameTime);
                        bestTimeResult.innerHTML = formatSeconds(gameTime);
                    }

                    setTimeout(function () {
                        alert('Вы выиграли за ' + getTimerTime());
                        reset();
                    }, 100);
                }
            } else {
                // если не совпадают картинки
                console.log('Картинки не совпали');

                let tmpFirstItem = firstItem;

                setTimeout(function () {
                    item.classList.remove('show');
                    tmpFirstItem.classList.remove('show');
                }, 1000);
            }


            // это всегда в самом конце второго клика
            firstItem = null;
        }
    });
});


function addImageToItem(item, imagePath) {
    let image = document.createElement('img');
    image.src = imagePath;

    item.appendChild(image);
}

function getItemWithoutImage() {
    let key = Math.floor(Math.random() * itemsWithoutImages.length);

    let item = itemsWithoutImages[key];

    itemsWithoutImages.splice(key, 1);

    return item;
}

function reset() {
    items.forEach(function (itemCurrent) {
        itemCurrent.classList.remove('show');
    });

    gameStart = false;
    firstItem = null;

    field.innerHTML = '';

    stopTimer();
    clearTimer();

    items = shuffle(Array.from(items));

    items.forEach(function (item) {
        field.appendChild(item);
    });
}

let button = document.querySelector('button');

button.addEventListener('click', reset);

function shuffle(arr) {
    return arr.sort(() => Math.round(Math.random() * 100) - 50);
}

/**
 * Доработки
 * Доработки
 * 3) Сохранять топ время прохождения игры
 */

// 1. Game wins


// 2. Timer
const timer = document.querySelector('.timer');


// Listeners

// button.addEventListener('click', startTimer);

// Viriables

let hour = '0',
    minute = '0',
    second = '0',
    millisecond = '0',
    interval;

function startTimer() {
    clearInterval(interval);
    interval = setInterval(startTimerInterval, 10);
}

function stopTimer() {
    clearInterval(interval);
}


function clearTimer() {
    hour = '0';
    minute = '0';
    second = '0';
    millisecond = '0';
    timer.textContent = '00:00:00';
}

function startTimerInterval() {
    millisecond++;

    timer.textContent = getTimerTime();
}


function getTimerTime() {
    let hourFormat = '',
        minuteFormat = '',
        secondFormat = '';

    // Milliseconds
    if (millisecond > 99) {
        second++;
        millisecond = 0;
    }

    // Second

    if (second <= 9) {
        secondFormat = '0' + second;
    }
    if (second > 9) {
        secondFormat = second;
    }

    if (second > 59) {
        minute++;
        minuteFormat = '0' + minute;
        second = 0;
        secondFormat = '0' + second;
    }

    // Minutes

    if (minute <= 9) {
        minuteFormat = '0' + minute;
    }

    if (minute > 9) {
        minuteFormat = minute;
    }

    if (minute > 59) {
        hour++;
        hourFormat = '0' + hour;
        minute = 0;
        hourFormat = '0' + minute;
    }

    // Hours

    if (hour <= 9) {
        hourFormat = '0' + hour;
    }

    if (hour > 9) {
        hourFormat = hour;
    }

    return hourFormat + ':' + minuteFormat + ':' + secondFormat;
}


let b = [3, 2, 6, 2, -7, -23];
let c = [-48, -38, -93, -38];

console.log(Math.min.apply(null, [1, 2, -3]));
console.log(Math.min(1, 2, 3, 4, 5));
console.log(Math.min(...b));