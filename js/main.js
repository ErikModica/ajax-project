var $pokemonImg = document.querySelector('.pokemon-img');
var $answerBox = document.querySelector('.answer-input');

addEventListener('load', getPokemon);

$answerBox.addEventListener('input', function(event) {
  console.log(event.target.value);
});


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

  });
  xhr.send();
}
