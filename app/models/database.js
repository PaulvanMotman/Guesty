// Container object
var db = {
	mod: {}
}

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize('guesty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: '192.168.99.100',
	port: '32768',
	// host: 'localhost',
	dialect: 'postgres'
});


//// Models
// Users
db.mainuser = db.conn.define( 'mainuser', {
	firstname: Sequelize.STRING,
	lastname: Sequelize.STRING,
	email: Sequelize.STRING,
	organisation: Sequelize.STRING,
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	telephone: Sequelize.STRING,
	location: Sequelize.STRING
})




// Synchronise with database
db.conn.sync(  ).then( 
	() => { console.log ( 'Sync succeeded' ) },
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db
