import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./Common/Login";
import Dashboard from "./Admin/Dashboard";
import AgentDashboard from "./Agent/Dashboard";
import Layout from "./Layout/Layout";
import UserProfile from "./Common/UserProfile";
import { protectedDashboardRoutes } from "./Admin/Dashboard/routes/routes";
import { useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import DynamicLogin from "./Common/DynamicLogin";
import InitialPage from "./Common/InitialPage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import TokenCheck from './Common/TokenCheck ';

function App() {
  

  // let { tenantName } = useParams();

  // console.log(tenantName, "app tenantName");

  // let gTenantName = '';


  // const storedToken = localStorage.getItem('token');

  // if (storedToken) {
  //   const decodedToken = jwtDecode(storedToken);
  //   console.log("decodedToken", decodedToken);
  //   gTenantName = decodedToken.userId.TenantName;
  // } else {
  //   gTenantName = tenantName;
  // }

  // let errornavigate = false;

  // console.log(gTenantName, "Dynamic Login tenantName");



  // useEffect(() => {
  //   if (gTenantName === 'undefined') {
  //     throw new Error("Tenant name is undefined");
  //   } else {
  //     axios
  //       .get(`${process.env.REACT_APP_API_BASE_URL}/TenantMaster/getTenants?TenantName=${gTenantName}`)
  //       .then((response) => {
  //         // console.log(response, "response");
  //         console.log(response?.data?.message[0]?.TenantName, "response");
  //         if (response?.data?.message[0]?.TenantName === gTenantName) {
  //           errornavigate = false;
  //         } else {
  //           errornavigate = true;
  //         }
  //       })
  //       .catch((error) => {
  //         // Handle errors
  //       });
  //   }
  // }, [])

  // console.log('gTenantName ::', gTenantName);

  const MainLayout = ({ children }) => {
    return (
      <Layout>
        <main id="main" className="main">
          {children}
        </main>
      </Layout>
    );
  };

  const UserProfileLayout = () => {
    return (
      <MainLayout>
        <UserProfile />
      </MainLayout>
    );
  };


  return (
    <AuthProvider>
      <Router>
      <TokenCheck />
        <Routes>
          {/* {errornavigate ? (
            <> */}
              <Route path="/user-profile" element={<UserProfileLayout />} />
            {/* </>
          ) : (
            <> */}
              {/* <Route path="/login" element={<InitialPage />} /> */}
              {/* <Route path="/:tenantName" element={<DynamicLogin />} /> */}
              <Route path="/" element={<Login />} />
              <Route
                path={`/admin`}
                element={
                  <PrivateRoute allowedRoles={["Admin"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path={`/agent`}
                element={
                  <PrivateRoute allowedRoles={["Agent"]}>
                    <AgentDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/user-profile" element={<UserProfileLayout />} />
              {protectedDashboardRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<MainLayout>{route.element}</MainLayout>}
                />
              ))}
              {/* <Route path="/:tenantName/*" element={<DynamicLogin />} /> */}
            {/* </>
          )} */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
