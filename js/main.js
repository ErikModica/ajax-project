var rightAnswer = false;
var $pokemonImg = document.querySelector('.pokemon-img');
var $answerBox = document.querySelector('.answer-input');
var $answerButton = document.querySelector('button');

addEventListener('load', getPokemon);
$answerBox.addEventListener('keydown', getNextPokemon);


function getRandomID(min, max) {
  var randomVal = Math.random() * (max - min) + min;
  return Math.round(randomVal);
}


function getPokemon() {
  var randomID = getRandomID(1, 151);
  var pokemonName;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + randomID);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status !== 200) {
    console.log('INVALID POKEMON ID')
    }

    $pokemonImg.setAttribute('src', xhr.response.sprites.front_default);

    var pokemonName = xhr.response.species.name;
    if (pokemonName === 'nidoran-f' || pokemonName === 'nidoran-m') {
      pokemonName = 'nidoran';
    }
    console.log(pokemonName);

    $answerBox.addEventListener('input', function (event) {
      var guess = event.target.value;
      guess = guess.toLowerCase();
      console.log(guess);

      if (guess === pokemonName) {
        console.log('ur sicckk dude')
        rightAnswer = true;
        $answerBox.className = 'answer-input right';

      }

    });


  });
  xhr.send();
}

function getNextPokemon(event) {
  if (rightAnswer && event.key === 'Enter') {
    getPokemon();
    rightAnswer = false;
    event.target.value = null;
    $answerBox.className = 'answer-input';
  }
}
