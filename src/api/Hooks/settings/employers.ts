// Request Settings for API calls
const apiSettings = {
  employee: (
    type: string,
    data: any,

  ): [Object, Object | null] => [
      {
        method: type,
        url: (type === "PUT" || type === "DELETE")  ? `/employee/${parseInt(data.id)}` : "/employee",
        data : (type !== "DELETE") ? JSON.stringify(data) : null,
      },
      null,
    ],
};

export default apiSettings;