import React,{useEffect, useState} from 'react';
import './App.css';
import MyComponent from './main-mentors';
import myMentors from './main-mentors';
import { useEffect } from 'react';


function App() {
  const [info, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/data') // Fetch data from API
      .then(response => response.json())
      .then(info => setData(info));
  }, []);

  return (
    <div className="App">
      <h1> Data from API</h1>
      <MyComponent />
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name} - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
