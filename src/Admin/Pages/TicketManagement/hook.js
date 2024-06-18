import relayService from "../../AppProviders/Axios/hook";

const ticketManagementHook = () => {
  
  const addTicketDetails = async (values) => {
    const response = await relayService({
      url: `/tickets/add`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const updateTicketDetails = async (values, TicketId) => {
    const response = await relayService({
      url: `/tickets/update?TicketId =${TicketId}`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const getTicketDetails = async () => {
    try {
      // Make a GET request to retrieve Customer Details
      const response = await relayService({
        url: `/tickets/fetch`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { TenantId: 0 },
      });
      if (response) {
        return response;
      }
    } catch (err) {
      // Show error message if request fails
    }
  };
  const getTicketDetailsByID = async (tid) => {
    try {
      // Make a GET request to retrieve Customer Details
      const response = await relayService({
        url: `/Customer/fetch`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { TenantId: 0, TicketId: tid },
      });
      if (response) {
        return response;
      }
    } catch (err) {
      // Show error message if request fails
    }
  };

  return [
    {
      addTicketDetails,
      updateTicketDetails,
      getTicketDetails,
      getTicketDetailsByID,
    },
  ];
};

export default ticketManagementHook;
