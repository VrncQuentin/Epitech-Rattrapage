import {useEffect, useState} from 'react';
import {Button, Modal, Toast} from 'react-bootstrap';
import {Settings} from "@material-ui/icons";

export const Widget = ({name, deleteWidget, configModal, updateWidget, timer, children}) => {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(!show)

    useEffect(() => {
        const interval = setInterval(() => updateWidget(), timer)
        return () => clearInterval(interval)
    }, [updateWidget, timer])

    return (
        <Toast onClose={deleteWidget}>
            <Toast.Header>
                <strong className='mr-auto'>{name}</strong>
                <Button onClick={toggleShow}><Settings/></Button>
            </Toast.Header>
            <Toast.Body>
                {children}
            </Toast.Body>
            <Modal centered show={show} onHide={toggleShow}>
                {configModal}
            </Modal>
        </Toast>
    )
}
// Toast: https://react-bootstrap.github.io/components/toasts/