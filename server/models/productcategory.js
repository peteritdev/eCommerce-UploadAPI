'use strict'

module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define( 'ms_productcategories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        
        name: DataTypes.STRING,
        is_delete: DataTypes.INTEGER,
        photo: DataTypes.STRING,

        deleted_at: DataTypes.DATE,
        deleted_by: DataTypes.INTEGER,

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

    return ProductCategory;
}