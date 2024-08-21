import React, { useEffect, useState } from "react";
import "./index.css";
import SideBar from "./SideBar";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Swal from "sweetalert2";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchitemValues, saveReport } from "../../Redux/authAction";
import { getValue } from "@testing-library/user-event/dist/utils";




export default function SolarDesign() {
  const dispatch = useDispatch();
  const [sliderValue, setSliderValue] = useState(80);
  const schema = yup.object({
    systemTypeId: yup.string(),
    buildingTypeId: yup.string(),
    roleId: yup.string(),
    address: yup
      .string()
      .required("Address name is required"),
    city: yup
      .string()
      .required("City is required"),
    state: yup
      .string()
      .required("State is required"),
    zip: yup
      .string()
      .required("Zip is required"),
    coolingTypeId: yup.string().required("Cooling is required"),
    heatingTypeId: yup.string().required("Heating is required"),
    roofAge: yup
      .string()
      .required("Roof age is required"),
    suiteNum: yup
      .string()
      .required("Suit Num is required"),
    month: yup
      .string()
      .required("Month is required"),
    avgkW: yup
      .string()
      .required("avgkW is required"),
    utilityCharge: yup
      .string()
      .required("Utility Charge is required"),
    estimatedkWPerHour: yup
      .string()
      .required("Estimated kWPerHour is required"),
    yearlyElectricityCost: yup
      .string()
      .required("Yearly Electricity Cost is required"),
    energySupplierId: yup
      .string()
      .required("Energy Supplier is required"),
    // timeZone:yup .string()
    // .required("TimeZone is required"),
  }).required();





  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      systemTypeId: "1",
      buildingTypeId: "1",
    },
    mode: "onChange",
  });

  const handleRadioChange = (value) => {
    setValue("systemTypeId", value);
  };


  const formSubmit = async () => {
    const confirmationResult = await Swal.fire({
      title: "Save Changes?",
      text: "Do you want to save changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      cancelButtonText: "Not Now",
    });
  
    if (confirmationResult.isConfirmed) {
      try {
        const consumptionData = [
          {
            month: getValues("month"),
            avgkW: parseFloat(getValues("avgkW")),
          }
        ];
        const rolesData = [
          {
            roleId: parseInt(getValues("roleId")),
          }
        ];
       
        const data = {
          ...getValues(),
          percentOfEnergyToGenerate: sliderValue,
          consumption: consumptionData,
          roles:rolesData
        };
        const res = dispatch(saveReport(data));
        res.then((response) => {
          // console.log("Response:", response);
        
          if (response.payload.result==true) {
            Swal.fire({
              title: "Great Job!",
              icon: "success",
              text: response.payload.message,
            });
        
            reset();
          } else {
            window.location.href="/login"
            // Swal.fire({
            //   title: "Oops!",
            //   icon: "error",
            //   text: "An error occurred while saving changes.",
            // });
          }
        }).catch((error) => {
          console.error("Error:", error);
        });
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  useEffect(() => {
    dispatch(fetchitemValues(0));
    dispatch(fetchitemValues(1));
    dispatch(fetchitemValues(4));
  }, []);



  const selectCoolingData = (state) => state.itemValue.coolingData || [];
  const selectHeatingData = (state) => state.itemValue.heatingData || [];
  const selectEnergyProviderData = (state) => state.itemValue.energyProviderData || [];

  const coolingData = useSelector(selectCoolingData);
  const heatingData = useSelector(selectHeatingData);
  const energyProviderData = useSelector(selectEnergyProviderData)


  const handleSliderValueChange = (newValue) => {
    setSliderValue(newValue);

  };


  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );


  return (
    <>
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="breadCrumb mt-5">
              <ul>
                <li>Basics</li>
                <span className="Icon">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="12"
                    fill="none"
                    viewBox="0 0 7 12"
                  >
                    <path
                      fill="#A4B0C2"
                      d="M.914 0L0 .903l.457.45L5.17 6 .457 10.646l-.457.45.914.904.457-.453L7 6 1.37.453.915 0z"
                    ></path>
                  </svg>
                </span>
                <li>Panels</li>
                <span className="Icon">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="12"
                    fill="none"
                    viewBox="0 0 7 12"
                  >
                    <path
                      fill="#A4B0C2"
                      d="M.914 0L0 .903l.457.45L5.17 6 .457 10.646l-.457.45.914.904.457-.453L7 6 1.37.453.915 0z"
                    ></path>
                  </svg>
                </span>
                <li>Permit</li>
                <span className="Icon">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="12"
                    fill="none"
                    viewBox="0 0 7 12"
                  >
                    <path
                      fill="#A4B0C2"
                      d="M.914 0L0 .903l.457.45L5.17 6 .457 10.646l-.457.45.914.904.457-.453L7 6 1.37.453.915 0z"
                    ></path>
                  </svg>
                </span>
                <li>Billing/Financing</li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row style={{ padding: "30px 0px 60px" }}>
          <Col lg={4} md={4} sm={12}>
            <SideBar onSliderValueChange={handleSliderValueChange} />
          </Col>
          <Col lg={8} md={8} sm={12}>
            <div className="cardBorder">
              <div className="solarRight">
                <Form onSubmit={handleSubmit(formSubmit)} autoComplete="off">
                  <Row>
                    <Col lg={4} md={4} sm={12}>
                      <div className="solarRightTopbar">
                        <h6 className="text-center">Type of solar</h6>
                        <div className="flex">
                          <Form.Group
                            as={Col}
                            md="6"
                            sm="6"
                            controlId="validationCustom01"
                          >
                            <input
                              type="radio"
                              id="gridTied"
                              name="systemTypeId"
                              value="1"
                              {...register("systemTypeId")}
                              onChange={() => handleRadioChange("1")}

                            />
                            <label htmlFor="gridTied">
                              Grid-Tied
                            </label>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            sm="6"
                            controlId="validationCustom01"
                          >
                            <input
                              type="radio"
                              id="offGrid"
                              value="2"
                              {...register("systemTypeId")}
                              name="systemTypeId"
                              onChange={() => handleRadioChange("2")}
                            />
                            <label htmlFor="offGrid">Off-Grid</label>
                          </Form.Group>
                        </div>
                      </div>
                    </Col>
                    <Col lg={8} md={8} sm={12}>
                      <div className="solarRightTopbar">
                        <h6 className="text-center">Work I will Perform</h6>
                        <div className="flex">
                          <Form.Group
                            as={Col}
                            md="3"
                            sm="3"
                            controlId="validationCustom01"
                          >
                            <input
                              type="checkbox"
                              id="roofer"
                              name="roleId"
                              value="1"
                             // checked={getValues("roleId") === "1"}
                              onChange={(e) => {
                                setValue("roleId", e.target.checked ? "1" : "");
                              }}
                            />
                            <label htmlFor="roofer">Roofer</label>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="3"
                            sm="3"
                            controlId="validationCustom01"
                          >
                            <input
                              type="checkbox"
                              id="electrician"
                              name="roleId"
                              value="2"
                             // checked={getValues("roleId") === "2"}
                              onChange={(e) => {
                                setValue("roleId", e.target.checked ? "2" : "");
                              }}
                            />
                            <label htmlFor="electrician">
                              Electrician
                            </label>
                          </Form.Group>
                          <Form.Group
                            as={Col}
                            md="6"
                            sm="6"
                            controlId="validationCustom01"
                          >
                            <input
                              type="checkbox"
                              id="bearing_analysis"
                              name="roleId"
                              value="3"
                             // checked={getValues("roleId") === "3"}
                              onChange={(e) => {
                                setValue("roleId", e.target.checked ? "3" : "");
                              }}
                            />
                            <label htmlFor="bearing_analysis">
                              PE-Load-Bearing Analysis
                            </label>
                          </Form.Group>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className="alertBar">
                    <div className="alertContent">
                      <p>Save time. Autofill your current location.</p>
                      <Button className="button-medium-default fill-green">
                        Autofill
                      </Button>
                    </div>

                  </div>
                  <Form.Group as={Col}
                    md="12" className="" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" type="text" placeholder="Enter address" error={Boolean(errors.address)}   {...register("address")} />
                    <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.address?.message}</p>
                  </Form.Group>
                  <Row>
                    <div className="flex" style={{ maxWidth: "400px" }}>
                      <Form.Group
                        as={Col}
                        md="6"
                        sm="6"
                        className="mt-2"
                      >
                        <Form.Control
                          type="radio"
                          id="singleFamily"
                          name="buildingTypeId"
                          value="1"
                          {...register("buildingTypeId")}
                          checked
                        />
                        <Form.Label htmlFor="singleFamily">
                          Single Family
                        </Form.Label>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        sm="6"
                        className="mt-2"

                      >
                        <Form.Control type="radio" id="townHome" name="buildingTypeId" />
                        <Form.Label htmlFor="townHome">Townhome</Form.Label>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        sm="6"
                        className="mt-2"


                      >
                        <Form.Control
                          type="radio"
                          id="commercial"
                          name="buildingTypeId"
                        />
                        <Form.Label htmlFor="commercial">Commercial</Form.Label>
                      </Form.Group>
                    </div>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city" type="text" placeholder="City" error={Boolean(errors.city)}   {...register("city")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.city?.message}</p>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        name="state" type="text" placeholder="State" error={Boolean(errors.state)}   {...register("state")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.state?.message}</p>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        name="zip" type="text" placeholder="Zip" error={Boolean(errors.zip)}   {...register("zip")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.zip?.message}</p>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Cooling</Form.Label>
                      <div className="flex">
                        <Form.Select
                          aria-label="Default select example"
                          {...register("coolingTypeId")}
                        >
                          <option value="">Choose Cooling Type</option>
                          {coolingData?.map((coolingType) => (
                            <option value={coolingType.id}
                            >
                              {coolingType.description}
                            </option>
                          ))}
                        </Form.Select>

                        <Link title="Cooling Type" id="t-1" className="toolTip">
                          <span className="toolTip">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill="#747787"
                                d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 00.241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.424.927 1.009.927z"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.coolingTypeId?.message}</p>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Heating</Form.Label>
                      <Form.Select
                        {...register("heatingTypeId")} aria-label="Default select example">
                        <option value="">Choose Heating Type</option>
                        {heatingData?.map((heatingType) => (
                          <option value={heatingType.id}
                          >
                            {heatingType.description}
                          </option>))}
                      </Form.Select>
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.heatingTypeId?.message}</p>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>
                        Age of roof <small>(in years)</small>
                      </Form.Label>
                      <div>
                        <div className="flex">
                          <Form.Control
                            name="roofAge" type="text" placeholder=""  {...register("roofAge")}
                          />
                          <Link title="Age of roof" id="t-2" className="toolTip">
                            <span className="toolTip">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="#747787"
                                  d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 00.241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.424.927 1.009.927z"
                                ></path>
                              </svg>
                            </span>
                          </Link>
                        </div>
                        <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.roofAge?.message}</p>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row className="mt-3">
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>No of Stories</Form.Label>
                      <div>
                        <div className="flex">
                          <Form.Control
                            name="suiteNum" type="text" placeholder="No of stories" error={Boolean(errors.suiteNum)}   {...register("suiteNum")}
                          />
                          <Link
                            title="No of Stories"
                            id="t-3"
                            className="toolTip"
                          >
                            <span className="toolTip">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill="#747787"
                                  d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 00.241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.424.927 1.009.927z"
                                ></path>
                              </svg>
                            </span>
                          </Link>
                        </div>
                        <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.suiteNum?.message}</p>
                      </div>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <span className="subLabel">Avg. kWhrs/month</span>
                      <Form.Label>January</Form.Label>
                      <Form.Control
                        name="consumption.avgkW" type="text" placeholder=""  {...register("avgkW")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.avgkW?.message}</p>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>August</Form.Label>
                      <Form.Control
                        name="consumption.month" type="text" placeholder=""   {...register("month")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.month?.message}</p>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>
                        Utility Charge <small>(cents per kWH)</small>
                      </Form.Label>
                      <Form.Control
                        name="utilityCharge" type="text" placeholder="" {...register("utilityCharge")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.utilityCharge?.message}</p>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Est. kWhrs Consumed</Form.Label>
                      <Form.Control
                        name="estimatedkWPerHour" type="text" placeholder="" error={Boolean(errors.estimatedkWPerHour)}   {...register("estimatedkWPerHour")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.estimatedkWPerHour?.message}</p>

                      <div className="flex mt-3">
                        <button className="btn-secondary-default">
                          Restore Original Value
                        </button>
                        <Link
                          title="Restore original value"
                          id="t-t"
                          className="toolTip"
                        >
                          <span className="toolTip">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill="#747787"
                                d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 00.241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.424.927 1.009.927z"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Yearly Electricity Cost</Form.Label>
                      <Form.Control
                        name="yearlyElectricityCost" type="text" placeholder="" error={Boolean(errors.yearlyElectricityCost)}   {...register("yearlyElectricityCost")}
                      />
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.yearlyElectricityCost?.message}</p>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Energy Provider</Form.Label>
                      <div className="flex">
                        <Form.Select
                          aria-label="Default select example"
                          {...register("energySupplierId")}
                        >
                          <option value="">Choose Energy Provider</option>
                          {energyProviderData?.map((energyProvider) => (
                            <option value={energyProvider.id}
                            >
                              {energyProvider.description}
                            </option>
                          ))}
                        </Form.Select>

                        <Link title="Energy Provider" id="t-1" className="toolTip">
                          <span className="toolTip">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill="#747787"
                                d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 00.241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.424.927 1.009.927z"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                      <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.energySupplierId?.message}</p>
                    </Form.Group>
                    {/* <Form.Group
                      as={Col}
                      md="4"
                      className="mt-4"
                    >
                      <Form.Label>Energy Provider</Form.Label>
                      <Form.Control
                        name="energySupplierId" type="text" placeholder=""  error={Boolean(errors.energySupplierId)}   {...register("energySupplierId")}
                      />
                     <p style={{color: "red", paddingTop: 3, fontSize: "14px"}}>{errors.energySupplierId?.message}</p>
                    </Form.Group> */}
                    <Form.Group
                      as={Col}
                      md="8"
                      className="mt-4"
                    >
                      <div className="flex">
                        <Form.Label>Net Metering Policy</Form.Label>
                        <Link
                          title="Metering Policy"
                          id="t-4"
                          className="toolTip"
                        >
                          <span className="toolTip">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="none"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill="#747787"
                                d="M16 8A8 8 0 11-.001 8 8 8 0 0116 8zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 00.25.246h.811a.25.25 0 00.25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 00.241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.424.927 1.009.927z"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                      <Form.Select aria-label="Default select example">
                        <option>Choose Metering Policy</option>
                        <option
                          value="Excess power purchased at full retail price"
                          selected
                        >
                          Excess power purchased at full retail price
                        </option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row className="mt-2">
                    <Col>
                      <Button variant="primary" className='w-100 text-center' type="submit">
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}