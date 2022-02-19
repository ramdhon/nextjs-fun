import { Modal, Button } from 'react-bootstrap'
import { useContext } from 'react'
import AppContext from '../context'

export default function PopUp() {
  const { darkPrimaryMode, darkThirdMode, darkModeHead, darkModeBg, isDark, state: { Constant, popup }, setPopup } = useContext(AppContext)

  const closeModal = () => isDark() && 'white'
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
      <Modal.Header className={darkModeHead()} closeVariant={closeModal()} closeButton={popup.closeable}>
        <Modal.Title>{popup.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className={darkModeBg()}>
        <p>{popup.body}</p>
      </Modal.Body>

      <Modal.Footer className={darkModeBg()}>
        {
          popup.cancelable
          &&
          <Button onClick={handleClose} variant={darkThirdMode()}>Cancel</Button>
        }
        <Button onClick={handleConfirm} variant={darkPrimaryMode()}>{popup.confirm}</Button>
      </Modal.Footer>
    </Modal>
  )
}