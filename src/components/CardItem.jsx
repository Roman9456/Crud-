import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

function CardItem({ id, text, deleteItem }) {
  return (
    <Col>
      <Card bg='light' className='mt-5'>
        <Card.Body>
          <Card.Text className='text-center fw-bold m-0'>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className='bg-light d-flex flex-row justify-content-center align-items-center'>
          <Button className='fw-bold text-uppercase' variant="outline-danger" data-id={id} onClick={deleteItem}>Удалить</Button>
        </Card.Footer>
      </Card>
    </Col>
  );
}

CardItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default CardItem;
