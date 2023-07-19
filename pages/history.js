import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import styles from '@/styles/History.module.css';

function History() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let parsedHistory = []; // given
  searchHistory.forEach(h => { // given
      let params = new URLSearchParams(h); // given
      let entries = params.entries(); // given
      parsedHistory.push(Object.fromEntries(entries)); // given
  }); // given
  const historyClicked = (e, index) => { // given
        e.stopPropagation();
        const query = searchHistory[index];
        router.push(`/artwork${query}`);
    };
  const removeHistoryClicked = (e, index) => { // given
      e.stopPropagation(); // given
      setSearchHistory(current => { // given
          let x = [...current];  // given
          x.splice(index, 1); // given
          return x; // given
      }); // given
    };
    return (
        <Card>
            <Card.Body>
                <Card.Title>Search History</Card.Title>
                {parsedHistory.length === 0 ? (
                    <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
                ) : (
                    <ListGroup>
                        {parsedHistory.map((historyItem, index) => (
                            <ListGroup.Item
                                key={index}
                                onClick={(e) => historyClicked(e, index)}
                                className={styles.historyListItem}
                            >
                                {Object.keys(historyItem).map((key) => (
                                    <>
                                        {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                    </>
                                ))}
                                <Button
                                    className="float-end"
                                    variant="danger"
                                    size="sm"
                                    onClick={(e) => removeHistoryClicked(e, index)}
                                >
                                    &times;
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
    }

export default History