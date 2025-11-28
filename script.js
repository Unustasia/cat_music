// Здесь можно добавить интерактивность позже
// Например, плавный скролл или анимацию
console.log("Сайт загружен!");
const cat = document.getElementById('cat');

// Пути к изображениям
const sleepImg = 'cat-sleep.png';     // ваше изображение спящего кота
const awakeImg = 'cat-awake.png';   // ваше изображение проснувшегося кота


cat.addEventListener('mouseenter', () => {
  cat.src = awakeImg;
});

cat.addEventListener('mouseleave', () => {
  cat.src = sleepImg;
});


// Объект с путями к аудиофайлам (положите файлы в ту же папку)
const audioFiles = {
  'C': 'c.mp3',
  'C#': 'c_sharp.mp3',
  'D': 'd.mp3',
  'D#': 'd_sharp.mp3',
  'E': 'e.mp3',
  'F': 'f.mp3',
  'F#': 'f_sharp.mp3',
  'G': 'g.mp3',
  'G#': 'g_sharp.mp3',
  'A': 'a.mp3',
  'A#': 'a_sharp.mp3',
  'B': 'b.mp3'
};

// Создаём аудио-объекты для каждой ноты
const audioElements = {};
Object.keys(audioFiles).forEach(note => {
  audioElements[note] = new Audio(audioFiles[note]);
});

// Функция воспроизведения ноты
function playNote(note) {
  const audio = audioElements[note];
  if (audio) {
    audio.currentTime = 0; // Возвращаем в начало
    audio.play();
  }
}

// Обработчик клика по клавишам пианино
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('mousedown', () => {
    const note = key.getAttribute('data-note');
    playNote(note);
    key.classList.add('active');
  });

  key.addEventListener('mouseup', () => {
    key.classList.remove('active');
  });

  // Для сенсорных устройств
  key.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Убираем стандартное поведение тач-события
    const note = key.getAttribute('data-note');
    playNote(note);
    key.classList.add('active');
  });

  key.addEventListener('touchend', () => {
    key.classList.remove('active');
  });
});

// Управление с клавиатуры компьютера
document.addEventListener('keydown', (e) => {
  // Маппинг клавиш клавиатуры на ноты (пример для QWERTY)
  const keyMap = {
    'Q': 'C',
    '2': 'C#',
    'W': 'D',
    '3': 'D#',
    'E': 'E',
    'R': 'F',
    '5': 'F#',
    'T': 'G',
    '6': 'G#',
    'Y': 'A',
    '7': 'A#',
    'U': 'B'
  };

  const note = keyMap[e.key.toUpperCase()];
  if (note) {
    playNote(note);
    // Визуальная обратная связь: подсвечиваем клавишу
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    if (keyElement) {
      keyElement.classList.add('active');
    }
  }
});

document.addEventListener('keyup', () => {
  // Убираем подсветку всех клавиш
  document.querySelectorAll('.key').forEach(key => {
    key.classList.remove('active');
  });
});
