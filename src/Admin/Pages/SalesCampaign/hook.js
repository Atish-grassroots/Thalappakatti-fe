import relayService from "../../AppProviders/Axios/hook";

const useSalesCamapaign = () => {
  const AddSalesCampaign = async (values) => {
    try {
      const response = await relayService({
        url: `/Sales/add`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: values,
      });

      return response;
    } catch (err) {
      //   showToast("error", "Eror", err.message);
    }
  };

  const getSalesCampaign = async (
    offset,
    limit,
    sortKey,
    tenantId,
    customerId
  ) => {
    console.log(customerId, "customerId");
    try {
      const response = await relayService({
        url: `/SalesCampaigns/fetch?Offset=${offset}&Limit=${limit}&SortKey=${sortKey}`,
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

  //   const updateSales = async (custId, values) => {
  //     try {
  //       const response = await relayService({
  //         url: `/Sales/update?CustomerId=${custId}`,
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         data: values,
  //       });
  //       return response;
  //     } catch (err) {
  //       //   showToast("error", "Error", err.message);
  //     }
  //   };

  return [
    {
      AddSalesCampaign,
      getSalesCampaign,
      //   updateSales,
    },
  ];
};

export default useSalesCamapaign;
