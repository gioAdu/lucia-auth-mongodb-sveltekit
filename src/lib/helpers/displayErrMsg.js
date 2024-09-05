/**
 * Display error messages based on the provided error message.
 * @param {string} errMsg - The error message to be displayed.
 * @returns {object} - An object containing the usernameError and passwordError properties.
 */
export const displayErrMsg = (errMsg) => {
  return {
    usernameError: errMsg.includes('Username') ? errMsg : '',
    passwordError: errMsg.includes('Password') ? errMsg : '',
  };
};
