// in your validation file
export const displayErrMsg = (errMsg) => {
  return {
    usernameError: errMsg.includes('Username') ? errMsg : '',
    passwordError: errMsg.includes('Password') ? errMsg : '',
  };
};
