import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useMutation, gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost($title: String, $content: String) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors {
        message
      }
      post {
        title
        content
      }
    }
  }
`;

export default function AddPostModal() {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [createPost, { data, loading }] = useMutation(CREATE_POST);

  useEffect(() => {
    console.log(data);
    if (data) {
      if (data?.postCreate?.userErrors?.length > 0) {
        setError(data.postCreate.userErrors[0].message);
      } else {
        window.location.reload();
      }
    }
  }, [data]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = () => {
    if (!title || !content) {
      setError("Please fill out all fields");
      return;
    }
    createPost({
      variables: {
        title: title,
        content: content,
      },
    });
    handleClose();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error && <p>{error}</p>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
