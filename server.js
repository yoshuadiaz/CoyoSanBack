const express = require('express');
const Sequelize = require('sequelize');

const app= express();
const port= 8080;

const connection = new Sequelize('dbcoyosan','user','pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'dbcoyosan.sqlite',
    operatorsAliases: false
})

const User = connection.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    mail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false    
    }
})

const Goal = connection.define('Goal', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    price:{
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    months:{
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    id_user:{
        type: Sequelize.INTEGER,
        references:{ 
            model: 'User',
            key: 'id'
        }
    }
}) 

const Saving = connection.define('Saving', {
    amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    id_goal: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Goal',
            key: 'id'
        }
    }
})

const Sensei_health = connection.define('Sensei_health', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }      
})

const Sensei_type = connection.define('Sensei_type', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

const Sensei = connection.define('Sensei', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_goal: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Goal',
            key: 'id'
        }
    },
    id_sensei_health: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Sensei_health',
            key: 'id'
        }
    },
    id_sensei_type: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Sensei_type',
            key: 'id'
        }
    }
})

connection
    .sync({
        logging: console.log
    })
    .then(()=> {
        console.log('Coneccion con database <dbcoyosan> exitosa.');
    })
    .catch(err => {
        console.error('Error 500: Sin conexeción a la base de datos', err);
    });


app.listen(port, ()=>{
    console.log('Servidor conectado corectamente al puerto ' + port);
});
