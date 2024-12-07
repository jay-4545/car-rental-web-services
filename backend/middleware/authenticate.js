const authenticate = (req, res, next, isMainAdminOnly) => {};

const authenticateAdmin = (req, res, next, isMainAdminOnly) => {};

const authenticateMainAdmin = (req, res, next, isMainAdminOnly) => {};

const authenticateUser = (req, res, next, isMainAdminOnly) => {};

module.exports = {
  authenticateAdmin,
  authenticateMainAdmin,
  authenticateUser,
};
