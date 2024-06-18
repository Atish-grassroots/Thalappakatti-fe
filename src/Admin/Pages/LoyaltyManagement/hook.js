import relayService from "../../AppProviders/Axios/hook";

const useLoyalty = () => {
  const addLoyalty = async (values) => {
    // const dateParts = date.split("/");
    // const reversedDateFormat = `${dateParts[2]}-${dateParts[1].padStart(
    //   2,
    //   "0"
    // )}-${dateParts[0].padStart(2, "0")}`;
    console.log(values, "values");
    try {
      const response = await relayService({
        url: `/Loyalty/add`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: values,
      });

      return response;
    } catch (err) {
      //   showToast("error", "Eror", err.message);
    }
  };

  const getLoyaltyData = async (offset, limit, sortKey, tenantId) => {
    try {
      const response = await relayService({
        url: `/Loyalty/fetch?Offset=${offset}&Limit=${limit}&SortKey=${sortKey}`,
        method: "POST",
        data: {
          TenantId: tenantId,
        },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };

  const getLoyaltyById = async (
    offset,
    limit,
    sortKey,
    tenantId,
    CustomerId
  ) => {
    try {
      const response = await relayService({
        url: `/Loyalty/fetch?Offset=${offset}&Limit=${limit}&SortKey=${sortKey}`,
        method: "POST",
        data: {
          TenantId: tenantId,
          CustomerId: CustomerId,
        },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };

  return [
    {
      addLoyalty,
      getLoyaltyData,
      getLoyaltyById,
    },
  ];
};

export default useLoyalty;
