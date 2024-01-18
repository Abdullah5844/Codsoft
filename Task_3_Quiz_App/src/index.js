import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [category, setCategory] = useState('');

  function handleCategorySelection(category) {
    setCategory(category);
  }

  return (
    <React.StrictMode>
      {category ? <Quiz category={category} /> : <Home onCategorySelection={handleCategorySelection} />}
    </React.StrictMode>
  );
}

root.render(<App />);

reportWebVitals();






