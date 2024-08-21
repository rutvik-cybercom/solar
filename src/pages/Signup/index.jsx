import React, {useState} from 'react';
import './signup.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch} from 'react-redux';
import { registerUser } from '../../Redux/authAction';
import { showErrorToast, showSuccessToast } from '../../component/common/ToastMsg';
import { IMAGES } from '../../component/common/Constants/Constants';
import { useHistory } from 'react-router';


const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    PhoneNumber: yup.string().required("Phone no is required"),
    password: yup.string().required("Password is required"),
  })
  .required();


  function Signup() {
	// const loading = useSelector((state) => state.auth.loading);
	const [isChecked, setIsChecked] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory()
	const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema),});
	  
	const formSubmit = (data) => {
		dispatch(registerUser(data))
		.then((res) =>{
			if(res.payload.data.result){
				showSuccessToast(res.payload.data.message)
				history.push("/login")
			}else{
				showErrorToast(res.payload.data.message)
			}
		}).catch((error) => {
			console.log(error)
		})
	  };

    const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
    };

  return (
	<div className='before-login-page'>
		<Row className='m-0'>
			<Col xs={12} md={6} className='p-0'>
				<div className='login-left-box p-3 p-md-5'>
					<div className='login-main-box'>
						<figure className='brandlogo' onClick={() => history.push("/")}>
							<img src={IMAGES.Logo} alt="Logo"/>
						</figure>
						<div className='login-form-box'>
							<div className='login-form-title'>
								<span className='user-ion'>
									<svg x="0px" y="0px" viewBox="0 0 16 17" style={{enableBackground:'new 0 0 16 17'}} >
										<path d="M10.9104 9.16178C12.2353 8.2693 13.1066 6.75964 13.1066 5.04411C13.1066 2.2647 10.806 0 7.98254 0C5.15898 0 2.89289 2.2647 2.89289 5.00964C2.89289 6.72517 3.76468 8.23525 5.08912 9.12726C2.09143 10.2942 0 13.1102 0 16.4388H1.4292C1.4292 13.1447 3.97377 10.4312 7.21551 10.0537C7.25041 10.0537 8.12179 9.98527 8.85386 10.0537H8.9237C12.096 10.5001 14.5358 13.1765 14.5358 16.4362H16C15.9651 13.1421 13.8736 10.2942 10.9104 9.16178ZM7.98254 8.78402C5.85613 8.78402 4.14843 7.10294 4.14843 5.00966C4.14843 2.91637 5.85613 1.23532 7.98254 1.23532C10.1089 1.23532 11.8166 2.91637 11.8166 5.00966C11.8166 7.10294 10.1089 8.78402 7.98254 8.78402Z" fill="white"/>
									</svg>
								</span>
								<h2>Welcome to USRoofs</h2>
								<p>Create your free account now</p>
							</div>
							<div className='login-form'>
								<Form onSubmit={handleSubmit(formSubmit)}>
								<Row className='m-0'>
									<Col xs={12} md={6}>
										<Form.Group className="form-group mb-3" controlId="formBasicEmail">
											<Form.Label>First Name</Form.Label>
											<Form.Control type="text" placeholder="Enter first name" {...register("firstName")}/>
											<p style={{color: "red", paddingTop: 3}}>{errors.firstName?.message}</p>
										</Form.Group>
									</Col>
									<Col xs={12} md={6}>
										<Form.Group className="form-group mb-3" controlId="formBasicEmail">
											<Form.Label>Last Name</Form.Label>
											<Form.Control type="text" placeholder="Enter last name" {...register("lastName")}/>
											<p style={{color: "red", paddingTop: 3}}>{errors.lastName?.message}</p>
										</Form.Group>
									</Col>
									<Col xs={12} md={12}>
										<Form.Group className="form-group mb-3" controlId="formBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control type="email" placeholder="Enter your email address" {...register("email")} />
											<p style={{color: "red", paddingTop: 3}}>{errors.email?.message}</p>
										</Form.Group>
									</Col>
									<Col xs={12} md={12}>
										<Form.Group className="form-group mb-3" controlId="formBasicEmail">
											<Form.Label>Phone Number</Form.Label>
											<Form.Control type="number" placeholder="Enter phone number" {...register("PhoneNumber")}/>
											<p style={{color: "red", paddingTop: 3}}>{errors.PhoneNumber?.message}</p>
										</Form.Group>
									</Col>
									<Col xs={12} md={12}>
										<Form.Group className="form-group mb-3" controlId="formBasicEmail">
											<Form.Label>Password</Form.Label>
											<InputGroup>
												<Form.Control
													type={showPassword ? "text" : "password"} placeholder="Enter password"
													aria-describedby="password"
													{...register("password")}
												/>
												<InputGroup.Text id="password" onClick={togglePasswordVisibility}>
													<svg width="16" height="14" x="0px" y="0px" viewBox="0 0 16 14" style={{enableBackground:'new 0 0 16 14'}} >
														<path d="M13.359 10.238C15.06 8.72 16 7 16 7C16 7 13 1.5 8 1.5C7.03959 1.5033 6.09005 1.70342 5.21 2.088L5.98 2.859C6.62744 2.62315 7.31095 2.50167 8 2.5C10.12 2.5 11.879 3.668 13.168 4.957C13.7884 5.58069 14.3445 6.26512 14.828 7C14.77 7.087 14.706 7.183 14.633 7.288C14.298 7.768 13.803 8.408 13.168 9.043C13.003 9.208 12.831 9.371 12.651 9.529L13.359 10.238Z" fill="#A0A6BB"/>
														<path d="M11.297 8.176C11.5202 7.55184 11.5615 6.87714 11.4162 6.23042C11.2709 5.58369 10.9449 4.99152 10.4762 4.52282C10.0075 4.05411 9.41531 3.72814 8.76858 3.58283C8.12185 3.43752 7.44716 3.47884 6.823 3.702L7.646 4.525C8.03031 4.46999 8.42215 4.50524 8.79047 4.62796C9.15879 4.75068 9.49347 4.95749 9.76799 5.23201C10.0425 5.50653 10.2493 5.8412 10.372 6.20953C10.4948 6.57785 10.53 6.96969 10.475 7.354L11.297 8.176ZM8.354 9.475L9.176 10.297C8.55184 10.5202 7.87715 10.5615 7.23042 10.4162C6.58369 10.2709 5.99153 9.94488 5.52282 9.47618C5.05411 9.00747 4.72814 8.4153 4.58283 7.76858C4.43752 7.12185 4.47885 6.44715 4.702 5.823L5.525 6.646C5.46999 7.03031 5.50524 7.42215 5.62796 7.79047C5.75068 8.15879 5.95749 8.49347 6.23201 8.76799C6.50653 9.0425 6.84121 9.24931 7.20953 9.37203C7.57785 9.49475 7.96969 9.53 8.354 9.475Z" fill="#A0A6BB"/>
														<path d="M3.35 4.47C3.17 4.63 2.997 4.792 2.832 4.957C2.21165 5.58069 1.65552 6.26512 1.172 7L1.367 7.288C1.702 7.768 2.197 8.408 2.832 9.043C4.121 10.332 5.881 11.5 8 11.5C8.716 11.5 9.39 11.367 10.02 11.14L10.79 11.912C9.90994 12.2965 8.9604 12.4967 8 12.5C3 12.5 0 7 0 7C0 7 0.939 5.279 2.641 3.762L3.349 4.471L3.35 4.47ZM13.646 13.354L1.646 1.354L2.354 0.645996L14.354 12.646L13.646 13.354Z" fill="#A0A6BB"/>
													</svg>
												</InputGroup.Text>
											</InputGroup>
											<p style={{color: "red" , paddingTop: 3}}>{errors.password?.message}</p>
										</Form.Group>
									</Col>
									<Col xs={12} md={12}>
										<Form.Group className="form-group mb-3" controlId="formBasicEmail">
											<div className='d-flex'>
												<Form.Check onChange={(e) => setIsChecked(e.target.checked)}/>
												<Form.Check.Label className='ps-2'>I have read and agree to the <a onClick={()=> history.push("/terms_condition")} style={{cursor: "pointer", color: "#02528A"}}>Terms & Conditions</a> and <a onClick={()=> history.push("/privacy_policy")} style={{cursor: "pointer", color: "#02528A"}}>Privacy Policy</a>.</Form.Check.Label>
										
											</div>
										</Form.Group>
									</Col>
									<Col xs={12} md={12}>
										<Button variant="primary" className='w-100 text-center' type="submit">
										Create Account
										</Button>
									</Col>
								</Row>
									
								</Form>
							</div>
						</div>
						<div className='register-link'>
							<p>Already have an account? <span  onClick={()=> history.push("/login")} style={{cursor: "pointer", color: "#02528A"}}>Login</span></p>
						</div>
					</div>
				</div>
			</Col>
			<Col xs={12} md={6} className='p-0'>
				<div className='login-right-box'>
					<div className='login-right-top'>
						<div className='login-right-content'>
							<h1>Ready to get started?</h1>
							<p>We offer the best-in-class solar panels which makes us the most reliable solar company in the world.</p>
						</div>
						<div className='login-right-video'>
							<img src={IMAGES.VideoImg} alt="Video Imag"/>
							<a href='#' className='video-btn'>
								<svg x="0px" y="0px" viewBox="0 0 16 19" style={{enableBackground:'new 0 0 16 19'}} >
									<path d="M3.8,0.9C2.5,0,0.7,0.9,0.7,2.5v13.9c0,1.6,1.8,2.5,3.1,1.7l10.6-7c1.2-0.8,1.2-2.6,0-3.3L3.8,0.9z"/> 
								</svg>
							</a>
						</div>
					</div>

				</div>
			</Col>
		</Row>
	</div>
  );
}

export default Signup;
