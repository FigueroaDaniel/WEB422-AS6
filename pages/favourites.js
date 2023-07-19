import { Row, Col, Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store'; 
import ArtworkCard from '../components/ArtworkCard';

function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom); // Use the favouritesAtom with useAtom

  if (favouritesList.length === 0) {
      return (
          <Card>
              <Card.Body>
                  <h4>Nothing Here</h4>
                  Try adding some new artwork to the list.
              </Card.Body>
          </Card>
      );
  }

  return (
      <Row className="gy-4">
          {favouritesList.map((objectID) => (
              <Col lg={3} key={objectID}>
                  <ArtworkCard objectID={objectID} />
              </Col>
          ))}
      </Row>
  );
}

export default Favourites;
