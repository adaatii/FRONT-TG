// Request Settings for API calls
const apiSettings = {
  category: (type: string, token: string, data: any): [Object, Object | null] => [
    {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url:
        type === "PUT" || type === "DELETE"
          ? `/category/${parseInt(data.id)}`
          : "/category",
      data: type !== "DELETE" ? JSON.stringify(data) : null,
    },
    null,
  ],
};

export default apiSettings;
