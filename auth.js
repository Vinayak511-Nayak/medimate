const jwt = require("jsonwebtoken");
const secretKey = "secretkey for medication";

module.exports = {
  generate_token: async (username) => {
    const token = jwt.sign({ username: username }, secretKey);
    return token;
  },
  verify_token: async (token) => {
    try {
      const tokenWithoutBearer = token.split(" ")[1];
      const decoded = jwt.verify(tokenWithoutBearer, secretKey);
      const username = decoded.username;
      return username;
    } catch (error) {
      return null;
    }
  },
};
