import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteModal({ onHandleClose, onHandleDelete, show }) {
  const handleClose = () => {
    onHandleClose();
  };

  const handleDelete = () => {
    onHandleDelete();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this recipe?</Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
