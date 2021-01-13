'use strict'

const { sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define( 'ms_products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        unit_id: DataTypes.INTEGER,
        merk: DataTypes.STRING,
        spesification: DataTypes.STRING,
        photo_1: DataTypes.STRING,
        photo_2: DataTypes.STRING,
        photo_3: DataTypes.STRING,
        photo_4: DataTypes.STRING,
        photo_5: DataTypes.STRING,
        is_delete: DataTypes.INTEGER,

        createdAt:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('NOW()'),
            field: 'created_at'
        },
        created_by: DataTypes.INTEGER,
        updatedAt:{
            type: DataTypes.DATE,
            field: 'updated_at'
        },
        updated_by: DataTypes.INTEGER,
    } );

    Product.associate = function(models){
        Product.belongsTo( models.ms_productcategories,{
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            as: 'category'
        } );

        Product.belongsTo(models.ms_units, {
            foreignKey: 'unit_id',
            onDelete: 'CASCADE',
            as: 'unit'
        });
    }

    return Product;
}