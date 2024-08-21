import React from 'react';
import './footer.css';
import Container from 'react-bootstrap/Container';
import { useHistory, useLocation } from "react-router-dom"


function Footer({pathList = []}) {
	const history = useHistory()
	const location = useLocation();
	if(!pathList.includes(location.pathname)) {
		return null;
	  }
  return (
     <div>
		<footer id="footer">
		<Container>
			<div className="row align-items-center">
				<div className="my-2 col-lg-4 col-md-6 order-lg-1">
					<div className="fsocial d-flex align-items-center">
						<a href="https://www.facebook.com/" target='_blank'>
							<svg x="0px" y="0px" viewBox="0 0 20 20" style={{enableBackground:'new 0 0 20 20'}} >
								<path d="M14.9,1.7h-2.7c-1.2,0-2.3,0.4-3.1,1.2C8.2,3.7,7.8,4.7,7.8,5.8v2.5H5.1v3.3h2.7v6.7h3.6v-6.7H14l0.9-3.3h-3.6V5.8c0-0.2,0.1-0.4,0.3-0.6C11.8,5.1,12,5,12.2,5h2.7V1.7z"/>
							</svg>
						</a>
						<a href="https://www.youtube.com/" target='_blank'>
						<svg x="0px" y="0px" viewBox="0 0 20 20" style={{enableBackground:'new 0 0 20 20'}} >
								<path d="M19.6,5.5c-0.1-0.4-0.3-0.8-0.6-1.1c-0.3-0.3-0.7-0.5-1.1-0.6C16.3,3.4,10,3.4,10,3.4s-6.3,0-7.8,0.4C1.8,3.9,1.4,4.1,1.1,4.4C0.7,4.7,0.5,5.1,0.4,5.5C0.1,7,0,8.5,0,10s0.1,3,0.4,4.5c0.1,0.4,0.3,0.7,0.7,1c0.3,0.3,0.7,0.5,1.1,0.6c1.6,0.4,7.8,0.4,7.8,0.4s6.3,0,7.8-0.4c0.4-0.1,0.8-0.3,1.1-0.6c0.3-0.3,0.5-0.7,0.6-1.1c0.3-1.5,0.4-3,0.4-4.5C20,8.5,19.9,7,19.6,5.5z M8,12.7V7.3l5.1,2.7L8,12.7z"/>
							</svg>
						</a>
						<a href="https://www.instagram.com/" target='_blank'>
						<svg x="0px" y="0px" viewBox="0 0 20 20" style={{enableBackground:'new 0 0 20 20'}} >
								<g>
									<path d="M14.4,19.3H5.6c-3,0-5.4-2.3-5.4-5.2V5.8c0-2.8,2.4-5.2,5.4-5.2h8.9c3,0,5.4,2.3,5.4,5.2v8.3C19.9,17,17.4,19.3,14.4,19.3z M5.6,2.7c-1.9,0-3.4,1.4-3.4,3.2v8.3c0,1.7,1.5,3.2,3.4,3.2h8.9c1.9,0,3.4-1.4,3.4-3.2V5.8c0-1.7-1.5-3.2-3.4-3.2H5.6z"/>
									<path d="M10,14.3c-0.2,0-0.5,0-0.7-0.1c-0.9-0.1-1.8-0.6-2.5-1.2c-0.7-0.6-1.1-1.5-1.3-2.4C5.4,9.8,5.5,8.8,6,8c0.4-0.8,1.1-1.5,2-1.9c0.8-0.4,1.8-0.6,2.7-0.4c1,0.1,1.8,0.5,2.5,1.2c0.7,0.7,1.2,1.5,1.3,2.4c0,0,0,0,0,0c0.1,0.9,0,1.8-0.5,2.7c-0.5,0.8-1.1,1.5-2,1.9C11.4,14.1,10.7,14.3,10,14.3z M10,7.6c-0.4,0-0.8,0.1-1.2,0.3C8.4,8.1,8,8.5,7.7,8.9c-0.2,0.4-0.3,0.9-0.2,1.4c0.1,0.5,0.3,0.9,0.7,1.3c0.4,0.4,0.9,0.6,1.4,0.7c0.5,0.1,1.1,0,1.6-0.2c0.5-0.2,0.9-0.6,1.1-1c0.2-0.4,0.3-0.9,0.2-1.4l0,0c-0.1-0.5-0.3-0.9-0.7-1.3C11.5,8,11,7.7,10.4,7.7C10.3,7.6,10.2,7.6,10,7.6z"/>
									<path d="M14.9,6.4c-0.6,0-1-0.4-1-1s0.4-1,1-1h0c0.6,0,1,0.4,1,1S15.5,6.4,14.9,6.4z"/>
								</g>
							</svg>
						</a>
						<a href="https://twitter.com/" target='_blank'>
						<svg x="0px" y="0px" viewBox="0 0 20 20" style={{enableBackground:'new 0 0 20 20'}} >
								<path d="M20,2.4c-0.9,0.6-1.8,1-2.9,1.3c-0.5-0.6-1.3-1-2.1-1.2c-0.8-0.2-1.7-0.1-2.4,0.1c-0.8,0.3-1.4,0.8-1.9,1.4C10.2,4.7,10,5.4,10,6.2v0.9c-1.6,0-3.2-0.3-4.6-1S2.7,4.4,1.8,3.2c0,0-3.6,7.7,4.5,11.1C4.5,15.5,2.3,16.1,0,16c8.2,4.3,18.2,0,18.2-9.8c0-0.2,0-0.5-0.1-0.7C19,4.6,19.7,3.6,20,2.4z"/>
							</svg>
						</a>
					</div>
				</div>
				<div className="my-2 col-lg-4 col-md-6 order-lg-3">
					<div className="fmenu">
						<ul>
							<li onClick={()=> history.push("/privacy_policy")} style={{cursor: "pointer"}}>
								<p>Privacy Policy</p>
							</li>
							<li  onClick={()=> history.push("/terms_condition")} style={{cursor: "pointer"}}>
								<p>Terms of Service</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="my-2 col-lg-4 col-md-12 order-lg-2">
					<div className="copyright">
						<p>Copyright © UsRoofs 2023. All rights reserved</p>
					</div>
				</div>
			</div>
		</Container>
	</footer>
	</div>
  );
}

export default Footer;