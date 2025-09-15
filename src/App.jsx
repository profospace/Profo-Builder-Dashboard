// // App.js
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
// import { base_url } from './utils/baseurl';

// import DashboardLayout from './components/Layout/DashboardLayout';
// import PropertiesPage from './pages/PropertiesPage';
// import EnquiriesPage from './pages/EnquiriesPage';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPropertyInteractions, getAllProperties } from './features/properties/propertiesSlice';
// import Performance from './pages/Performance';
// import Settings from './pages/Settings';
// import SignIn from './pages/SignIn';
// import CallbackRequests from './pages/CallbackRequests';
// import Profile from './pages/Profile';

// const App = () => {
//   const dispatch = useDispatch()

//   const [projects, setProjects] = useState([]);
//   const [buildings, setBuildings] = useState([]);
//   const [builderId, setBuilderId] = useState('');
//   // const [isLoading, setIsLoading] = useState(true);

//   const [interactions, setInteractions] = useState([]);
//   const [allActivities, setAllActivities] = useState([]);

//   // ✅ Load builder ID from localStorage once
//   useEffect(() => {
//     const data = localStorage.getItem('builder-id');
//     if (data) {
//       const parsed = JSON.parse(data);
//       if (parsed?.id) {
//         setBuilderId(parsed.id);
//         console.log('builder-id loaded:', parsed.id);
//       } else {
//         console.warn('No builder ID found in localStorage');
//       }
//     }
//   }, []);

//   // ✅ Fetch builder-related data
//   // const fetchBuilderData = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await axios.get(`${base_url}/api/builders/${builderId}/properties`);
//   //     const projectResponse = await axios.get(`${base_url}/api/builders/${builderId}/projects`);

//   //     console.log("response", response)

//   //     const propertiesData = response?.data?.data?.properties || [];
//   //     const projectsData = projectResponse?.data?.data?.projects || [];
//   //     const buildingsData = response?.data?.data?.buildings || [];

//   //     setProperties(propertiesData);
//   //     setProjects(projectsData);
//   //     setBuildings(buildingsData);
//   //   } catch (error) {
//   //     console.error('Error fetching builder data:', error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // ✅ Fetch interactions for a property
//   // const fetchPropertyInteractions = async (propertyId) => {
//   //   setIsLoading(true);
//   //   try {
//   //     const response = await axios.get(
//   //       `${base_url}/properties-interaction/api/interactions/stats?propertyId=${propertyId}&builderId=${builderId}&interactionEntity=PROPERTY`
//   //     );

//   //     const interactionsData = response?.data?.data || [];
//   //     console.log('interactionsData:', interactionsData);

//   //     setInteractions(interactionsData);

//   //     const allActivitiesArray = interactionsData.flatMap((interaction) =>
//   //       interaction.details
//   //         ? interaction.details.map((detail) => ({
//   //           ...detail,
//   //           date: interaction.date,
//   //         }))
//   //         : []
//   //     );

//   //     allActivitiesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//   //     setAllActivities(allActivitiesArray);
//   //   } catch (error) {
//   //     console.error('Error fetching property interactions:', error);
//   //     setInteractions([]);
//   //     setAllActivities([]);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // ✅ When builderId is ready, fetch data
//   // useEffect(() => {
//   //   if (builderId) {
//   //     fetchBuilderData();
//   //     fetchPropertyInteractions('PROP1750859327899');
//   //   }
//   // }, [builderId]);



//   const { properties, propertyInteraction, isLoading, isError, message } = useSelector((state) => state.properties);


//   console.log("properties", properties)
//   useEffect(
//     () => {
//       dispatch(getAllProperties(builderId))
//     }, [builderId]
//   )



//   // Run after properties data is fetched
//   useEffect(() => {
//     if (properties.length > 0) {
//       // dispatch(actionOne(properties));  // Dispatch 1st action
//       // dispatch(actionTwo(properties));  // Dispatch 2nd action
//       properties.forEach(property => {
//         // dispatch(fetchPropertyInteractions({ builderId, property.post_id }))
//         dispatch(fetchPropertyInteractions({ builderId, propertyId: property.post_id }));

//       });
//     }
//   }, [properties, dispatch]);


//   return (
//     <DashboardLayout>
//       <Routes>

//         <Route path="/" element={<Navigate to="/properties" replace />} />

//         <Route
//           path="/signin"
//           element={
//             <SignIn
//             />
//           }
//         />
//         <Route
//           path="/properties"
//           element={
//             <PropertiesPage
//               builderId={builderId}
//               interactions={interactions}
//               isLoading={isLoading}
//             />
//           }
//         />
//         <Route
//           path="/enquiries"
//           element={
//             <EnquiriesPage
//               propertyInteraction={propertyInteraction}
//             />
//           }
//         />
//         <Route
//           path="/performance"
//           element={
//             <Performance
//               // propertyInteraction={propertyInteraction}
//             />
//           }
//         />
//         <Route
//           path="/callbacks"
//           element={
//             <CallbackRequests
//               // propertyInteraction={propertyInteraction}
//             />
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <Profile
//               // propertyInteraction={propertyInteraction}
//             />
//           }
//         />
//         <Route
//           path="/settings"
//           element={
//             <Settings
//               // propertyInteraction={propertyInteraction}
//             />
//           }
//         />
//         <Route path="*" element={<Navigate to="/properties" replace />} />
//       </Routes>
//     </DashboardLayout>
//   );
// };

// export default App;



import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from './utils/baseurl';

import DashboardLayout from './components/Layout/DashboardLayout';
import PropertiesPage from './pages/PropertiesPage';
import EnquiriesPage from './pages/EnquiriesPage';
import Performance from './pages/Performance';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import CallbackRequests from './pages/CallbackRequests';
import Profile from './pages/Profile';

import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyInteractions, getAllProperties } from './features/properties/propertiesSlice';
import { getAllProjects, getProjectAllInteractions } from './features/projects/projectsSlice';
import ProjectsPage from './pages/ProjectsPage';
import BuilderChatPage from './pages/BuilderChatPage';
import BookingsPage from './pages/BookingsPage';
import RmPage from './pages/RmPage';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { properties, propertyInteraction, isLoading, isError, message } = useSelector((state) => state.properties);

  const { projects } = useSelector((state) => state.projects)
  console.log("projects", projects);

  const navigate = useNavigate()
  // Authentication
  const { user } = useSelector((state) => state.auth)
  // console.log("state", user)

  useEffect(
    () => {
      if (!user) {
        navigate('/signin')
      }
    }, []
  )

  // Routes that should NOT use the DashboardLayout
  const publicRoutes = ['/signin'];
  const isPublicRoute = publicRoutes.includes(location.pathname);




  useEffect(() => {
    if (user) {
      dispatch(getAllProperties(user?.id)); // Builder All Property fetch
      dispatch(getAllProjects(user?.id)); // Builder All Projects fetch
    }
  }, [user, dispatch]);

  // Run after properties data is fetched
  useEffect(() => {
    if (properties.length > 0 && user) {
      properties.forEach(property => {
        dispatch(fetchPropertyInteractions({ builderId: user?.id, propertyId: property.post_id }));
      });
    }
  }, [properties, dispatch, user]);
  

  // Run after properties data is fetched
  useEffect(() => {
    if (projects.length > 0 && user) {
      projects.forEach(project => {
        dispatch(getProjectAllInteractions({ builderId: user?.id, projectId: project.projectId }));
      });
    }
  }, [projects, dispatch, user]);


  // useEffect(() => {
  //   const fetchStats = async () => {
  //     if (projects.length > 0 && user) {
  //       for (const project of projects) {
  //         console.log("HI")
  //         try {
  //           const response = await axios.get(
  //             `${base_url}/properties-interaction/api/interactions/stats?projectId=${project?.projectId}&builderId=${user?.id}&interactionEntity=PROJECT`
  //           );
  //           console.log("response", response)
  //           // Do something with response, e.g. dispatch an action
  //         } catch (error) {
  //           console.error("Error fetching stats for project:", project?.projectId, error);
  //         }
  //       }
  //     }
  //   };

  //   fetchStats();
  // }, [projects, dispatch, user]);
  

  // Public Routes Component (without layout)
  const PublicRoutes = () => (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<div>Sign Up Page</div>} />
      <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );

  // Protected Routes Component (with layout)
  const ProtectedRoutes = () => (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/properties" replace />} />
        <Route
          path="/properties"
          element={
            <PropertiesPage
            />
          }
        />
        <Route
          path="/projects"
          element={
            <ProjectsPage
            />
          }
        />
        <Route
          path="/enquiries"
          element={
            <EnquiriesPage
            />
          }
        />
        <Route
          path="/bookings"
          element={
            <BookingsPage
            />
          }
        />
        <Route
          path="/performance"
          element={<Performance />}
        />
        <Route
          path="/callbacks"
          element={<CallbackRequests />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/chat-test"
          element={<BuilderChatPage />}
        />
        <Route
          path="/rm-manager"
          element={<RmPage />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
        <Route path="*" element={<Navigate to="/properties" replace />} />
      </Routes>
    </DashboardLayout>
  );

  // Conditionally render based on route type
  return isPublicRoute ? <PublicRoutes /> : <ProtectedRoutes />;
};

export default App;