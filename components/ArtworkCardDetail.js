import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { useState } from 'react';
import { useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '../lib/userData'

function ArtworkCardDetail(props) {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList, props.objectID]);

    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null); 

    const favouritesClicked = async () => {
        if (!props.objectID) {
          return;
        }
        if (showAdded) {
            await removeFromFavourites(props.objectID);
        } else {
            await addToFavourites(props.objectID);
        }
        setShowAdded(!showAdded);
    };

    if (error) {
        return <Error statusCode={404} />
    }
    if (!data) {
        return null;
    }
    return (
        <Card style={{ width: '100%' }}>
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
            <Card.Body>
                <Card.Title>{data.title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date: </strong>{`${data.objectDate || 'N/A'}`}
                    <br />
                    <strong>Classification: </strong>{`${data.classification || 'N/A'}`}
                    <br />
                    <strong>Medium: </strong>{`${data.medium || 'N/A'}`}
                    <br />
                    <br />
                    <strong>Artist: </strong>{`${data.artistDisplayName || 'N/A'}`}
                    {data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer"> wiki</a>}
                    <br />
                    <strong>Credit Line: </strong>{`${data.creditLine || 'N/A'}`}
                    <br />
                    <strong>Dimensions: </strong>{`${data.dimensions || 'N/A'}`}
                </Card.Text>
                <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
                    {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCardDetail;
