#!/usr/bin/env bash
VAR_DEV_BUILD=$1 # Create variable, equal to first script parameter
if [ "$VAR_DEV_BUILD" == "true" ]; # Check if parameter is empty - set default value
then
echo 'REACT_APP_API_PATH=https://quickapplydev.rakbank.ae' > webapply/.env.production
echo 'REACT_APP_OTP_ENABLE=N' >>webapply/.env.production
echo 'REACT_APP_UPLOAD_PATH=https://uatrmtc.rakbankonline.ae' >>webapply/.env.production
echo 'REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA30iQjaEzThxFY1gouuE3/7Lle7ZhViUATYY7QzZ3UsX623Gi5/624smNQDJAbYDh0wWbwnNeJJOm2DYJYDld↵z67bo8pmsEzRvARWx4hC+4Fdd003sguQJHcr7Rgg+g5+L912VZmmdW3c1H4v6IOz↵HINla+HUTeDKw/d/rDi/kE6sfeND8tMCo5hbKkRIe356bYyoEMHwY1f/fss0T5Q/wGWPwLvZwJHDv4vDErrwv7xcC/C5v9PRHXRNmchYyi3lhVqDFbLilfSreD6zdIBXvBAgzGb9Ovd+Uqa5ju/v9jy48W7MoJLgkZpCYrNr6pk4mUwU6n6ar3NeVQjXxiwv1iyyT2M02IKlCWEMo4trco96Whr29e79g32S/vpA5Ab+jU12N1X+L+qRcHtlo3dLnt9EKFYVEGxLl1hmVEpkJ0rGRrQWikkPw0bq+csW0GjFXsVaWl4eaOW9M4iavSRY↵b64BBpZ4XgltcieSdQWp33yrzvhh+0MPzOxkmxyyc/Z7sp1WWbs4Fz5ymuyr+xnP↵7kYNhopMOBgmIvjX0DZTOC90QaHhtit361GbWSeJQfX9oCYMaQQRg3W+mToUMa/hoEERY2QJf1Np8Y+cObrbhwPQWjQOIFK/I0MAPoDUFvtV2/xg+hPoxoasN/oBC6wvBhr1Z9R2UOWEm+2cbz8mZFkCAwEAAQ==-----END PUBLIC KEY-----"' >>webapply/.env.production
else
echo 'REACT_APP_API_PATH=https://quickapplyuat.rakbank.ae' > webapply/.env.production
echo 'REACT_APP_OTP_ENABLE=Y' >>webapply/.env.production
echo 'REACT_APP_UPLOAD_PATH=https://uatrmtc.rakbankonline.ae' >>webapply/.env.production
echo 'REACT_APP_RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA30iQjaEzThxFY1gouuE3/7Lle7ZhViUATYY7QzZ3UsX623Gi5/624smNQDJAbYDh0wWbwnNeJJOm2DYJYDld↵z67bo8pmsEzRvARWx4hC+4Fdd003sguQJHcr7Rgg+g5+L912VZmmdW3c1H4v6IOz↵HINla+HUTeDKw/d/rDi/kE6sfeND8tMCo5hbKkRIe356bYyoEMHwY1f/fss0T5Q/wGWPwLvZwJHDv4vDErrwv7xcC/C5v9PRHXRNmchYyi3lhVqDFbLilfSreD6zdIBXvBAgzGb9Ovd+Uqa5ju/v9jy48W7MoJLgkZpCYrNr6pk4mUwU6n6ar3NeVQjXxiwv1iyyT2M02IKlCWEMo4trco96Whr29e79g32S/vpA5Ab+jU12N1X+L+qRcHtlo3dLnt9EKFYVEGxLl1hmVEpkJ0rGRrQWikkPw0bq+csW0GjFXsVaWl4eaOW9M4iavSRY↵b64BBpZ4XgltcieSdQWp33yrzvhh+0MPzOxkmxyyc/Z7sp1WWbs4Fz5ymuyr+xnP↵7kYNhopMOBgmIvjX0DZTOC90QaHhtit361GbWSeJQfX9oCYMaQQRg3W+mToUMa/hoEERY2QJf1Np8Y+cObrbhwPQWjQOIFK/I0MAPoDUFvtV2/xg+hPoxoasN/oBC6wvBhr1Z9R2UOWEm+2cbz8mZFkCAwEAAQ==-----END PUBLIC KEY-----"' >>webapply/.env.production
fi

VAR_ENCRYPTION=$2 # Create variable, equal to first script parameter
if [ "$VAR_ENCRYPTION" == "Y" ]; # Check if parameter is empty - set default value
then
echo 'REACT_APP_RECAPTCHA_ENABLE=Y' >> webapply/.env.production
echo 'REACT_APP_ENCRYPTION_ENABLE=Y' >> webapply/.env.production
else
echo 'REACT_APP_RECAPTCHA_ENABLE=N' >> webapply/.env.production
echo 'REACT_APP_ENCRYPTION_ENABLE=N' >> webapply/.env.production
fi
cat webapply/.env.production