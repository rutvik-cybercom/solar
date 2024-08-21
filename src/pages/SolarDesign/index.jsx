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
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/common/Loader/loader";
import { fetchitemValues, saveReport,getreportValues } from "../../Redux/authAction";
import Header from "../../component/common/header/Header";
import validationSchema from '../../component/common/validationSchema/validationschema'; 
import { geoLocation } from "../../Redux/geoLocationSlice";
import {zipCodeLocation} from "../../Redux/zipcodeSlice"
import { autocompleteLocation } from "../../Redux/autocompleteSlice";
import { fetchGeolocationDetails } from "../../Redux/placeIdSlice";

export default function SolarDesign() {
  const dispatch = useDispatch();

  const [stateData, setStateData] = useState({
    sliderValue: 80,
    getReportSlider: 0,
    getReportParameter: 0,
    selectedCoolingType: "",
    selectedHeatingType: "",
    selectedEnergySupplierType: "",
    predictions: [],
    mapCenter: { lat: 0, lng: 0 },
    address:"",
    city:"",
    state:"",
    zip:"",
  });

  const { userToken } = useSelector((state) => state?.auth);
  const selectCoolingData = (state) => state.itemValue.coolingData || [];
  const selectHeatingData = (state) => state.itemValue.heatingData || [];
  const selectEnergyProviderData = (state) => state.itemValue.energyProviderData || [];
  const getReportData = (state) => state.getReport.data || [];
  const geolocationData = (state) => state.geoLocation.geodata || [];
  const zipcodelocationData = (state) => state.zipLocation.zipdata || [];
  const addressSearchData = (state) => state.searchLocation.autodata || [];
  const placeIdData = (state) => state.placeIdLocation.placedata || [];
  const isLoading = useSelector((state) => state.getReport.loading);

  const coolingData = useSelector(selectCoolingData);
  const heatingData = useSelector(selectHeatingData);
  const energyProviderData = useSelector(selectEnergyProviderData)
  const geolocation = useSelector(geolocationData);
  const zipcodelocation = useSelector(zipcodelocationData);
  const searchAddresData = useSelector(addressSearchData);
  const placeIdDetails = useSelector(placeIdData);
  const ReportData = useSelector(getReportData);
  const reportData = ReportData.reportData;
  const reportParameters = ReportData.reportParameters;


  const {register,handleSubmit,getValues,reset,setValue,formState: { errors },} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      systemTypeId: "1",
      buildingTypeId: "1",
      roles: []
    },
    mode: "onChange",
  });

useEffect(() => {
  const { city, state, postalCode, address } = zipcodelocation;
  if (zipcodelocation && city && state && postalCode && address) {
    setStateData((prevState) => ({
      ...prevState,
      address:address,
      state: state,
      city: city,
      zip: postalCode,
    }));
    setValue("address", address);
    setValue("city", city);
    setValue("state", state);
    setValue("zip", postalCode);
  }
}, [zipcodelocation]);


  useEffect(() => {
    if (Array.isArray(searchAddresData)) {
      const updatedPredictions = searchAddresData.map((item) => ({
        address: item.address,
        placeId: item.placeId,
      }));
      if (updatedPredictions && updatedPredictions.length > 0) {
        setStateData((prevState) => ({
          ...prevState,
          predictions: updatedPredictions,
        }));
      }

    }
  }, [searchAddresData]);

  useEffect(() => {
    const { address, city, state, postalCode } = geolocation;
    if(geolocation){
      setStateData((prevState) => ({
        ...prevState,
        address:address,
        state:state,
        city:city,
        zip:postalCode
      }));
      setValue("address", address);
      setValue("city", city);
      setValue("state", state);
      setValue("zip", postalCode);  
    }
  }, [geolocation]);

  useEffect(() => {
    const { address, city, state, postalCode } = placeIdDetails;
    if(placeIdDetails){
    if(address){
      setStateData((prevState) => ({
        ...prevState,
        address: address,
      }));
      setValue("address", address);
    }
    if(city){
      setStateData((prevState) => ({
        ...prevState,
        city: city,
      }));
      setValue("city", city); 
    }
    if(state){
      setStateData((prevState) => ({
        ...prevState,
        state: state,
      }));
      setValue("state", state); 
    }
    if(postalCode){
      setStateData((prevState) => ({
        ...prevState,
        zip: postalCode,
      }));
      setValue("zip", postalCode); 
    }
  }
  }, [placeIdDetails]);

  

  const handleAutofill= async () => {
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            await dispatch(geoLocation({ lat, lon }));
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleZipChange = async (e) => {
    let zipCode = e.target.value;

    setStateData((prevState) => ({
          ...prevState,
          zip:zipCode
        }));

      const data = {
        zipcode: zipCode,
        lat: 0,
        lon: 0
      };
      try {
        await dispatch(zipCodeLocation(data));
      } catch (error) {
        console.error("Error:", error);
      }
      setValue("zip", zipCode);
  };


  
  const handleAddressChange = async (e) => {
    let selectedAddress = e.target.value;
    const selectedPrediction = stateData.predictions.find(
      (prediction) => prediction.address === selectedAddress
    );

    if(selectedPrediction){
      let data = {
        placeId:selectedPrediction.placeId
      }
      try {
        await dispatch(fetchGeolocationDetails(data));
      } catch (error) {
        console.error("Error:", error);
      }
    }
    const data = {
      searchText: selectedAddress
    };

    setStateData((prevState) => ({
      ...prevState,
      address:selectedAddress
    }));

    if (selectedAddress !== null) {
      setValue("address", selectedAddress);
    }

    try {
      await dispatch(autocompleteLocation(data));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCityChange = (e) =>{
    let value = e.target.value;
    setStateData((prevState) => ({
      ...prevState,
      city:value
    }));
    setValue("city", value);
  }

  const handleStateChange = (e) =>{
    let value = e.target.value;
    setStateData((prevState) => ({
      ...prevState,
      state:value
    }));
    setValue("state", value);

  }
  

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
        const rolesData = getValues("roles");
        const data = {
          ...getValues(),
          percentOfEnergyToGenerate: stateData.sliderValue,
          consumption: consumptionData,
          roles:rolesData
        };
        const res = dispatch(saveReport(data));
        res.then((response) => {
          localStorage.setItem('savedResponse', JSON.stringify(response));
          if (response.payload.result===true) {
            Swal.fire({
              title: "Great Job!",
              icon: "success",
              text: response.payload.message,
            }).then((result) => {
              if (result.isConfirmed) {
               // localStorage.removeItem('response');
                //window.location.reload();
                reset();
                // window.location.reload();
              } 
            });
            // localStorage.removeItem('savedResponse');
            // // reset();
            // window.location.reload();
          } else {
            localStorage.setItem('response','true');
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
    
    const storedResponse = localStorage.getItem('savedResponse');
    if (storedResponse) {
      const data = JSON.parse(storedResponse);
      let response = data.meta.arg;
  
      if (userToken) {
        dispatch(saveReport(response))
          .then((response) => {
            localStorage.setItem('savedResponse', JSON.stringify(response));
            if (response.meta.requestStatus == "fulfilled") {
              dispatch(getreportValues());
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      const coolingTypeId  = response.coolingTypeId;
      const heatingTypeId  = response.heatingTypeId;
      const energySupplierId  = response.energySupplierId;
      const rolesData = response.roles || [];
      document.getElementById("roofer").checked = rolesData?.findIndex(ele => ele?.roleId === 1) !== -1;
      document.getElementById("electrician").checked = rolesData?.findIndex(ele => ele?.roleId === 2) !== -1;
      document.getElementById("bearing_analysis").checked = rolesData?.findIndex(ele => ele?.roleId === 3) !== -1;
     
     
      if (coolingTypeId) {
        setStateData((prevState) => ({
          ...prevState,
          selectedCoolingType: coolingTypeId,
        }));
        setValue("coolingTypeId",coolingTypeId);
      }

      if(heatingTypeId){
        setStateData((prevState) => ({
          ...prevState,
          selectedCoolselectedHeatingTypeingType: heatingTypeId,
        }));
        setValue("heatingTypeId",heatingTypeId);
      }

      if(energySupplierId){
        setStateData((prevState) => ({
          ...prevState,
          selectedEnergySupplierType: energySupplierId,
        }));
      }

      setValue("systemTypeId", response.systemTypeId);
      if(response.city){
        setStateData((prevState) => ({
          ...prevState,
          city: response.city,
        }));
        setValue("city", response.city);
      }
      setValue("roles",rolesData);
      if(response.address){
        setStateData((prevState) => ({
          ...prevState,
          address: response.address,
        }));
        setValue("address", response.address);
      }
      setValue("buildingTypeId", response.buildingTypeId);
      setValue("percentOfEnergyToGenerate", response.percentOfEnergyToGenerate);
      if(response.state){
        setStateData((prevState) => ({
          ...prevState,
          state: response.state,
        }));
        setValue("state", response.state);
      }
      setValue("zip", response.zip);
      if(response.address){
        setStateData((prevState) => ({
          ...prevState,
          zip: response.zip,
        }));
        setValue("zip", response.zip);
      }
      setValue("roofAge", response.roofAge);
      setValue("suiteNum", response.suiteNum);
      setValue("avgkW", response.avgkW);
      setValue("month", response.month);
      setValue("utilityCharge", response.utilityCharge);
      setValue("estimatedkWPerHour", response.estimatedkWPerHour);
      setValue("yearlyElectricityCost", response.yearlyElectricityCost);
      setValue("energySupplierId", response.energySupplierId);
      setStateData((prevState) => ({
        ...prevState,
        sliderValue: response.percentOfEnergyToGenerate,
      }));
    }

    dispatch(fetchitemValues(0));
    dispatch(fetchitemValues(1));
    dispatch(fetchitemValues(4));
  }, []);

 
  useEffect(() => {
    const data = Object.keys(ReportData).length > 0;
    if (data) {
      if(ReportData){
        const response = reportData;  
        const coolingTypeId  = response.coolingTypeId;
        const heatingTypeId  = response.heatingTypeId;
        const energySupplierId  = response.energySupplierId;
        const rolesData = response.roles || [];
        document.getElementById("roofer").checked = rolesData?.findIndex(ele => ele?.roleId === 1) !== -1;
        document.getElementById("electrician").checked = rolesData?.findIndex(ele => ele?.roleId === 2) !== -1;
        document.getElementById("bearing_analysis").checked = rolesData?.findIndex(ele => ele?.roleId === 3) !== -1;
        if (coolingTypeId) {
          setStateData((prevState) => ({
            ...prevState,
            selectedCoolingType: coolingTypeId,
          }));
          setValue("coolingTypeId",coolingTypeId);
        }
  
        if(heatingTypeId){
          setStateData((prevState) => ({
            ...prevState,
            selectedCoolselectedHeatingTypeingType: heatingTypeId,
          }));
          setValue("heatingTypeId",heatingTypeId);
        }
  
        if(energySupplierId){
          setStateData((prevState) => ({
            ...prevState,
            selectedEnergySupplierType: energySupplierId,
          }));
        }


        setValue("systemTypeId",String(response.systemTypeId));

        if(response.city){
          setStateData((prevState) => ({
            ...prevState,
            city: response.city,
          }));
          setValue("city", response.city);
        }
        setValue("roles",rolesData);
        if(response.address){
          setStateData((prevState) => ({
            ...prevState,
            address: response.address,
          }));
          setValue("address", response.address);
        }
        setValue("buildingTypeId", String(response.buildingTypeId));
        setValue("percentOfEnergyToGenerate", response.percentOfEnergyToGenerate);
        if(response.state){
          setStateData((prevState) => ({
            ...prevState,
            state: response.state,
          }));
          setValue("state", response.state);
        }
        setValue("zip", response.zip);
        if(response.address){
          setStateData((prevState) => ({
            ...prevState,
            zip: response.zip,
          }));
          setValue("zip", response.zip);
        }
        setValue("roofAge", response.roofAge);
        setValue("suiteNum", response.suiteNum);
        setValue("avgkW", response.consumption[0].avgkW);
        setValue("month", response.consumption[0].month);
        setValue("utilityCharge", response.utilityCharge);
        setValue("estimatedkWPerHour", response.estimatedkWPerHour);
        setValue("yearlyElectricityCost", response.yearlyElectricityCost);
        setValue("energySupplierId", response.energySupplierId);
        setStateData((prevState) => ({
          ...prevState,
          sliderValue: response.percentOfEnergyToGenerate,
          getReportSlider: response.percentOfEnergyToGenerate,
          getReportParameter: reportParameters,
        }));
      }
    }
}, [ReportData]);


  const handleSliderValueChange = (newValue) => {
    setStateData((prevState) => ({
      ...prevState,
      sliderValue: newValue,
    }));
  };

 const handleCheckboxChange = (roleId) => {
  const currentRoles = getValues("roles");
  const isRoleSelected = currentRoles.some((role) => role.roleId === roleId);

  const updatedRoles = isRoleSelected
    ? currentRoles.filter((role) => role.roleId !== roleId)
    : [...currentRoles, { roleId }];

  setValue("roles", updatedRoles);
};


  const Link = ({ id, children, title }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );

  return (
    <> 
     {isLoading ? (
     <div> 
      <Loader /> 
      </div>
      ) : (
      <>
      <Header/>
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
            <SideBar onSliderValueChange={handleSliderValueChange} getReportSlider={stateData.getReportSlider} getReportParameter={stateData.getReportParameter} />
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
                              value={1}
                              {...register("systemTypeId")}
                              onChange={(e) => 
                                setValue("systemTypeId",e.target.value)}
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
                              name="systemTypeId"
                              value={2}
                              {...register("systemTypeId")}
                              onChange={(e) => setValue("systemTypeId",e.target.value)}
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
                              value={1}
                              onChange={() => handleCheckboxChange(1)}
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
                            value={2}
                            //checked={getValues("roles").includes("2")}
                            onChange={() => handleCheckboxChange(2)}
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
                                value={3}
                                //checked={getValues("roles").includes("3")}
                                onChange={() => handleCheckboxChange(3)}
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
                      <Button className="button-medium-default fill-green" onClick={handleAutofill} >
                        Autofill
                      </Button>
                    </div>

                  </div>
                  <Form.Group as={Col}
                    md="12" className="" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control name="address" type="text" placeholder="Enter address" error={Boolean(errors.address)} 
                    value={stateData.address}
                    onChange={handleAddressChange}
                    list="predictions"
                        />   
                        <datalist id="predictions">
                          {stateData.predictions.map((prediction) => (
                            <option key={prediction.placeId} value={prediction.address} />
                          ))}
                        </datalist>
                    <p style={{ color: "red", paddingTop: 3, fontSize: "14px" }}>{errors.address?.message}</p>
                  </Form.Group>
                  <Row>
                      <div className="flex" style={{ maxWidth: "400px" }}>
                        <Form.Group as={Col} md="6" sm="6" className="mt-2">
                          <Form.Control
                            type="radio"
                            id="singleFamily"
                            name="buildingTypeId"
                            value={1} 
                            {...register("buildingTypeId")}
                            onChange={(e) => setValue("buildingTypeId", e.target.value)}
                          />
                          <Form.Label htmlFor="singleFamily">Single Family</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="6" sm="6" className="mt-2">
                          <Form.Control
                            type="radio"
                            id="townHome"
                            name="buildingTypeId"
                            value={2}
                            {...register("buildingTypeId")}
                            onChange={(e) => setValue("buildingTypeId", e.target.value)}
                          />
                          <Form.Label htmlFor="townHome">Townhome</Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} md="6" sm="6" className="mt-2">
                          <Form.Control
                            type="radio"
                            id="commercial"
                            name="buildingTypeId"
                            value={3}
                            {...register("buildingTypeId")}
                            onChange={(e) => setValue("buildingTypeId", e.target.value)}
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
                        name="city" type="text" placeholder="City" error={Boolean(errors.city)} 
                        value={stateData.city}
                        onChange={handleCityChange}
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
                        name="state" type="text" placeholder="State" error={Boolean(errors.state)}  
                        value={stateData.state}
                        onChange={handleStateChange}
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
                        name="zip" type="text" placeholder="Zip" error={Boolean(errors.zip)} 
                        onChange={handleZipChange}
                        value={stateData.zip}
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
                      <Form.Select aria-label="Default select example" 
                            {...register("coolingTypeId")}
                            value={stateData.selectedCoolingType}
                            onChange={(e)=>{
                              setStateData((prevState) => ({
                                ...prevState,
                                selectedCoolingType: e.target.value,
                              }));
                            }}>
                            <option value="">Choose Cooling Type</option>
                            {coolingData?.map((coolingType) => (
                              <option value={coolingType.id} key={coolingType.id}>
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
                          {...register("heatingTypeId")} 
                          aria-label="Default select example"
                          value={stateData.selectedHeatingType}
                          onChange={(e)=>{
                            setStateData((prevState) => ({
                              ...prevState,
                              selectedHeatingType: e.target.value,
                            }));
                          }}>
                          <option value="">Choose Heating Type</option>
                          {heatingData?.map((heatingType) => (
                            <option key={heatingType.id} value={heatingType.id}>
                              {heatingType.description}
                            </option>
                          ))}
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
                            name="roofAge" type="number" placeholder=""  {...register("roofAge")}
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
                            name="suiteNum" type="number" placeholder="No of stories" error={Boolean(errors.suiteNum)}   {...register("suiteNum")}
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
                        name="consumption.avgkW" type="number" placeholder=""  {...register("avgkW")}
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
                        name="utilityCharge" type="number" placeholder="" {...register("utilityCharge")}
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
                        name="estimatedkWPerHour" type="number" placeholder="" error={Boolean(errors.estimatedkWPerHour)}   {...register("estimatedkWPerHour")}
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
                        name="yearlyElectricityCost" type="number" placeholder="" error={Boolean(errors.yearlyElectricityCost)}   {...register("yearlyElectricityCost")}
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
                          value={stateData.selectedEnergySupplierType}
                          onChange={(e)=>{
                            setStateData((prevState) => ({
                              ...prevState,
                              selectedEnergySupplierType: e.target.value,
                            }));
                          }}>
                          <option value="">Choose Energy Provider</option>
                          {energyProviderData?.map((energyProvider) => (
                            <option value={energyProvider.id} key={energyProvider.id}>
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
      )}
    </>
  );
}
