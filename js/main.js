var rightAnswer = false;
var currentID = 0;
var pokemonName = null;
var randomIDList = shuffle(1, 10);
var intervalIDUserTimer = null;
var intervalIDFiveSecondTimer = null;
var time = null;
var seconds = 59;
var imgSeconds = 5;
var $pokemonImg = document.querySelector('.pokemon-img');
var $answerBox = document.querySelector('.answer');
var $skipButton = document.querySelector('.button-skip');
var $homeContainer = document.querySelector('.home');
var $quizContainer = document.querySelector('.quiz');
var $leaderboardContainer = document.querySelector('.leaderboard')
var $timer = document.querySelector('.timer');
var $fiveSecondTimer = document.querySelector('.five-second-timer');
var $dropboxHead = document.querySelector('.dropbox-head');
var $dropbox = document.querySelector('.dropbox');
var $goButton = document.querySelector('.button-start');
var $viewLBButton = document.querySelector('.view-lb');
var $viewHomeButton = document.querySelector('.view-home');

$answerBox.addEventListener('keydown', getNextPokemon);
$answerBox.addEventListener('input', correctPokemon);
$skipButton.addEventListener('click', skipPokemon);
$dropboxHead.addEventListener('click', showChoices);
$dropbox.addEventListener('click', timeChoice);
$goButton.addEventListener('click', startQuiz);
$viewLBButton.addEventListener('click', showLeaderboard);
$viewHomeButton.addEventListener('click', showHome);


function showChoices() {
  $dropbox.className = 'dropbox';
}

function timeChoice(event) {
  if (event.target.tagName === 'LI') {
    time = parseInt(event.target.value);
    $dropbox.className = 'dropbox hidden';
    $goButton.className = 'button-start';
  }
}

function startQuiz() {
  $homeContainer.className = 'container home hidden';
  $quizContainer.className = 'container quiz';
  intervalIDFiveSecondTimer = setInterval(countDown5Second, 1000);
}


function countDown5Second() {
  imgSeconds--;
  $fiveSecondTimer.textContent = imgSeconds;
  if (imgSeconds <= 0) {
    $timer.textContent = time + ':00';
    time = time - 1;
    intervalIDUserTimer = setInterval(countDownQuiz, 1000);
    getPokemon();
    $fiveSecondTimer.className = 'five-second-timer hidden'
    $answerBox.className = 'answer input';
    $skipButton.className = 'button-skip';
    clearInterval(intervalIDFiveSecondTimer);
    imgSeconds = 5;
  }
}

function countDownQuiz() {
  if (seconds < 0) {
    time--
    seconds = 59;
  }
  if (seconds < 10 && seconds >= 0) {
    $timer.textContent = time + ':0' + seconds
  } else {
    $timer.textContent = time + ':' + seconds
  }
  seconds--;
  if (time < 0) {
    clearInterval(intervalIDUserTimer);
    $quizContainer.className = 'container quiz hidden';
  }
}


function getPokemon() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomIDList[currentID]);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status !== 200) {
    console.log('INVALID POKEMON ID')
    }

    $pokemonImg.setAttribute('src', xhr.response.sprites.front_default);

    pokemonName = xhr.response.species.name;
    if (pokemonName === 'nidoran-f' || pokemonName === 'nidoran-m') {
      pokemonName = 'nidoran';
    }
    console.log(pokemonName);

  });
  xhr.send();
}

function correctPokemon(event) {
  var guess = event.target.value;
  guess = guess.toLowerCase();
  console.log(guess);
  console.log(pokemonName);

  if (guess === pokemonName) {
    rightAnswer = true;
    $answerBox.className = 'answer input right';
  }
}

function getNextPokemon(event) {
  if (rightAnswer && event.key === 'Enter') {
    currentID++;
    getPokemon();
    rightAnswer = false;
    event.target.value = null;
    $answerBox.className = 'answer input';
  }
}

function shuffle(min, max) {
  var array = [];
  for (min; min <= max; min++) {
    array.push(min);
  }
  var i = array.length;
  var randomVal = 0;
  var hold;

  while (i--) {
    randomVal = Math.floor(Math.random() * (i + 1));

    hold = array[i];
    array[i] = array[randomVal];
    array[randomVal] = hold;
  }
  return array;
}

function skipPokemon() {
  var switchID = randomIDList.splice(currentID, 1);
  randomIDList.push(switchID[0]);
  $answerBox.value = null;
  getPokemon();
}

function showLeaderboard() {
  $homeContainer.className = 'container home hidden';
  $leaderboardContainer.className = 'container leaderboard';
}

function showHome() {
  $homeContainer.className = 'container home';
  $leaderboardContainer.className = 'container leaderboard hidden';
}
