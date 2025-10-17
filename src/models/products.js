const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Products = sequelize.define("Products", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
})