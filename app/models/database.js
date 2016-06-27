// Container object
var db = {
	mod: {}
}

// Set up sql
var Sequelize = require( 'sequelize' )

if (process.env.DATABASE_URL) {
	pg.defaults.ssl = true;
	pg.connect(process.env.DATABASE_URL, function(err, client) {
	  if (err) throw err;
	  console.log('Connected to postgres! Getting schemas...');

	  client
	    .query('SELECT table_schema,table_name FROM information_schema.tables;')
	    .on('row', function(row) {
	      console.log(JSON.stringify(row));
	    });
	});
} else {
	db.conn = new Sequelize('guesty', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
		host: '192.168.99.100',
		port: '32768',
		// host: 'localhost',
		dialect: 'postgres'
});
}


//// Models
// Users
db.mainuser = db.conn.define( 'mainuser', {
	fbid: Sequelize.BIGINT,
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
	fbeventid: Sequelize.BIGINT,
	owner: Sequelize.STRING,
	location: Sequelize.STRING,
	starttime: Sequelize.STRING,
	cover: Sequelize.STRING,
	attending: Sequelize.JSON,
	attending_count: Sequelize.STRING
})

db.guest = db.conn.define( 'guest', {
	name: Sequelize.STRING,
	guestcount: Sequelize.STRING,
	guestclass: Sequelize.STRING,
	photo: Sequelize.STRING,
	phonenumber: Sequelize.STRING,
	email: Sequelize.STRING,
	fbeventId: Sequelize.STRING,
	clicked: Sequelize.BOOLEAN

})

db.subuser = db.conn.define( 'subuser', {
	email: Sequelize.STRING,
	password: Sequelize.STRING,
	fbeventidsubuser: Sequelize.STRING
})

/// Declaring the relationships between tables
// mainuser
db.mainuser.hasMany(db.event);
db.event.belongsTo(db.mainuser);
// events
db.event.hasMany(db.guest);
db.guest.belongsTo(db.event);
// guestlist
db.mainuser.hasMany(db.guest);
db.guest.belongsTo(db.mainuser);
// subuser
db.mainuser.hasMany(db.subuser)
db.event.hasMany(db.subuser)
db.subuser.belongsTo(db.event)
db.subuser.belongsTo(db.mainuser)
// Synchronise with database
db.conn.sync( {'force': false} ).then( 
	() => { 
		console.log ( 'Sync succeeded' )
	},
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db
