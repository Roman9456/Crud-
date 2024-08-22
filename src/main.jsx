import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
const SERVER_URL = 'http://localhost:7070/notes';

// отправляем запрос на получение данных с сервера
const getNotesResponse = await fetch(SERVER_URL, {
  method: 'GET',
});

const result = await getNotesResponse.json();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App notes={result} />
  </React.StrictMode>,
)
