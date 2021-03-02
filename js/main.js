var pokemonAmount = 151;
var rightAnswer = false;
var currentID = 0;
var pokemonName = null;
var randomIDList = shuffle(1, pokemonAmount);
var userScore = 0;
var intervalIDUserTimer = null;
var intervalIDFiveSecondTimer = null;
var time = null;
var timePicked = null;
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
var $oneMinLeaderboard = document.querySelector('.one-min-lb');
var $fiveMinLeaderboard = document.querySelector('.five-min-lb');
var $tenMinLeaderboard = document.querySelector('.ten-min-lb');
var $twentyMinLeaderboard = document.querySelector('.twenty-min-lb');
var $oneMinLBDataList = $oneMinLeaderboard.querySelectorAll('td');
var $fiveMinLBDataList = $fiveMinLeaderboard.querySelectorAll('td');
var $tenMinLBDataList = $tenMinLeaderboard.querySelectorAll('td');
var $twentyMinLBDataList = $twentyMinLeaderboard.querySelectorAll('td');

$answerBox.addEventListener('input', correctPokemon);
$skipButton.addEventListener('click', skipPokemon);
$dropboxHead.addEventListener('click', showChoices);
$dropbox.addEventListener('click', timeChoice);
$goButton.addEventListener('click', startQuiz);
$viewLBButton.addEventListener('click', showLeaderboard);
$viewHomeButton.addEventListener('click', showHome);
addEventListener('load', loadScores);


function sortScores(array) {

  var sortedArray = array.sort(function(a, b) {
    return b - a;
  });
  return sortedArray;
}


function loadScores() {
  var oneMinScores = sortScores(scores.quizType.default.oneMin);
  var fiveMinScores = sortScores(scores.quizType.default.fiveMin);
  var tenMinScores = sortScores(scores.quizType.default.tenMin);
  var twentyMinScores = sortScores(scores.quizType.default.twentyMin);
  for (var i = 0; i < $oneMinLBDataList.length; i++) {
    if (oneMinScores[i] !== undefined) {
      $oneMinLBDataList[i].textContent = oneMinScores[i] + '/' + pokemonAmount;
    }
  }
  for (var i = 0; i < $fiveMinLBDataList.length; i++) {
    if (fiveMinScores[i] !== undefined) {
      $fiveMinLBDataList[i].textContent = fiveMinScores[i] + '/' + pokemonAmount;
    }
  }
  for (var i = 0; i < $tenMinLBDataList.length; i++) {
    if (tenMinScores[i] !== undefined) {
      $tenMinLBDataList[i].textContent = tenMinScores[i] + '/' + pokemonAmount;
    }
  }
  for (var i = 0; i < $twentyMinLBDataList.length; i++) {
    if (twentyMinScores[i] !== undefined) {
      $twentyMinLBDataList[i].textContent = twentyMinScores[i] + '/' + pokemonAmount;
    }
  }
}


function showChoices() {
  $dropbox.className = 'dropbox';
}

function timeChoice(event) {
  if (event.target.tagName === 'LI') {
    time = parseInt(event.target.value);
    timePicked = time;
    $dropboxHead.textContent = time + ' minutes';
    $dropbox.className = 'dropbox hidden';
    $goButton.className = 'button-start';
  }
}

function startQuiz() {
  $homeContainer.className = 'container home hidden';
  $quizContainer.className = 'container quiz';
  $oneMinLeaderboard.className = 'one-min-lb hidden';
  $fiveMinLeaderboard.className = 'five-min-lb hidden';
  $tenMinLeaderboard.className = 'ten-min-lb hidden';
  $twentyMinLeaderboard.className = 'twenty-min-lb hidden';
  intervalIDFiveSecondTimer = setInterval(countDown5Second, 1000);
}

function countDown5Second() {
  imgSeconds--;
  $fiveSecondTimer.textContent = imgSeconds;
  if (imgSeconds < 0) {
    $timer.textContent = time + ':00';
    time = time - 1;
    intervalIDUserTimer = setInterval(countDownQuiz, 1000);
    getPokemon();
    $fiveSecondTimer.className = 'five-second-timer hidden'
    $answerBox.className = 'answer input';
    $skipButton.className = 'button-skip';
    $pokemonImg.className = 'pokemon-img';
    $timer.className = 'timer';
    clearInterval(intervalIDFiveSecondTimer);
  }
}

function submitQuiz() {

  switch (timePicked) {
    case 1:
      scores.quizType.default.oneMin.push(userScore);
      $oneMinLeaderboard.className = 'one-min-lb'
      break;
    case 5:
      scores.quizType.default.fiveMin.push(userScore);
      $fiveMinLeaderboard.className = 'five-min-lb'
      break;
    case 10:
      scores.quizType.default.tenMin.push(userScore);
      $tenMinLeaderboard.className = 'ten-min-lb'
      break;
    case 20:
      scores.quizType.default.twentyMin.push(userScore);
      $twentyMinLeaderboard.className = 'twenty-min-lb'
      break;
    default:
      console.log('incorrect time slot');
  }
  console.log(scores.quizType.default);

  $quizContainer.className = 'container quiz hidden';
  $leaderboardContainer.className = 'container leaderboard';
  $pokemonImg.className = 'pokemon-img hidden';
  $fiveSecondTimer.className = 'five-second-timer';
  $timer.className = 'timer hidden';
  $answerBox.className = 'answer input hidden';
  $skipButton.className = 'button-skip hidden';
  $fiveSecondTimer.textContent = 5;
  $answerBox.value = null;
  $pokemonImg.setAttribute('src', null);
  $dropboxHead.textContent = 'Choose the time';

  time = null;
  timePicked = null;
  randomIDList = shuffle(1, pokemonAmount);
  currentID = 0;
  rightAnswer = false;
  pokemonName = null;
  userScore = 0;
  intervalIDUserTimer = null;
  intervalIDFiveSecondTimer = null;
  seconds = 59;
  imgSeconds = 5;
  loadScores();
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
    time = null;
    submitQuiz();
  }
}

function getPokemon() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomIDList[currentID]);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    if (xhr.status !== 200 && userScore !== randomIDList.length) {
      console.log('INVALID POKEMON ID')
    }

    if (userScore === randomIDList.length) {
      clearInterval(intervalIDUserTimer);
      submitQuiz();
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
  console.log(pokemonName);

  if (guess === pokemonName) {
    userScore++;
    currentID++;
    getPokemon();
    event.target.value = null;
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
  $oneMinLeaderboard.className = 'one-min-lb';
}

function showHome() {
  $homeContainer.className = 'container home';
  $leaderboardContainer.className = 'container leaderboard hidden';
}
