const { Sequelize } = require("sequelize");

//Создаём instance Sequelize
const sequelizeInstance = new Sequelize({
    dialect: "sqlite",
    storage: "./sqliteData/database.sqlite", //Путь до файла с данными
});

const initDB = async () => {
    try {
        await sequelizeInstance.authenticate(); // Авторизация нашей ORM в БД
        await sequelizeInstance.sync(); // Синхронизация моделей
        console.log("Sequelize was initalized");
    } catch (error) {
        console.log("Sequelize ERROR (initDB)", error);
        process.exit();
    }
};

module.exports = {
    sequelizeInstance,
    initDB
};