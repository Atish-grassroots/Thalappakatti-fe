import Dashboard from "../../Dashboard";
import Customers from "../../Pages/CustomerManagement/Customers";
import CustomersForm from "../../Pages/CustomerManagement/CustomersForm";
import { ActiveScheme, AddScheme, ViewScheme } from "../../Pages/Scheme";
import {
  TicketManagement,
  TicketManagementForm,
} from "../../Pages/TicketManagement";
import { Users, UserForm } from "../../Pages/UserManagement";
import { Upload } from "../../Pages/UploadFile";
import { Reports } from "../../Pages/ReportsManagement";

import { Sales, AddSales } from "../../Pages/Sales";
import { Loyalty, LoyaltyForm } from "../../Pages/LoyaltyManagement";
import { Campaign, CreateCampaign } from "../../Pages/Campaign";
import { useParams } from "react-router-dom";



import { SalesCampaign, AddSalesCampaign } from "../../Pages/SalesCampaign";

import ViewTicket from "../../Pages/TicketManagement/ViewTicket";


export const protectedDashboardRoutes = [
  

  { path: "/admin", element: <Dashboard /> },
  { path: "/addscheme", element: <AddScheme /> },
  { path: "/activescheme", element: <ActiveScheme /> },
  { path: "/scheme/viewscheme", element: <ViewScheme /> },
  { path: "/ticketmanagement", element: <TicketManagement /> },
  { path: "/ticketmanagement/viewtickets", element: <ViewTicket /> },
  {
    path: "/ticketmanagement/ticketmanagementform",
    element: <TicketManagementForm />,
  },
  { path: "/customers", element: <Customers /> },
  { path: "/customers/customersform/:id", element: <CustomersForm /> },
  { path: "/user/users", element: <Users /> },
  { path: "/Upload", element: <Upload /> },
  { path: "/user/userform/:userId", element: <UserForm /> },
  { path: "/user/reports", element: <Reports /> },
  { path: "/campaign", element: <Campaign /> },
  { path: "/campaign/createcampaign", element: <CreateCampaign /> },

  { path: "/sales", element: <Sales /> },
  { path: "/addsales/:custId", element: <AddSales /> },
  { path: "/loyalty", element: <Loyalty /> },
  { path: "/loyaltyform/:cId", element: <LoyaltyForm /> },
  { path: "/salescampaign", element: <SalesCampaign /> },
  { path: "/salescampaignform/:sID", element: <AddSalesCampaign /> },
];
