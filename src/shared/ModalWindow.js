import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export default function ModalWindow({show, handleConfirm, handleCancel, header, bodyText, nameConfirm, nameCancel}) {

  return (
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCancel}>
            {nameCancel}
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            {nameConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
