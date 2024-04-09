const apiSettings = {
  employee: (
    type: string,
    data: any,

  ): [Object, Object | null] => [
      {
        method: type,
        url: "/employee",
        data : data
      },
      null,
    ],
};


export default apiSettings;