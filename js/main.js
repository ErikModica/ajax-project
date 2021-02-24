function getPokemon() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/898');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.response);
    console.log(xhr.status);
  });
  xhr.send();
}



function getRandomID(min, max) {
  var randomVal = Math.random() * (max - min) + min;
  return Math.round(randomVal);
}
