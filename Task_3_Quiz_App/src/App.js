import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1></h1>
     <BrowserRouter >
        <Routes >
          <Route path="/" element={<Home user={user} setuser={setuser}/>} />
          <Route path="/:id" element={<Asd />} />
          <Route path="login" element={<Login setuser={setuser}/>} />
        </Routes>
     </BrowserRouter>
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
