import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '2rem 0',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

function Quiz({ category, onResetQuiz }) {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
  }, [category]);

  function handleNextQuestion() {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShowAnswer(false);
  }

  function handleShowAnswer() {
    setShowAnswer(true);
  }

  function handleAnswerSubmit(answer) {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const { question, correct_answer, incorrect_answers } = currentQuestion;
  const answers = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div>
      <h1>{category} Quiz</h1>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question}</p>
      <div>
        {answers.map((answer) => (
          <label key={answer}>
            <input
              type="radio"
              name="answer"
              value={answer}
              onChange={() => handleAnswerSubmit(answer)}
            />
            {answer}
          </label>
        ))}
      </div>
      {showAnswer && <p>Answer: {correct_answer}</p>}
      <div className={classes.buttonContainer}>
        {currentQuestionIndex < 9 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            className={classes.button}
          >
            Next Question
          </Button>
        ) : (
          <div>
            <p>Quiz complete!</p>
            <p>Your score: {score}/10</p>
            <Button variant="contained" color="primary" onClick={onResetQuiz}>
              Play Again
            </Button>
          </div>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleShowAnswer}
          className={classes.button}
        >
          Show Answer
        </Button>
      </div>
    </div>
  );
}

export default Quiz;
