// Container object
var db = {
	mod: {}
}

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize('guesty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	// host: '192.168.99.100',
	// port: '32772',
	host: 'localhost',
	dialect: 'postgres'
});



//// Models
// Users
db.mainuser = db.conn.define( 'mainuser', {
	fbid: Sequelize.STRING,
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING,
	email: Sequelize.STRING,
	photo: Sequelize.STRING,
	organisation: Sequelize.STRING,
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	telephone: Sequelize.STRING,
	location: Sequelize.STRING
})

// Events
db.event = db.conn.define( 'event', {
	name: Sequelize.STRING,
	fbid: Sequelize.STRING
})

/// Declaring the relationships between tables
db.mainuser.hasMany(db.event);
db.event.belongsTo(db.mainuser);

// Synchronise with database
db.conn.sync( {'force': true} ).then( 
	() => { console.log ( 'Sync succeeded' ) },
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db
