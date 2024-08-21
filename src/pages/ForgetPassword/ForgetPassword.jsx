import React from "react";
import "../../pages/Login/login.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { showSuccessToast,showErrorToast } from "../../component/common/ToastMsg";
import { IMAGES } from "../../component/common/Constants/Constants";
import Header from "../../component/common/header/Header";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { forgetPassword } from "../../Redux/authAction";

const schema = yup
  .object({
    email: yup.string().required("Email is required").email("Email must be valid"),
  })
  .required();

function ForgetPassword() {
    const dispatch = useDispatch();
    const history = useHistory()
    const {register, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(schema),});
    const onSubmit = (data) => {
     
        const res = dispatch(forgetPassword(data));     
        res.then((res) => {
            if(res.payload.result ===true){
                showSuccessToast(res.payload.message);
                history.push("/")
            }else{
                showErrorToast(res.payload.message)
            }
        }).catch((error) => {
            console.log(error)
        })
    };
    return (
        <>
            <Header />
            <div className="before-login-page">
                <Row className="m-0">
                    <Col xs={12} md={6} className="p-0">
                        <div className="login-left-box p-3 p-md-5">
                            <div className="login-main-box">
                                <figure className="brandlogo" onClick={() => history.push("/")}>
                                    <img src={IMAGES.Logo} alt="Logo" />
                                </figure>
                                <div className="login-form-box">
                                    <div className="login-form-title">
                                        <span className="user-ion">
                                            <svg
                                                x="0px"
                                                y="0px"
                                                viewBox="0 0 16 17"
                                                style={{ enableBackground: "new 0 0 16 17" }}
                                            >
                                                <path
                                                    d="M10.9104 9.16178C12.2353 8.2693 13.1066 6.75964 13.1066 5.04411C13.1066 2.2647 10.806 0 7.98254 0C5.15898 0 2.89289 2.2647 2.89289 5.00964C2.89289 6.72517 3.76468 8.23525 5.08912 9.12726C2.09143 10.2942 0 13.1102 0 16.4388H1.4292C1.4292 13.1447 3.97377 10.4312 7.21551 10.0537C7.25041 10.0537 8.12179 9.98527 8.85386 10.0537H8.9237C12.096 10.5001 14.5358 13.1765 14.5358 16.4362H16C15.9651 13.1421 13.8736 10.2942 10.9104 9.16178ZM7.98254 8.78402C5.85613 8.78402 4.14843 7.10294 4.14843 5.00966C4.14843 2.91637 5.85613 1.23532 7.98254 1.23532C10.1089 1.23532 11.8166 2.91637 11.8166 5.00966C11.8166 7.10294 10.1089 8.78402 7.98254 8.78402Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </span>
                                        <h2>Forgot Password</h2>
                               
                                    </div>
                                    <div className="login-form">
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <Form.Group
                                                className="form-group mb-3"
                                                controlId="formBasicEmail">
                                                <Form.Label>E-mail</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                   {...register("email")}
                                                />
                                                 <p style={{color: "red", paddingTop: 3}}>{errors.email?.message}</p>
                                            </Form.Group>
                                            <Button 
                                                variant="primary"
                                                className="w-100 text-center"
                                                type="submit"
                                            >
                                               Send Link 
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                                <div
                                    className="register-link"
                                >
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="p-0">
                        <div className="login-right-box">
                            <div className="login-right-top">
                                <div className="login-right-content">
                                    <h1>Let’s conserve for the Future</h1>
                                    <p>
                                        We value natural resources not as an end but for using it to
                                        create differences and create a better life.
                                    </p>
                                </div>
                                <div className="login-right-video">
                                    <img src={IMAGES.VideoImg} alt="Video Imag" />
                                    <a href="#" className="video-btn">
                                        <svg
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 16 19"
                                            style={{ enableBackground: "new 0 0 16 19" }}
                                        >
                                            <path d="M3.8,0.9C2.5,0,0.7,0.9,0.7,2.5v13.9c0,1.6,1.8,2.5,3.1,1.7l10.6-7c1.2-0.8,1.2-2.6,0-3.3L3.8,0.9z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>



        </>
    )
}

export default ForgetPassword
