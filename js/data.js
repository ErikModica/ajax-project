/* exported data */

var previousScoresJSON = localStorage.getItem('scores');

if (previousScoresJSON !== null) {
  scores = JSON.parse(previousScoresJSON)
};

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
