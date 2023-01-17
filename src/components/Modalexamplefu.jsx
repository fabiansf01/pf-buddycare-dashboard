import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Button, Modal, ModalFooter,
	ModalHeader, ModalBody
} from "reactstrap"

function Modalexamplefu() {

	// Modal open state
	const [modal, setModal] = React.useState(true);

	// Toggle for Modal
	const toggle = () => setModal(!modal);

	return (
		<div style={{
			display: 'block', width: 700, padding: 30
		}}>
			<h4>ReactJS Reactstrap Modal Component</h4>
			<Button color="primary"
				onClick={toggle}>Open Modal</Button>
			<Modal isOpen={modal}
				toggle={toggle}
				modalTransition={{ timeout: 10 }}>
				<ModalBody>
					fdgdfgdfg
                    dfgdfgdgfdg
                    dfgdfgdfgdfgdfgdgdfg
                    dfdfgdfgdfgdfgdfgdfgfdg
                    dgdgdgdgdgdgdgdgdgdgdgdg
                    dgdgdgdgddgdgdgdgdgdgddg
                    
				</ModalBody>
			</Modal>
		</div >
	);
}

export default Modalexamplefu;
