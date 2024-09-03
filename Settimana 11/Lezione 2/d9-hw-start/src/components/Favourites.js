import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavourite } from '../redux/actions/favouritesActions';
import { Container, Row, Col, Button, Card, Alert, Spinner } from 'react-bootstrap';

const Favourites = () => {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);
    const [companyDetails, setCompanyDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Aggiunto per la gestione degli errori

    const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/companies/";

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            setLoading(true);
            setError(null); // Reset dell'errore
            try {
                const details = {};
                for (const company of favourites) {
                    const response = await fetch(`${baseEndpoint}${company}`);
                    if (response.ok) {
                        const data = await response.json();
                        details[company] = data;
                    } else {
                        console.error(`Error fetching details for ${company}`);
                    }
                }
                setCompanyDetails(details);
            } catch (error) {
                console.error("Error fetching company details:", error);
                setError("Error fetching company details"); // Setta il messaggio di errore
            } finally {
                setLoading(false);
            }
        };

        if (favourites.length > 0) {
            fetchCompanyDetails();
        } else {
            setLoading(false); // Assicurati che il caricamento finisca anche se non ci sono preferiti
        }
    }, [favourites]);

    const handleRemoveFavourite = (company) => {
        dispatch(removeFavourite(company));
    };

    return (
        <Container>
            <Row className="my-3">
                <Col>
                    <h1>Your Favourite Companies</h1>
                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            <p>Loading details...</p>
                        </div>
                    )}
                    {error && (
                        <Alert variant="danger">
                            {error}
                        </Alert>
                    )}
                    {favourites.length === 0 && !loading && (
                        <p>No favourite companies yet.</p>
                    )}
                    {!loading && !error && (
                        <Row>
                            {favourites.map((company) => (
                                <Col md={4} key={company} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{company}</Card.Title>
                                            {companyDetails[company] ? (
                                                <div>
                                                    <Card.Text>
                                                        <strong>Website:</strong> <a href={companyDetails[company].website} target="_blank" rel="noreferrer">{companyDetails[company].website}</a>
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <strong>Description:</strong> {companyDetails[company].description || "No description available"}
                                                    </Card.Text>
                                                </div>
                                            ) : (
                                                <Card.Text>Loading details...</Card.Text>
                                            )}
                                            <Button onClick={() => handleRemoveFavourite(company)} variant="danger">
                                                Remove from Favourites
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Favourites;
