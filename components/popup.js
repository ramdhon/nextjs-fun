import { Modal, Button } from 'react-bootstrap'
import { useContext } from 'react'
import AppContext from '../context'

export default function PopUp() {
  const { state: { Constant, popup }, setPopup } = useContext(AppContext)

  // METHODS
  const handleClose = () => {
    popup.reject()
    setPopup(Constant.RESETPOPUP)
  }
  const handleConfirm = () => {
    popup.resolve()
    setPopup(Constant.RESETPOPUP)
  }

  return (
    <Modal show={popup.show} onHide={handleClose}>
      <Modal.Header closeButton={popup.closeable}>
        <Modal.Title>{popup.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{popup.body}</p>
      </Modal.Body>

      <Modal.Footer>
        {
          popup.cancelable
          &&
          <Button onClick={handleClose} variant="secondary">Cancel</Button>
        }
        <Button onClick={handleConfirm} variant="primary">{popup.confirm}</Button>
      </Modal.Footer>
    </Modal>
  )
}