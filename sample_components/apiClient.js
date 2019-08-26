const getHostname = () => {
    const LOCAL_DOMAINS = ["localhost", "127.0.0.1"];
    if (LOCAL_DOMAINS.includes(window.location.hostname)) {
        apiHost = 'http://localhost:8080';
    } else {
        apiHost = window.location.hostname;
    }
}

const getAppConfig = () => {

    let apiHost = getHostname();

    return axios.get(`${apiHost}/webapply/api/state`, {
        params: {
            device: 'desktop',
            role: 'customer',
            segment: 'sme',
            product: 'checking',
            prospectId: 0
        }
    }).catch((err) => {
        console.log(err);
    });
};