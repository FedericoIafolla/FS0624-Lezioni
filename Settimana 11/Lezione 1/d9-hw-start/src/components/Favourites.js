import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavourite } from '../redux/actions/favouritesActions';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Favourites = () => {
    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.favourites);
    const [companyDetails, setCompanyDetails] = useState({});

    const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/companies/";

    useEffect(() => {
        const fetchCompanyDetails = async () => {
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
            }
        };

        if (favourites.length > 0) {
            fetchCompanyDetails();
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
                    {favourites.length === 0 ? (
                        <p>No favourite companies yet.</p>
                    ) : (
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
