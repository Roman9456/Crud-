import PropTypes from 'prop-types';
import CardItem from './CardItem';
import Row from 'react-bootstrap/Row';

function Cards({ cardsArray, deleteItem }) {
  return (
    <Row xs={1} md={3} className="g-2 mb-5">
      {cardsArray.map((elem, i) =>
        <CardItem 
          key={i}
          id={elem.id}
          text={elem.text}
          deleteItem={deleteItem}
        />
      )}
    </Row>
  );
}

Cards.propTypes = {
  cardsArray: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Cards;
