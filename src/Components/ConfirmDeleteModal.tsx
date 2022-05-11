import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";

type ConfirmDeleteModalProps = {
  show: boolean;
  title: string;
  body: string;
  onHide: () => void;
  onClose: () => void;
  onDelete: () => void;
  children: React.ReactNode;
};

export const ConfirmDeleteModal: FunctionComponent<ConfirmDeleteModalProps> = ({
  show,
  title,
  body,
  onHide,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
