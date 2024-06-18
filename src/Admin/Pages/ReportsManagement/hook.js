import relayService from "../../AppProviders/Axios/hook";

const useReport = () => {
  const getCDR = async (StartDate, EndDate, SipId) => {
    try {
      const response = await relayService({
        url: `/Voice/cdrreports?StartDate=${StartDate}&EndDate=${EndDate}&sipAgentID=${SipId}`,
        method: "GET",
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };
  const fetchLoyality = async () => {
    try {
      const response = await relayService({
        url: `/Loyalty/fetch`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: { TenantId: 0 },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };
  return [
    {
      getCDR,
      fetchLoyality,
    },
  ];
};

export default useReport;
