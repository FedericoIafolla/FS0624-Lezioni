import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class AddComment extends Component {
  state = {
    comment: "",
    rate: 1,
    author: "Anonymous", // Un author statico per esempio
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  submitComment = async (event) => {
    event.preventDefault();

    const newComment = {
      comment: this.state.comment,
      rate: this.state.rate,
      elementId: this.props.bookId,
    };

    console.log("Submitting comment:", newComment); // Debug: mostra i dati del commento

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNGUzNmYyNjBjYzAwMTVjYzBkY2EiLCJpYXQiOjE3MjQzMzM1MTUsImV4cCI6MTcyNTU0MzExNX0.MGo0Yn5FTFSLCkSlHvusJulO0yjboCAmqW5uf3jjmwM", // Sostituisci con il tuo token
        },
      });

      if (response.ok) {
        alert("Comment added!");
        this.props.fetchComments(); // Ricarica i commenti
        this.setState({ comment: "", rate: 1 }); // Resetta il form
      } else {
        const errorData = await response.json();
        console.error("Failed to add comment:", response.status, response.statusText, errorData);
        alert("Failed to add comment: " + errorData.message);
      }
    } catch (error) {
      console.error("Error in submitComment:", error);
      alert("Error: " + error.message);
    }
  };

  render() {
    return (
      <Form onSubmit={this.submitComment}>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            value={this.state.comment}
            onChange={this.handleInputChange}
            placeholder="Write your comment here"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            name="rate"
            value={this.state.rate}
            onChange={this.handleInputChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddComment;
