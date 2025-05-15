import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define('products', {
  code: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  is_ready: {
    type: DataTypes.BOOLEAN,
  },
  image: {
    type: DataTypes.STRING,
  },
  category_id: {
    type: DataTypes.INTEGER,
  }
}, {
  freezeTableName: true
});

export default Product;
