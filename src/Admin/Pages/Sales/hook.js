import relayService from "../../AppProviders/Axios/hook";

const useSales = () => {
  const addSales = async (data) => {
    try {
      const response = await relayService({
        url: `/Sales/add`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          TenantId: 0,
          CustomerName: data.CustomerName,
          Product: data.ProductName,
          Quantity: data.Quantity,
          UnitPrice: data.UnitPrice,
          TotalPrice: data.TotalPrice,
          OrderId: data.orderId,
          SalesDate: data.date,
        },
      });

      return response;
    } catch (err) {
      //   showToast("error", "Eror", err.message);
    }
  };

  const getSales = async (offset, limit, sortKey, tenantId, customerId) => {
    console.log(customerId, "customerId");
    try {
      const response = await relayService({
        url: `/Sales/fetch?Offset=${offset}&Limit=${limit}&SortKey=${sortKey}`,
        method: "POST",
        data: {
          TenantId: tenantId,
          CustomerId: customerId,
        },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };

  const updateSales = async (custId, values) => {
    try {
      const response = await relayService({
        url: `/Sales/update?CustomerId=${custId}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: values,
      });
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };

  return [
    {
      addSales,
      getSales,
      updateSales,
    },
  ];
};

export default useSales;
