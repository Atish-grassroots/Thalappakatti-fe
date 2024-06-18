import relayService from "../../AppProviders/Axios/hook";

const useCampaign = () => {
  const getCampaignData = async () => {
    try {
      const response = await relayService({
        url: `/Campaigns/fetch`,
        method: "POST",
        data: {
          TenantId: 0,
        },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };

  const generateCampaign = async (dataToSend) => {
    try {
      const response = await relayService({
        url: `/Sales/generateCampaign`,
        method: "POST",
        data: dataToSend,
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };

  const addCampaign = async (values) => {
    const response = await relayService({
      url: `/Campaigns/add`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "response");
    return response;
  };

  return [
    {
      getCampaignData,
      generateCampaign,
      addCampaign,
    },
  ];
};

export default useCampaign;
