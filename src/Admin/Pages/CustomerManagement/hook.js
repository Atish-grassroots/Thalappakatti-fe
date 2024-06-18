import relayService from "../../AppProviders/Axios/hook";

const customerHook = () => {
  const addCustomerDetails = async (values) => {
    const response = await relayService({
      url: `/Customer/add`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const updateCustomerDetails = async (values, customerId) => {
    const response = await relayService({
      url: `/Customer/update?CustomerId=${customerId}`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const getCustomerDetails = async () => {
    try {
      // Make a GET request to retrieve Customer Details
      const response = await relayService({
        url: `/Customer/fetch`,
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
  const getCustomerDetailsByID = async (cid) => {
    try {
      // Make a GET request to retrieve Customer Details
      const response = await relayService({
        url: `/Customer/fetch`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { TenantId: 0, CustomerId: cid },
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
      addCustomerDetails,
      updateCustomerDetails,
      getCustomerDetails,
      getCustomerDetailsByID,
    },
  ];
};

export default customerHook;
