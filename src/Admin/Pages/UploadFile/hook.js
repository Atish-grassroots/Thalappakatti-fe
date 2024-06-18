import relayService from "../../AppProviders/Axios/hook";

const useUser = () => {
  const uploadFiles = async (values) => {
    console.log(values, "formData");
    try {
      const uploadResponse = await relayService({
        url: "/S3/UploadFile",
        method: "POST",
        data: values,
      });
      return uploadResponse;
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (offset, limit, sortKey, tenantId) => {
    try {
      const response = await relayService({
        url: `/Users/fetch?Offset=${offset}&Limit=${limit}&SortKey=${sortKey}`,
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
  const getUserById = async (offset, limit, sortKey, tenantId, userId) => {
    try {
      const response = await relayService({
        url: `/Users/fetch?Offset=${offset}&Limit=${limit}&SortKey=${sortKey}`,
        method: "POST",
        data: {
          TenantId: tenantId,
          UserId: userId,
        },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Error", err.message);
    }
  };
  const addUser = async (data, file) => {
    try {
      const url = `/Users/register`;
      const response = await relayService({
        url: url,
        method: "POST",
        data: {
          TenantId: 0,
          TenantName: "gr",
          UserName: data.UserName,
          Email: data.Email,
          Password: data.Password,
          Process: "Adani",
          Team: "Adani",
          Role: data.Role,
          SipPhone: data.SipPhone,
          Phone: data.Phone,
          Avatar: file.image,
        },
      });
      console.log(response, "response");
      return response;
    } catch (err) {
      //   showToast("error", "Eror", err.message);
    }
  };

  return [
    {
      uploadFiles,
      addUser,
      getUser,
      getUserById
    },
  ];
};

export default useUser;
