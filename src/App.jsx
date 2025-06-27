// // App.js
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import DashboardLayout from './components/Layout/DashboardLayout';
// import PropertiesPage from './components/PropertiesPage/PropertiesPage';
// import EnquiriesPage from './components/EnquiriesPage';
// import axios from 'axios';
// import { base_url } from './utils/baseurl';


// const App = () => {
//   const [properties, setProperties] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [builderId, setBuilderId] = useState('');
//   const [isLoading, setIsLoading] = useState(true);


//   const [interactions, setInteractions] = useState([])
//   const [allActivities, setAllActivities] = useState([])


//   console.log("interactions", interactions)

//   // Load builder ID from localStorage
//   useEffect(() => {
//     const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//     if (data?.id) {
//       setBuilderId(data.id);
//       console.log("builder-id loaded:", data.id);
//     } else {
//       console.warn("No builder ID found in localStorage");
//     }
//   }, []);

//   // Fetch builder's properties, projects, and buildings
//   const fetchBuilderData = async () => {
//     setIsLoading(true);
//     try {
//       const payload = JSON.parse(localStorage.getItem('builder-id'));
//       if (!payload?.id) {
//         console.error("No builder ID available");
//         setIsLoading(false);
//         return;
//       }

//       console.log(`Fetching builder data for ID: ${payload.id}`);
//       const response = await axios.get(`${base_url}/api/builders/${payload.id}/properties`);
//       console.log("Builder data response:", response.data);

//       const projectResponse = await axios.get(`${base_url}/api/builders/${payload.id}/projects`)
//       console.log("propehectRes", projectResponse?.data?.data?.projects)

//       const propertiesData = response?.data?.data?.properties || [];
//       const projectsData = response?.data?.data?.projects || [];
//       const buildingsData = response?.data?.data?.buildings || [];

//       setProperties(propertiesData);
//       setProjects(projectResponse?.data?.data?.projects);
//       setBuildings(buildingsData);

//       // Calculate total views
//       // calculateTotalViews(propertiesData, projectsData, buildingsData);

//       // Set the first entity as selected by default
//       // if (propertiesData.length > 0) {
//       //   console.log("Setting default property:", propertiesData[0].post_id);
//       //   setSelectedEntityId(propertiesData[0].post_id);
//       //   setSelectedEntityType('PROPERTY');
//       //   await fetchInteraction(propertiesData[0], 'PROPERTY');
//       // } else if (projectsData.length > 0) {
//       //   console.log("Setting default project:", projectsData[0].projectId);
//       //   setSelectedEntityId(projectsData[0].projectId);
//       //   setSelectedEntityType('PROJECT');
//       //   await fetchInteraction(projectsData[0], 'PROJECT');
//       // } else if (buildingsData.length > 0) {
//       //   console.log("Setting default building:", buildingsData[0].buildingId);
//       //   setSelectedEntityId(buildingsData[0].buildingId);
//       //   setSelectedEntityType('BUILDING');
//       //   await fetchInteraction(buildingsData[0], 'BUILDING');
//       // } else {
//       //   console.warn("No properties, projects, or buildings found");
//       // }
//     } catch (error) {
//       console.error("Error fetching builder data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Initial data fetch
//   useEffect(() => {
//     if (builderId) {
//       console.log("Initiating data fetch with builder ID:", builderId);
//       fetchBuilderData();
//     }
//   }, [builderId]);

//   console.log("properties", properties)
//   // console.log("projects", projects)
//   // console.log("buildings", buildings)


//   // ##############################################################

//   useEffect(() => {
//     const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//     if (data?.id) {
//       setBuilderId(data.id);
//       console.log("builder-id loaded:", data.id);
//     } else {
//       console.warn("No builder ID found in localStorage");
//     }
//   }, []);

//   console.log("interactions", interactions)
//   //   // Fetch interactions for a specific property
//   const fetchPropertyInteractions = async (propertyId) => {
//     setIsLoading(true);
//     try {
//       if (!builderId) {
//         console.warn("No builder ID available for interaction fetch");
//         setIsLoading(false);
//         return;
//       }

//       const response = await axios.get(
//         `${base_url}/properties-interaction/api/interactions/stats?propertyId=${propertyId}&builderId=${builderId}&interactionEntity=PROPERTY`
//       );

//       const interactionsData = response?.data?.data || [];
//       console.log("interactionsData", interactionsData)
//       console.log(`Fetched ${interactionsData.length} interaction records`);

//       setInteractions(interactionsData);

//       // Extract all dates with activities
//       // const dates = interactionsData
//       //     .filter(interaction => interaction.details && interaction.details.length > 0)
//       //     .map(interaction => interaction.date);

//       // setHighlightedDates(dates);

//       // Combine all activities from all dates
//       const allActivitiesArray = interactionsData.flatMap(interaction =>
//         interaction.details ? interaction.details.map(detail => ({
//           ...detail,
//           date: interaction.date // Add date to each activity for reference
//         })) : []
//       );

//       // Sort activities by timestamp (newest first)
//       allActivitiesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//       setAllActivities(allActivitiesArray);

//       // Initially show all activities (no date filter)
//       setFilteredActivities(allActivitiesArray);
//       setIsDateFiltered(false);

//     } catch (error) {
//       console.error(`Error fetching property interactions:`, error);
//       setInteractions([]);
//       setAllActivities([]);
//       // setFilteredActivities([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (builderId) {
//       fetchPropertyInteractions("PROP1750859327899");
//     }
//   }, [builderId]);




//   return (
//     <DashboardLayout>
//       <Routes>
//         <Route path="/" element={<Navigate to="/properties" replace />} />
//         <Route path="/properties" element={<PropertiesPage properties={properties} builderId={builderId} interactions={interactions} />} />
//         <Route path="/enquiries" element={<EnquiriesPage />} />
//         <Route path="*" element={<Navigate to="/properties" replace />} />
//       </Routes>
//     </DashboardLayout>
//   );
// };

// export default App;


// App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from './utils/baseurl';

import DashboardLayout from './components/Layout/DashboardLayout';
import PropertiesPage from './components/PropertiesPage/PropertiesPage';
import EnquiriesPage from './components/EnquiriesPage';

const App = () => {
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [builderId, setBuilderId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [interactions, setInteractions] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  // ✅ Load builder ID from localStorage once
  useEffect(() => {
    const data = localStorage.getItem('builder-id');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed?.id) {
        setBuilderId(parsed.id);
        console.log('builder-id loaded:', parsed.id);
      } else {
        console.warn('No builder ID found in localStorage');
      }
    }
  }, []);

  // ✅ Fetch builder-related data
  const fetchBuilderData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}/api/builders/${builderId}/properties`);
      const projectResponse = await axios.get(`${base_url}/api/builders/${builderId}/projects`);

      console.log("response", response)

      const propertiesData = response?.data?.data?.properties || [];
      const projectsData = projectResponse?.data?.data?.projects || [];
      const buildingsData = response?.data?.data?.buildings || [];

      setProperties(propertiesData);
      setProjects(projectsData);
      setBuildings(buildingsData);
    } catch (error) {
      console.error('Error fetching builder data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fetch interactions for a property
  const fetchPropertyInteractions = async (propertyId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${base_url}/properties-interaction/api/interactions/stats?propertyId=${propertyId}&builderId=${builderId}&interactionEntity=PROPERTY`
      );

      const interactionsData = response?.data?.data || [];
      console.log('interactionsData:', interactionsData);

      setInteractions(interactionsData);

      const allActivitiesArray = interactionsData.flatMap((interaction) =>
        interaction.details
          ? interaction.details.map((detail) => ({
            ...detail,
            date: interaction.date,
          }))
          : []
      );

      allActivitiesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setAllActivities(allActivitiesArray);
    } catch (error) {
      console.error('Error fetching property interactions:', error);
      setInteractions([]);
      setAllActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ When builderId is ready, fetch data
  useEffect(() => {
    if (builderId) {
      fetchBuilderData();
      fetchPropertyInteractions('PROP1750859327899');
    }
  }, [builderId]);

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/properties" replace />} />
        <Route
          path="/properties"
          element={
            <PropertiesPage
              properties={properties}
              builderId={builderId}
              interactions={interactions}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/enquiries"
          element={
            <EnquiriesPage
              interactions={interactions}
              allActivities={allActivities}
              isLoading={isLoading}
              builderId={builderId}
            />
          }
        />
        <Route path="*" element={<Navigate to="/properties" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default App;

