import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, removeFavourite } from '../redux/actions/favouritesActions';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Job from './Job';

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { company } = useParams();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    fetchJobs();
  }, [company]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseEndpoint + company);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFavourite = favourites.includes(company);

  const handleAddFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(company));
    } else {
      dispatch(addFavourite(company));
    }
  };

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job Postings for: {company}</h1>
          <Button onClick={handleAddFavourite} className="mb-3" variant={isFavourite ? "danger" : "primary"}>
            {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
          </Button>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p>Loading details...</p>
            </div>
          ) : jobs.length === 0 ? (
            <p>No job postings available for this company.</p>
          ) : (
            jobs.map((jobData) => (
              <Job key={jobData._id} data={jobData} />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
