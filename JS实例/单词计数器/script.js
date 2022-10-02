//  声明变量
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// 设置按钮
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

// 单词列表
const arrWords = [
    'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// 随机单词
let randomWord;

//成绩记录
let score=0;

// 倒计时
let time=10;

// 难度选择
let difficulty=
  localStorage.getItem('difficulty')!==null
    ?localStorage.getItem('difficulty'):'medium';
    
difficultySelect.value=
  localStorage.getItem('difficulty')!==null
    ? localStorage.getItem('difficulty'):'medium';

// 聚焦文本输入框
text.focus();

// 更新时间
const timeInterval =setInterval(updateTime,1000);

// 随机单词
function getRandomWord() {
  return arrWords[Math.floor(Math.random() * arrWords.length)];
}
// 显示单词
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// 更新成绩
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// 更新时间函数
function updateTime () {
  time--;
  timeEl.innerHTML = time + 's';

  //时间为0游戏结束
  if(time===0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// 游戏结束页面
function gameOver() {
  endgameEl.innerHTML =`
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onClick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDom();

// 监听事件 输入时
text.addEventListener('input',e=>{
  const insertedText = e.target.value;

  if(insertedText===randomWord){
    addWordToDom();
    updateScore();

    e.target.value='';
    if (difficulty==='hard'){
      time+=2;
    } else if (difficulty==='medium'){
      time+=3;
    } else {
      time+=5;
    }

    updateTime();
  }
});
  

