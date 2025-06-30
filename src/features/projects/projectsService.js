import axios from "axios";
import { base_url } from "../../utils/baseurl";

const getAllProjects = async (builderId) => {

  const response = await axios.get(`${base_url}/api/builders/${builderId}/projects`);

  console.log( "project slice" , response)
  return response.data;
};

// single Property INteractions
// const getProjectAllInteractions = async (data) => {
//   const { propertyId, builderId } = data
//   const response = await axios.get(`${base_url}/properties-interaction/api/interactions/stats?propertyId=${propertyId}&builderId=${builderId}&interactionEntity=PROPERTY`);

//   console.log( "property slice" , response)
//   return response.data;
// };



const propertiesService = {
  getAllProjects,
  // getProjectAllInteractions
 
};

export default propertiesService;
