const getHostname = () => {
    const LOCAL_DOMAINS = ["localhost", "127.0.0.1"];
    if (LOCAL_DOMAINS.includes(window.location.hostname)) {
        apiHost = 'http://localhost:8080';
    } else {
        apiHost = window.location.hostname;
    }
}


const getAppConfig = () => {       // App Config

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


const createProspect = (state) => { //Onboard SME Customer
    const usertype = state.segment;
    let apiHost = getHostname();

    return axios.post(`${apiHost}/banks/RAK/usertypes/${usertype}/prospects`, {
        data: state.prospect
    }).catch((err) => {
        console.log(err);
    });
};


const searchProspect = (state) => {        // Search Prospect
    const usertype = state.segment;
    const searchCriteria = state.searchCriteria;
    let apiHost = getHostname();

    return axios.get(`${apiHost}/banks/RAK/usertypes/${usertype}/prospects/search`, {
        data: {
            fname: searchCriteria.fname,
            countryCode: searchCriteria.countryCode,
            mobileNo: searchCriteria.mobileNo,
            leadNumber: searchCriteria.leadNumber,
            tradeLicenseNo: searchCriteria.tradeLicenseNo,
            email: searchCriteria.email,
            eidNumber: searchCriteria.eidNumber,
        }

    }).catch((err) => {
        console.log(err);
    });
};


const getProspectById = (state) => {   //Get SME Prospect
    const prospectId = state.prospectId;
    let apiHost = getHostname();

    return axios.get(`${apiHost}/banks/RAK/usertypes/sme/prospects/${prospectId}`, {
        params: {
            prospectId: prospectId,
        }

    }).catch((err) => {
        console.log(err);
    });
};


const updateProspect = (state) => {   //Update SME Prospect
    const prospect = state.prospect;
    const prospectId = prospect.generalInfo.prospectId;
    const usertype = state.segment;
    let apiHost = getHostname();

    return axios.put(`${apiHost}/banks/RAK/usertypes/${usertype}/prospects/${prospectId}`, {
        data: prospect
    }).catch((err) => {
        console.log(err);
    });
};


const uploadProspectDocument = (state, fieldId) => {    //Upload Prospect Document
    const prospect = state.prospect;
    let apiHost = getHostname();
    const prospectId = prospect.generalInfo.prospectId;
    const formData = new FormData();
    const docfile = document.querySelector(fieldId);
    formData.append("document", docfile.files[0]);

    return axios.post('upload_file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch((err) => {
        console.log(err);
    });
};


const getProspectDocuments = (state) => {   //Get Prospect Documents
    const prospectId = state.prospectId;
    let apiHost = getHostname();

    return axios.get(`${apiHost}/banks/RAK/prospects/${prospectId}/documents`, {
        params: {
            prospectId: prospectId,
        }

    }).catch((err) => {
        console.log(err);
    });
};


const reuploadDocument = (state, fieldId) => {   //Reupload Document
    const prospect = state.prospect;
    let apiHost = getHostname();
    const prospectId = prospect.generalInfo.prospectId;
    const formData = new FormData();
    const docfile = document.querySelector(fieldId);
    formData.append("document", docfile.files[0]);

    return axios.put('upload_file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch((err) => {
        console.log(err);
    });
};


const getDocumentbyId = (state, documentId) => {   //Get Document by Id
    const prospectId = state.prospect.generalInfo.prospectId;
    let apiHost = getHostname();

    return axios.get(`${apiHost}/banks/RAK/prospects/${prospectId}/documents/${documentId}`, {
        params: {
            prospectId: prospectId,
            documentId: documentId,
        }

    }).catch((err) => {
        console.log(err);
    });
};


const login = (state, username, password) => {   //login
    const usertype = state.segment;
    let apiHost = getHostname();

    return axios.post(`${apiHost}/banks/RAK/users/authenticate`, {
        data: username,
        data: password,
    }).catch((err) => {
        console.log(err);
    });
};


const sendVerifyOTP = (state, action, otpToken) => {  //sendVerifyOTP
    const verfiyOTP = state.segment;
    const prospect = state.prospect;
    const prospectId = prospect.generalInfo.prospectId;
    let apiHost = getHostname();

    return axios.post(`${apiHost}/banks/RAK/otp`, {
        data: {
            prospectId: prospectId,
            countryCode: prospect.generalInfo.countryCode,
            mobileNo:  prospect.generalInfo.mobileNo,
            action: action,
            otpToken: otpToken
        }

    }).catch((err) => {
        console.log(err);
    });
};
