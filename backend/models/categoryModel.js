import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Category = db.define('categories', {
  name: DataTypes.STRING,
}, {
  freezeTableName: true,
});

export default Category;
