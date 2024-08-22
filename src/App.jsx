const SERVER_URL = 'http://localhost:7070/notes';

// react
import { useState } from 'react';
import PropTypes from 'prop-types';

// components
import Cards from './components/Cards';

// bootstrap element
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ notes }) {
  const [form, setForm] = useState({
    text: '',
    cards: notes,
  });

  const refreshItems = async () => {
    // отправляем запрос на получение данных с сервера
    const getNotesResponse = await fetch(SERVER_URL, {
      method: 'GET',
    });

    const result = await getNotesResponse.json();
    form.cards = result;

    form.text = '';

    // обновляем визуальную часть
    setForm(prevForm => ({ ...prevForm }));
  }

  const handleSubmit = async (evt) => {
    // отменяем отправку данных
    evt.preventDefault();

    // если не заполнен тест
    if (form.text.length === 0) {
      return;
    }

    // отправляем запрос на добавление на сервер
    const sendNotesResponse = await fetch(SERVER_URL, {
      method: 'POST',
      body: JSON.stringify({ text: form.text }),
    });

    if (sendNotesResponse.status !== 204) {
      alert('Произошла ошибка при добавлении!');
      return;
    }

    refreshItems();
  };

  const handleFormChange = ({ target }) => {
    let { name, value } = target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const deleteItem = async (evt) => {
    // отправляем запрос на удаление данных с сервера
    const deleteNotesResponse = await fetch(`${SERVER_URL}/${evt.target.dataset.id}`, {
      method: 'DELETE',
    });

    if (deleteNotesResponse.status !== 204) {
      alert('Произошла ошибка при удалении!');
      return;
    }

    refreshItems();
  }

  return (
    <Container className='mt-5'>
      <Button className='mb-1 float-end' variant="success" type="button" onClick={refreshItems}>
        Обновить
      </Button>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-bold'>Введите текст</Form.Label>
          <Form.Control 
            type="text"
            id="cardText"
            name="text"
            value={form.text}
            onChange={handleFormChange}
            placeholder="Введите текст"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>

      <Cards cardsArray={form.cards} deleteItem={deleteItem} />
      
    </Container>
  )
}

App.propTypes = {
  notes: PropTypes.array,
};

export default App
