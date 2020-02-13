#!/usr/bin/env bash
VAR_DEV_BUILD=$1 # Create variable, equal to first script parameter
if [ "$VAR_DEV_BUILD" == "true" ]; # Check if parameter is empty - set default value
then
echo 'REACT_APP_API_PATH=https://quickapplydev.rakbank.ae' > webapply/.env.production
echo 'REACT_APP_OTP_ENABLE=N' >>webapply/.env.production
else
echo 'REACT_APP_API_PATH=https://quickapplyuat.rakbank.ae' > webapply/.env.production
echo 'REACT_APP_OTP_ENABLE=Y' >>webapply/.env.production
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