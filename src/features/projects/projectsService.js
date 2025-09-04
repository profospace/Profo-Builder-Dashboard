import axios from "axios";
import { base_url } from "../../utils/baseurl";

const getAllProjects = async (builderId) => {

  const response = await axios.get(`${base_url}/api/builders/${builderId}/projects`);

  console.log( "project slice" , response)
  return response.data;
};

// single Property INteractions
const getProjectAllInteractions = async (data) => {
  const { projectId, builderId } = data
  const response = await axios.get(`${base_url}/properties-interaction/api/interactions/stats?projectId=${projectId}&builderId=${builderId}&interactionEntity=PROJECT`);

  console.log( "project interactions slice" , response)
  return response.data;
};



const propertiesService = {
  getAllProjects,
  getProjectAllInteractions
 
};

export default propertiesService;
