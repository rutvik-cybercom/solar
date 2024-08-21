import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const backendURL = 'https://api-dev.apwsolar.com/api'

export const fetchitemValues = createAsyncThunk('values/fetchitem', async (itemValueType) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${backendURL}/item-values/get-item-values?itemValueType=${itemValueType}`, config);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const getreportValues = createAsyncThunk('values/getreport', async () => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      },
    };
    const response = await fetch(`${backendURL}/report/get-reports`, config);
    const data = await response.json();
    return data.result[0];
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const forgetPassword = createAsyncThunk('auth/forgetpassword', async ({ email }, { rejectWithValue }) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${backendURL}/account/forgot-password?email=${email}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log(error.message);
  }
});


export const resetPassword = createAsyncThunk('auth/resetpassword', async ({ email,password,token }, { rejectWithValue }) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,password,token})
    };
    const response = await fetch(`${backendURL}/account/reset-password`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.log(error.message);
  }
});


export const userLogin = createAsyncThunk('auth/loginn', async ({ username, password }, { rejectWithValue }) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };
    const response = await fetch(`${backendURL}/account/signin`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if(data.message === "Success"){
      localStorage.setItem("userToken", data?.result?.token);
      localStorage.setItem("userData", data?.result?.firstName);
    }
    return data;
    
  } catch (error) {
    console.log(error.message);
  }
});

export const registerUser = createAsyncThunk('auth/register',async ({ firstName, lastName, email, PhoneNumber, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
       const res = await axios.post(`${backendURL}/account/signup`,{ firstName, lastName, email, PhoneNumber, password },config)
       return res
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


export const saveReport = createAsyncThunk('auth/saveReport', async ({
  systemTypeId,
  address,
  city,
  state,
  zip,
  buildingTypeId,
  coolingTypeId,
  heatingTypeId,
  roofAge,
  suiteNum,
  consumption,
  utilityCharge,
  estimatedkWPerHour,
  yearlyElectricityCost,
  percentOfEnergyToGenerate,
  energySupplierId,
  roles,
  timeZone
}, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      },
    };

    const parsedSystemTypeId=parseInt(systemTypeId)
    const parseBuildingTypeId=parseInt(buildingTypeId)
    const parsedCoolingTypeId = parseInt(coolingTypeId);
    const parsedHeatingTypeId = parseInt(heatingTypeId);
    const parsedRoofAge = parseFloat(roofAge);
    const parsedUtilityCharge = parseFloat( utilityCharge);
    const parsedEstimatedkWPerHour=parseFloat(estimatedkWPerHour)
    const parsedsuiteNum=parseFloat(suiteNum)
    const parsedYearlyElectricityCost=parseFloat(yearlyElectricityCost)
    const parsedPercentOfEnergyToGenerate=parseFloat(percentOfEnergyToGenerate)
    const parsedEnergySupplierId=parseInt(energySupplierId)


    const res = await axios.post(`${backendURL}/report/save-report`, {
      systemTypeId:parsedSystemTypeId,
      roles,
      address,
      city,
      state,
      zip,
      buildingTypeId:parseBuildingTypeId,
      coolingTypeId:parsedCoolingTypeId,
      heatingTypeId:parsedHeatingTypeId,
      roofAge:parsedRoofAge,
      suiteNum:parsedsuiteNum,
      consumption,
      utilityCharge:parsedUtilityCharge,
      estimatedkWPerHour:parsedEstimatedkWPerHour,
      yearlyElectricityCost:parsedYearlyElectricityCost,
      percentOfEnergyToGenerate:parsedPercentOfEnergyToGenerate,
      energySupplierId:parsedEnergySupplierId,
      timeZone
    }, config);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
