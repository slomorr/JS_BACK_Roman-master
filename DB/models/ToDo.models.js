const Sequelize = require("sequelize");
const { sequelizeInstance } = require("..");

class ToDo extends Sequelize.Model {} 

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: "Title",
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: "",
        },
        isDone: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    },

    {sequelize: sequelizeInstance, underscored: true, modelName: "todo"}
)

module.exports = ToDo;