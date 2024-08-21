import * as yup from 'yup';

const validationSchema = yup.object({
  systemTypeId: yup.number(),
  buildingTypeId: yup.string(),
  roleId: yup.string(),
  address: yup.string().required("Address name is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip is required"),
  coolingTypeId: yup.string().required("Cooling is required"),
  heatingTypeId: yup.string().required("Heating is required"),
  roofAge: yup.number().required().typeError("Roof age is required"),
  suiteNum: yup.number().required().typeError("Suit Num is required"),
  month: yup.string().required("Month is required"),
  avgkW: yup.string().required("avgkW is required"),
  utilityCharge: yup.number().required().typeError("Utility Charge is required"),
  estimatedkWPerHour: yup.number().required().typeError('Estimated kWPerHour is required'),
  yearlyElectricityCost: yup.number().required().typeError("Yearly Electricity Cost is required"),
  energySupplierId: yup.number().required().typeError("Energy Supplier is required"),
}).required();

export default validationSchema;
