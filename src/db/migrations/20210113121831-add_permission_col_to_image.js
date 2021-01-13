module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn("Images", "permission", {
        type: Sequelize.ENUM('private', 'public'),
        defaultValue: 'public',
      }),
    ]),

  down: async (queryInterface) => {
    return Promise.all([queryInterface.changeColumn("images", "permission")]);
  },
};
