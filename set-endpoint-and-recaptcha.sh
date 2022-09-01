#!/usr/bin/env bash
VAR_env_to_deploy=$1 # Create variable, equal to first script parameter
if [ "$VAR_env_to_deploy" == "develop" ]; # Check if parameter is empty - set default value
then
    echo 'REACT_APP_API_PATH=https://quickapplydev.rakbank.ae' > webapply/.env.production
    echo 'REACT_APP_OTP_ENABLE=N' >> webapply/.env.production
    echo 'REACT_APP_UPLOAD_PATH=https://quickapplydev.rakbank.ae' >> webapply/.env.production
    echo 'REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA30iQjaEzThxFY1gouuE3\\n/7Lle7ZhViUATYY7QzZ3UsX623Gi5/624smNQDJAbYDh0wWbwnNeJJOm2DYJYDld\\nz67bo8pmsEzRvARWx4hC+4Fdd003sguQJHcr7Rgg+g5+L912VZmmdW3c1H4v6IOz\\nHINla+HUTeDKw/d/rDi/kE6sfeND8tMCo5hbKkRIe356bYyoEMHwY1f/fss0T5Q/\\nwGWPwLvZwJHDv4vDErrwv7xcC/C5v9PRHXRNmchYyi3lhVqDFbLilfSreD6zdIBX\\nvBAgzGb9Ovd+Uqa5ju/v9jy48W7MoJLgkZpCYrNr6pk4mUwU6n6ar3NeVQjXxiwv\\n1iyyT2M02IKlCWEMo4trco96Whr29e79g32S/vpA5Ab+jU12N1X+L+qRcHtlo3dL\\nnt9EKFYVEGxLl1hmVEpkJ0rGRrQWikkPw0bq+csW0GjFXsVaWl4eaOW9M4iavSRY\\nb64BBpZ4XgltcieSdQWp33yrzvhh+0MPzOxkmxyyc/Z7sp1WWbs4Fz5ymuyr+xnP\\n7kYNhopMOBgmIvjX0DZTOC90QaHhtit361GbWSeJQfX9oCYMaQQRg3W+mToUMa/h\\noEERY2QJf1Np8Y+cObrbhwPQWjQOIFK/I0MAPoDUFvtV2/xg+hPoxoasN/oBC6wv\\nBhr1Z9R2UOWEm+2cbz8mZFkCAwEAAQ==\\n-----END PUBLIC KEY-----"' >> webapply/.env.production
    echo 'REACT_APP_SERVER_ENV=development' >>webapply/.env.production
    #echo 'REACT_APP_CHAT_API_PATH=https://uatrmt.rakbankonline.ae/RMTCHAT/cometd' >> webapply/.env.production
    echo 'REACT_APP_CHAT_API_PATH=https://quickapplydev.rakbank.ae/genesys/cometd' >> webapply/.env.production
    echo 'REACT_APP_AD_APPKEY=EUM-AAD-RVT' >>webapply/.env.production
    echo 'REACT_APP_AD_URL=https://conv.rakbankonline.ae/uatappd/cowebapply' >>webapply/.env.production
    echo 'REACT_APP_RECAPTCHA_ENABLE=N' >> webapply/.env.production
    echo 'REACT_APP_ENCRYPTION_ENABLE=N' >> webapply/.env.production
    elif [ "$VAR_env_to_deploy" == "release" ];
    then
        echo 'REACT_APP_API_PATH=https://quickapplyuat.rakbank.ae' > webapply/.env.production
        echo 'REACT_APP_OTP_ENABLE=N' >> webapply/.env.production
        echo 'REACT_APP_UPLOAD_PATH=https://uatrmtc.rakbankonline.ae/docUploader' >> webapply/.env.production
        echo 'REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA30iQjaEzThxFY1gouuE3\\n/7Lle7ZhViUATYY7QzZ3UsX623Gi5/624smNQDJAbYDh0wWbwnNeJJOm2DYJYDld\\nz67bo8pmsEzRvARWx4hC+4Fdd003sguQJHcr7Rgg+g5+L912VZmmdW3c1H4v6IOz\\nHINla+HUTeDKw/d/rDi/kE6sfeND8tMCo5hbKkRIe356bYyoEMHwY1f/fss0T5Q/\\nwGWPwLvZwJHDv4vDErrwv7xcC/C5v9PRHXRNmchYyi3lhVqDFbLilfSreD6zdIBX\\nvBAgzGb9Ovd+Uqa5ju/v9jy48W7MoJLgkZpCYrNr6pk4mUwU6n6ar3NeVQjXxiwv\\n1iyyT2M02IKlCWEMo4trco96Whr29e79g32S/vpA5Ab+jU12N1X+L+qRcHtlo3dL\\nnt9EKFYVEGxLl1hmVEpkJ0rGRrQWikkPw0bq+csW0GjFXsVaWl4eaOW9M4iavSRY\\nb64BBpZ4XgltcieSdQWp33yrzvhh+0MPzOxkmxyyc/Z7sp1WWbs4Fz5ymuyr+xnP\\n7kYNhopMOBgmIvjX0DZTOC90QaHhtit361GbWSeJQfX9oCYMaQQRg3W+mToUMa/h\\noEERY2QJf1Np8Y+cObrbhwPQWjQOIFK/I0MAPoDUFvtV2/xg+hPoxoasN/oBC6wv\\nBhr1Z9R2UOWEm+2cbz8mZFkCAwEAAQ==\\n-----END PUBLIC KEY-----"' >> webapply/.env.production
        echo 'REACT_APP_SERVER_ENV=development' >>webapply/.env.production
        #echo 'REACT_APP_CHAT_API_PATH=https://uatrmt.rakbankonline.ae/RMTCHAT/cometd' >> webapply/.env.production
        echo 'REACT_APP_CHAT_API_PATH=https://quickapplyuat.rakbank.ae/genesys/cometd' >> webapply/.env.production
        echo 'REACT_APP_AD_APPKEY=EUM-AAD-RVT' >>webapply/.env.production
        echo 'REACT_APP_AD_URL=https://conv.rakbankonline.ae/uatappd/cowebapply' >>webapply/.env.production
        echo 'REACT_APP_RECAPTCHA_ENABLE=Y' >> webapply/.env.production
        echo 'REACT_APP_ENCRYPTION_ENABLE=Y' >> webapply/.env.production
    elif [ "$VAR_env_to_deploy" == "replica" ];
    then
        echo 'REACT_APP_API_PATH=https://quickapplyuat.rakbank.ae:9443' > webapply/.env.production
        echo 'REACT_APP_OTP_ENABLE=Y' >> webapply/.env.production
        echo 'REACT_APP_UPLOAD_PATH=https://uatrmtc.rakbankonline.ae/rdocUploader' >> webapply/.env.production
        echo 'REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA30iQjaEzThxFY1gouuE3\\n/7Lle7ZhViUATYY7QzZ3UsX623Gi5/624smNQDJAbYDh0wWbwnNeJJOm2DYJYDld\\nz67bo8pmsEzRvARWx4hC+4Fdd003sguQJHcr7Rgg+g5+L912VZmmdW3c1H4v6IOz\\nHINla+HUTeDKw/d/rDi/kE6sfeND8tMCo5hbKkRIe356bYyoEMHwY1f/fss0T5Q/\\nwGWPwLvZwJHDv4vDErrwv7xcC/C5v9PRHXRNmchYyi3lhVqDFbLilfSreD6zdIBX\\nvBAgzGb9Ovd+Uqa5ju/v9jy48W7MoJLgkZpCYrNr6pk4mUwU6n6ar3NeVQjXxiwv\\n1iyyT2M02IKlCWEMo4trco96Whr29e79g32S/vpA5Ab+jU12N1X+L+qRcHtlo3dL\\nnt9EKFYVEGxLl1hmVEpkJ0rGRrQWikkPw0bq+csW0GjFXsVaWl4eaOW9M4iavSRY\\nb64BBpZ4XgltcieSdQWp33yrzvhh+0MPzOxkmxyyc/Z7sp1WWbs4Fz5ymuyr+xnP\\n7kYNhopMOBgmIvjX0DZTOC90QaHhtit361GbWSeJQfX9oCYMaQQRg3W+mToUMa/h\\noEERY2QJf1Np8Y+cObrbhwPQWjQOIFK/I0MAPoDUFvtV2/xg+hPoxoasN/oBC6wv\\nBhr1Z9R2UOWEm+2cbz8mZFkCAwEAAQ==\\n-----END PUBLIC KEY-----"' >> webapply/.env.production
        echo 'REACT_APP_SERVER_ENV=development' >>webapply/.env.production
        #echo 'REACT_APP_CHAT_API_PATH=https://uatrmt.rakbankonline.ae/RMTCHAT/cometd' >> webapply/.env.production
        echo 'REACT_APP_CHAT_API_PATH=https://quickapplyuat.rakbank.ae:9443/genesys/cometd' >> webapply/.env.production
        echo 'REACT_APP_AD_APPKEY=EUM-AAD-RVT' >>webapply/.env.production
        echo 'REACT_APP_AD_URL=https://conv.rakbankonline.ae/uatappd/cowebapply' >>webapply/.env.production
        echo 'REACT_APP_RECAPTCHA_ENABLE=Y' >> webapply/.env.production
        echo 'REACT_APP_ENCRYPTION_ENABLE=Y' >> webapply/.env.production
    elif [ "$VAR_env_to_deploy" == "prod" ];
    then
        echo 'REACT_APP_API_PATH=https://quickapply.rakbank.ae' > webapply/.env.production
        echo 'REACT_APP_OTP_ENABLE=Y' >> webapply/.env.production
        echo 'REACT_APP_UPLOAD_PATH=https://rmtc.rakbankonline.ae/docUploader' >> webapply/.env.production
        echo 'REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA30iQjaEzThxFY1gouuE3\\n/7Lle7ZhViUATYY7QzZ3UsX623Gi5/624smNQDJAbYDh0wWbwnNeJJOm2DYJYDld\\nz67bo8pmsEzRvARWx4hC+4Fdd003sguQJHcr7Rgg+g5+L912VZmmdW3c1H4v6IOz\\nHINla+HUTeDKw/d/rDi/kE6sfeND8tMCo5hbKkRIe356bYyoEMHwY1f/fss0T5Q/\\nwGWPwLvZwJHDv4vDErrwv7xcC/C5v9PRHXRNmchYyi3lhVqDFbLilfSreD6zdIBX\\nvBAgzGb9Ovd+Uqa5ju/v9jy48W7MoJLgkZpCYrNr6pk4mUwU6n6ar3NeVQjXxiwv\\n1iyyT2M02IKlCWEMo4trco96Whr29e79g32S/vpA5Ab+jU12N1X+L+qRcHtlo3dL\\nnt9EKFYVEGxLl1hmVEpkJ0rGRrQWikkPw0bq+csW0GjFXsVaWl4eaOW9M4iavSRY\\nb64BBpZ4XgltcieSdQWp33yrzvhh+0MPzOxkmxyyc/Z7sp1WWbs4Fz5ymuyr+xnP\\n7kYNhopMOBgmIvjX0DZTOC90QaHhtit361GbWSeJQfX9oCYMaQQRg3W+mToUMa/h\\noEERY2QJf1Np8Y+cObrbhwPQWjQOIFK/I0MAPoDUFvtV2/xg+hPoxoasN/oBC6wv\\nBhr1Z9R2UOWEm+2cbz8mZFkCAwEAAQ==\\n-----END PUBLIC KEY-----"' >> webapply/.env.production
        echo 'REACT_APP_SERVER_ENV=production' >>webapply/.env.production
        #echo 'REACT_APP_CHAT_API_PATH=https://rmt.rakbankonline.ae/CHAT/cometd' >> webapply/.env.production
        echo 'REACT_APP_CHAT_API_PATH=https://quickapply.rakbank.ae/genesys/cometd' >> webapply/.env.production
        echo 'REACT_APP_AD_APPKEY=EUM-AAB-AWG' >>webapply/.env.production
        echo 'REACT_APP_AD_URL=https://rakbankonline.ae/appd/cowebapply' >>webapply/.env.production
        echo 'REACT_APP_RECAPTCHA_ENABLE=Y' >> webapply/.env.production
        echo 'REACT_APP_ENCRYPTION_ENABLE=Y' >> webapply/.env.production        

else
    exit 1
fi
cat webapply/.env.production