import axios from "axios";
import { base_url } from "../../utils/baseurl";

const getAllProperties = async (builderId) => {

  const response = await axios.get(`${base_url}/api/builders/${builderId}/properties`);

  // console.log( "property slice" , response)
  return response.data;
};

// single Property INteractions
const getPropertyAllInteractions = async (data) => {
  const { propertyId, builderId } = data
  const response = await axios.get(`${base_url}/properties-interaction/api/interactions/stats?propertyId=${propertyId}&builderId=${builderId}&interactionEntity=PROPERTY`);

  console.log( "property slice" , response)
  return response.data;
};



const propertiesService = {
  getAllProperties,
  getPropertyAllInteractions
 
};

export default propertiesService;
