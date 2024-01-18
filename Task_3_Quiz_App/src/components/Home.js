import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(response => response.json())
      .then(data => setCategories(data.trivia_categories));
  }, []);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleStartQuiz() {
    if (selectedCategory) {
      setQuizStarted(true);
    }
  }

  function handleResetQuiz() {
    setSelectedCategory('');
    setQuizStarted(false);
  }

  return (
    <div className={classes.container}>
      {!quizStarted ? (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="category-select-label">Select a category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </div>
      ) : (
        <Quiz category={selectedCategory} onResetQuiz={handleResetQuiz} />
      )}
    </div>
  );
}

export default Home;
