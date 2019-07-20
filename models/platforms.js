module.exports = (sequelize, DataType) => {

    const platforms = sequelize.define('platforms', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url_primary: {
            type: DataType.STRING,
            allowNull: false,
            defaultValue: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        url_logo: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return platforms;
};