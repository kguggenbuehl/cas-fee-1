class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        return fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }

}

const httpService = new HttpService();
export default httpService;