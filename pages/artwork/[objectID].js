import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';
import Layout from '../../components/Layout';

function ArtworkById() {
    const router = useRouter();
    const { objectID } = router.query;
    return (
        <Layout>
            <Row>
                <Col>
                    {objectID && <ArtworkCardDetail objectID={objectID} />}
                </Col>
            </Row>
        </Layout>
    );
}

export default ArtworkById;
