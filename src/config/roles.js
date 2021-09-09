const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getArticles', 'manageArticles']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getArticles', 'manageArticles']);

module.exports = {
  roles,
  roleRights,
};
