// Request Settings for API calls
const apiSettings = {

  employee: (type: string, token:string , data: any): [Object, Object | null] => [
    {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url:
        type === "PUT" || type === "DELETE"
          ? `/employee/${parseInt(data.id)}`
          : "/employee",
      data: type !== "DELETE" ? JSON.stringify(data) : null,
    },
    null,
  ],
};

export default apiSettings;
