import relayService from "../../AppProviders/Axios/hook";

const schemeHook = () => {
  const addOfferDetails = async (values) => {
    const response = await relayService({
      url: `/Offers/add`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const updateOfferDetails = async (values, offerId) => {
    const response = await relayService({
      url: `/Offers/update?OfferId=${offerId}`,
      method: "POST",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const getOfferDetails = async () => {
    try {
      // Make a GET request to retrieve Offers Details
      const response = await relayService({
        url: `/Offers/fetch`,
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
  const getOfferDetailsByID = async (cid) => {
    try {
      // Make a GET request to retrieve Offers Details
      const response = await relayService({
        url: `/Offers/fetch`,
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
      addOfferDetails,
      updateOfferDetails,
      getOfferDetails,
      getOfferDetailsByID,
    },
  ];
};

export default schemeHook;
