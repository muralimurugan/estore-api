

module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal('NOW()')
      }
    });
  
    return Store;
  };