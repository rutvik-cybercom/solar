import React, {useState} from 'react';
import './home.css';
import bannerImage from '../../assets/Solar-Panel-1.jpg';
import SolarModelImage from '../../assets/solar-model-2.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home() {
	const [show, setShow] = useState(false); 
  const handleShow = () => setShow(true);
 
  const ModalHeader={
	borderBottom: "none",
  }

  return (
	<>
     <div>
		<div className="banner-row" style={{backgroundImage: `url(${bannerImage})`}}>
			<div className="container">
				<div className="row">
					<div className="col-lg-7 col-md-6">
						<div className="banner-text">
							<h1>Design your own Solar System and save 30 to 40 percent</h1>
							<p>A buck ten per wattt</p>
							<a href="#" className="btn btn-primary" onClick={handleShow}>Find Out How</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Modal
        size="xl"
        show={show}
		className='solar-model'
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton style={ModalHeader}>
        </Modal.Header>
        <Modal.Body>
			<div className='models-wrapper'>
				<div className='model-image-container'>
					<img src={SolarModelImage}/>
				</div>
			<div className='model-content-box'>
			<p>Did you know that 60 percent of the cost  solar installation is for sales and overhead?</p>
			<p>Design your own system and eliminate this overhead.</p>
			<p>Using Our AI-assisted SolarDesigner you do not have to be an engineer to design a solar system.</p>
			<p>Our easy-to-follow User Interface will step you through the process. If you are comfortable with the Google Earth user interface you are ready to take control of your solar project.</p>
			<p>The preliminary design is free. We provide you with all you need, from a complete list of the number of panels, wiring, inverter, junction boxes, breakers, prices for each component, instructions, and the permit application to submit to your City Building Department.</p>
			<p>And that is not all.... We will also finance your system and assign a project manager to oversee the installation, if you prefer to have a Certified Solar Installer do the work</p>
			<p>We encourage you to shop around and compare our offering. You will not find a better deal. The competition, after all, has all that overhead to cover.</p>
			<p>By designing your own system you cut the cost by 30 to 50 percent. At no risk.</p>
			</div>
			</div>
		</Modal.Body>
      </Modal>
	</>
  );
}

export default Home;
