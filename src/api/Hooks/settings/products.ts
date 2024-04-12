// Request Settings for API calls
const apiSettings = {
  product: (type: string, data: any): [Object, Object | null] => [
    {
      method: type,
      url:
        type === "PUT" || type === "DELETE"
          ? `/product/${parseInt(data.id)}`
          : "/product",
      data: type !== "DELETE" ? JSON.stringify(data) : null,
    },
    null,
  ],
};

export default apiSettings;
