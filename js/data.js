/* exported data */


var scores = {
  quizType: {
    default: {
      oneMin: [],
      fiveMin: [],
      tenMin: [],
      twentyMin: []
    }
  }
};

window.addEventListener('beforeunload', function (event) {
  var scoresJSON = JSON.stringify(scores);
  localStorage.setItem('scores', scoresJSON);
});


var previousScoresJSON = localStorage.getItem('scores');

if (previousScoresJSON !== null) {
  scores = JSON.parse(previousScoresJSON)
};
