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
var mode = null;
var seconds = 59;
var imgSeconds = 5;
var $homeContainer = document.querySelector('.home');
var $dropboxHeadTime = document.querySelector('.dbh-time');
var $dropboxTime = document.querySelector('.db-time');
var $dropboxHeadMode = document.querySelector('.dbh-mode');
var $dropboxMode = document.querySelector('.db-mode');
var $goButton = document.querySelector('.button-start');
var $quizContainer = document.querySelector('.quiz');
var $pokemonImgContainer = document.querySelector('.img-box');
var $pokemonImg = document.querySelector('.pokemon-img');
var $pokeballSpinner = document.querySelector('.pokeball-loader');
var $scoreTracker = document.querySelector('.score-tracker');
var $answerBox = document.querySelector('.answer');
var $skipButton = document.querySelector('.button-skip');
var $abortQuizButton = document.querySelector('.button-abort-quiz');
var $abortModalContainer = document.querySelector('.abort-modal-container');
var $leaderboardContainer = document.querySelector('.leaderboard')
var $timer = document.querySelector('.timer');
var $fiveSecondTimer = document.querySelector('.five-second-timer');
var $viewLBButton = document.querySelector('.view-lb');
var $viewHomeButton = document.querySelector('.view-home');
var $leaderboardTabContainer = document.querySelector('.lb-tab-container');
var $leaderboardTabList = document.querySelectorAll('.lb-tab');
var $leaderboardSlotList = document.querySelectorAll('.lb-item');

$answerBox.addEventListener('input', correctPokemon);
$skipButton.addEventListener('click', skipPokemon);
$dropboxHeadTime.addEventListener('click', showTimeChoices);
$dropboxHeadMode.addEventListener('click', showModeChoices);
$dropboxTime.addEventListener('click', timeChoice);
$dropboxMode.addEventListener('click', modeChoice);
$goButton.addEventListener('click', startQuiz);
$viewLBButton.addEventListener('click', showLeaderboard);
$viewHomeButton.addEventListener('click', showHome);
$leaderboardTabContainer.addEventListener('click', chooseLeaderboard);
$abortQuizButton.addEventListener('click', openAbortModal);
$abortModalContainer.addEventListener('click', abortQuiz);

//takes in an array of numbers and sorts them from highest to lowest
function sortScores(array) {
  var sortedArray = array.sort(function(a, b) {
    return b - a;
  });
  return sortedArray;
}

//displays the selection of times available
function showTimeChoices() {
  if ($dropboxTime.className === 'db-time dropbox box-style hidden') {
    $dropboxTime.className = 'db-time dropbox box-style';
  } else {
    $dropboxTime.className = 'db-time dropbox box-style hidden';
  }
}

//displays the selection of modes available
function showModeChoices() {
  if ($dropboxMode.className === 'db-mode dropbox box-style hidden') {
    $dropboxMode.className = 'db-mode dropbox box-style';
  } else {
    $dropboxMode.className = 'db-mode dropbox box-style hidden';
  }
}

//asigns the selected time to the time variable for future use and allows user to
//  start the game if both time and mode are selected.
function timeChoice(event) {
  if (event.target.tagName === 'LI') {
    time = parseInt(event.target.value);
    timePicked = time;
    $dropboxHeadTime.textContent = event.target.textContent
    $dropboxTime.className = 'db-time dropbox box-style hidden';

    if (timePicked !== null && mode !== null) {
      $goButton.className = 'button-start box-style';
    }
  }
}

//asigns the selected mode to the mode variable for future use and allows user to
//  start the game if both time and mode are selected.
function modeChoice(event) {
  if (event.target.tagName === 'LI') {
    mode = event.target.textContent;
    $dropboxHeadMode.textContent = mode;
    $dropboxMode.className = 'db-mode dropbox box-style hidden';

    if (timePicked !== null && mode !== null) {
      $goButton.className = 'button-start box-style';
    }
  }
}

//hides the home screen and shows the quiz screen. starts the 5 second countdown.
function startQuiz() {
  $homeContainer.className = 'container home hidden';
  $quizContainer.className = 'container quiz';
  intervalIDFiveSecondTimer = setInterval(countDown5Second, 1000);
}

//a five second countdown that when reaches zero, displays the answer field and
//  excecutes the getPokemon function. also starts the appropriate countdown for the quiz.
function countDown5Second() {
  imgSeconds--;
  $fiveSecondTimer.textContent = imgSeconds;
  if (imgSeconds < 0) {



    $timer.textContent = time + ':00';
    time = time - 1;
    intervalIDUserTimer = setInterval(countDownQuiz, 1000);
    getPokemon();
    $fiveSecondTimer.className = 'five-second-timer hidden'
    $answerBox.className = 'answer input box-style';
    $skipButton.className = 'button-skip box-style';
    $timer.className = 'timer';
    $scoreTracker.className = 'score-tracker';
    $abortQuizButton.className = 'button-abort-quiz box-style';
    $scoreTracker.textContent = 0 + '/' + pokemonAmount;
    clearInterval(intervalIDFiveSecondTimer);
  }
}

//displays the correct time that the user chose and countsdown to zero. once it hits zero it executes the submitQuiz function.
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
    submitQuiz();
  }
}

//creates and shuffles an array with the numbers with the range of 1 to 151(all gen 1 pokemon's IDs).
//  this is used to display a different set of pokemon everytime the user enters a new quiz.
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

//fetches the pokemon from the PokeAPI with the same id as the current array index. also configures the loading spinner.
function getPokemon() {
  $pokeballSpinner.className = 'pokeball-loader'

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomIDList[currentID]);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    if (xhr.status !== 200 && userScore !== randomIDList.length) {
      console.log('INVALID POKEMON ID');
    }

    if (userScore === randomIDList.length) {
      clearInterval(intervalIDUserTimer);
      submitQuiz();
    }

    $pokeballSpinner.className = 'pokeball-loader hidden';

    if (mode === 'hard') {
      $pokemonImg.className = 'pokemon-img hard-mode';
    } else {
      $pokemonImg.className = 'pokemon-img';
    }

    $pokemonImg.setAttribute('src', xhr.response.sprites.front_default);

    pokemonName = xhr.response.species.name;
    if (pokemonName === 'nidoran-f' || pokemonName === 'nidoran-m') {
      pokemonName = 'nidoran';
    }

  });
  xhr.send();
}

//deciphers which leaderboard to add the score to, as well as to display.
//  once this is done it hides, shows, and resets values so that the next quiz
//  taken during the same session will display correctly
function submitQuiz() {

  switch (timePicked) {
    case 1:
      scores.quizType.default.oneMin.push(userScore);
      break;
    case 5:
      scores.quizType.default.fiveMin.push(userScore);
      break;
    case 10:
      scores.quizType.default.tenMin.push(userScore);
      break;
    case 20:
      scores.quizType.default.twentyMin.push(userScore);
      break;
    default:
      console.log('incorrect time slot');
  }
  interpretLeaderboard(timePicked);
  resetValues();
  $leaderboardContainer.className = 'container leaderboard';
}

//interprets whether or not the text inputed by the user is the same as the name of the pokemon at question.
//  if correct incriments score and runs the getPokemon function.
function correctPokemon(event) {
  var guess = event.target.value;
  guess = guess.toLowerCase();

  if (guess === pokemonName) {
    userScore++;
    currentID++;
    $pokemonImg.className = 'pokemon-img hidden';
    $pokemonImgContainer.className = 'img-box box-style correct-answer';
    getPokemon();
    event.target.value = null;
    $scoreTracker.textContent = userScore + '/' + pokemonAmount;

    setTimeout(function() {
      $pokemonImgContainer.className = 'img-box box-style';
    }, 1000);
  }
}

//allows the user to skip to the next pokemon with the press of a button.
//  if the user skips a pokemon, it will be added to the end of the quiz.
function skipPokemon() {
  var switchID = randomIDList.splice(currentID, 1);
  randomIDList.push(switchID[0]);
  $answerBox.value = null;
  $pokemonImg.className = 'pokemon-img hidden';
  $answerBox.focus();
  getPokemon();
}

//displays the default leaderboard of one minute high scores.
function showLeaderboard() {
  $homeContainer.className = 'container home hidden';
  $leaderboardContainer.className = 'container leaderboard';
  interpretLeaderboard(1);
}

//when the a number(1, 5, 10, or 20) depicting the time of the quiz is passed as an
//  argument, this function deactivates all current active leaderboard stats and
//  displays the correct leaderboard.
function interpretLeaderboard(time) {
  for (var i = 0; i < $leaderboardTabList.length; i++) {
    if ($leaderboardTabList[i].className === 'lb-tab lb-active') {
      $leaderboardTabList[i].className = 'lb-tab';
    }
  }
  switch (time) {
    case 1:
      $leaderboardTabList[0].className = 'lb-tab lb-active';
      var oneMinScores = sortScores(scores.quizType.default.oneMin);
      for (var i = 0; i < $leaderboardSlotList.length; i++) {
        if (oneMinScores[i] !== undefined) {
          $leaderboardSlotList[i].textContent = oneMinScores[i] + '/' + pokemonAmount;
        } else {
          $leaderboardSlotList[i].textContent = '--';
        }
      }
      break;
    case 5:
      $leaderboardTabList[1].className = 'lb-tab lb-active';
      var fiveMinScores = sortScores(scores.quizType.default.fiveMin);
      for (var i = 0; i < $leaderboardSlotList.length; i++) {
        if (fiveMinScores[i] !== undefined) {
          $leaderboardSlotList[i].textContent = fiveMinScores[i] + '/' + pokemonAmount;
        } else {
          $leaderboardSlotList[i].textContent = '--';
        }
      }
      break;
    case 10:
      $leaderboardTabList[2].className = 'lb-tab lb-active';
      var tenMinScores = sortScores(scores.quizType.default.tenMin);
      for (var i = 0; i < $leaderboardSlotList.length; i++) {
        if (tenMinScores[i] !== undefined) {
          $leaderboardSlotList[i].textContent = tenMinScores[i] + '/' + pokemonAmount;
        } else {
          $leaderboardSlotList[i].textContent = '--';
        }
      }
      break;
    case 20:
      $leaderboardTabList[3].className = 'lb-tab lb-active';
      var twentyMinScores = sortScores(scores.quizType.default.twentyMin);
      for (var i = 0; i < $leaderboardSlotList.length; i++) {
        if (twentyMinScores[i] !== undefined) {
          $leaderboardSlotList[i].textContent = twentyMinScores[i] + '/' + pokemonAmount;
        } else {
          $leaderboardSlotList[i].textContent = '--';
        }
      }
      break;
    default:
      console.log('time slot unavailable');
  }
}

//allows the user to switch between leaderboards
function chooseLeaderboard(event) {
  var lbTime = parseInt(event.target.textContent);
  if (event.target.className === 'lb-tab') {
    interpretLeaderboard(lbTime);
  }
}

//displays the home screen from the leaderboard page.
function showHome() {
  $homeContainer.className = 'container home';
  $leaderboardContainer.className = 'container leaderboard hidden';
}

//opens abort quiz modal.
function openAbortModal() {
  $abortModalContainer.className = 'abort-modal-container'
}

//deciphers the outcome of which button the user clicks in the abort quiz modal.
//  if the user chooses no it will hide the modal, if they choose yes it will
//  exit out of the quiz and not save their progress. It will also run the reset
//  values function.
function abortQuiz(event) {

  if (event.target.tagName !== 'A') {
    return;
  }

  if (event.target.textContent === 'YES') {
    clearInterval(intervalIDUserTimer);
    resetValues();
    $abortModalContainer.className = 'abort-modal-container hidden';
    $homeContainer.className = 'container home';

  } else {
    $abortModalContainer.className = 'abort-modal-container hidden';
  }

}

//when quiz is either aborted or submitted, this function resets all the values
//  changed during the quiz and takes the user back to the home page
function resetValues() {
  $quizContainer.className = 'container quiz hidden';
  $pokemonImg.className = 'pokemon-img hidden';
  $fiveSecondTimer.className = 'five-second-timer';
  $timer.className = 'timer hidden';
  $answerBox.className = 'answer input box-style hidden';
  $skipButton.className = 'button-skip box-style hidden';
  $goButton.className = 'button-start box-style hidden';
  $abortQuizButton.className = 'button-abort-quiz box-style hidden';
  $fiveSecondTimer.textContent = 5;
  $answerBox.value = null;
  $pokemonImg.setAttribute('src', null);
  $dropboxHeadTime.textContent = 'select time limit';
  $scoreTracker.textContent = 0;
  $scoreTracker.className = 'score-tracker hidden';

  time = null;
  mode = null;
  randomIDList = shuffle(1, pokemonAmount);
  currentID = 0;
  rightAnswer = false;
  pokemonName = null;
  userScore = 0;
  intervalIDUserTimer = null;
  intervalIDFiveSecondTimer = null;
  seconds = 59;
  imgSeconds = 5;
  timePicked = null;
}
