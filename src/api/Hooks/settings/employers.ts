const apiSettings = {
    employee: (
      type: string,
      data: any,
    ): [Object, Object | null] => [
        {
          url:
            String(
              { employee: "/employee/" }[type]),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json:charset=UTF-8",
          },
          params: data,
        },
        null,
      ],
  };
  
  export default apiSettings;