import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Job = ({ data, onToggleFavourite, isFavourite }) => (
  <Row
    className="mx-0 mt-3 p-3"
    style={{ border: "1px solid #00000033", borderRadius: 4 }}
  >
    <Col xs={3}>
      <Link to={`/${data.company_name}`}>{data.company_name}</Link>
    </Col>
    <Col xs={7}>
      <a href={data.url} target="_blank" rel="noreferrer">
        {data.title}
      </a>
    </Col>
    <Col xs={2} className="text-right">
      <Button
        onClick={() => onToggleFavourite(data.company_name)}
        variant={isFavourite ? "danger" : "success"}
        size="sm"
      >
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
      </Button>
    </Col>
  </Row>
);

export default Job;
