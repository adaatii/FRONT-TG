// Request Settings for API calls
const apiSettings = {
    login: (data: any): [Object, Object | null] => [
        {
            url: '/login',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json:charset=UTF-8',
            },
            data: JSON.stringify(data),
        },
        null,
    ],
};

export default apiSettings;
