import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  removeFavourite,
} from "../redux/actions/favouritesActions";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const toggleFavourite = (companyName) => {
    if (favourites.includes(companyName)) {
      dispatch(removeFavourite(companyName));
    } else {
      dispatch(addFavourite(companyName));
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Row className="align-items-center">
            <Col xs={12} md={9} className="mb-3">
              <Form onSubmit={handleSubmit} className="d-flex">
                <Form.Control
                  type="search"
                  value={query}
                  onChange={handleChange}
                  placeholder="Type and press Enter"
                  className="me-2"
                />
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </Form>
            </Col>
            <Col xs={12} md={3} className="text-md-end mb-3">
              <Link to="/favourites">
                <Button variant="secondary">View Favourites</Button>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
            <Job
              key={jobData._id}
              data={jobData}
              onToggleFavourite={toggleFavourite}
              isFavourite={favourites.includes(jobData.company_name)}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
