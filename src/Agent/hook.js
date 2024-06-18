import relayService from "../Admin/AppProviders/Axios/hook";

const useMainContentAPIs = () => {
  const getCustomerDetails = async () => {
    const response = await relayService({
      url: `../Customer/fetch`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { TenantId: 0 },
    });
    return response;
  };

  const getOffers = async () => {
    const response = await relayService({
      url: `/Offers/fetch`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { TenantId: 0 },
    });
    return response;
  };

  const getCampaigns = async () => {
    const response = await relayService({
      url: `/Campaigns/fetch`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { TenantId: 0 },
    });
    return response;
  };

  const getOrders = async () => {
    const response = await relayService({
      url: `/Orders/fetch`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: { TenantId: 0 },
    });
    return response;
  };

  return {
    getCustomerDetails,
    getOffers,
    getCampaigns,
    getOrders
  };
};

export default useMainContentAPIs;