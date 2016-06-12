// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

//connect to the database
mongoose.connect('mongodb://restapi:restapi@ds023000.mlab.com:23000/chiron-salts'); // connect to our database

//import the salt model
var Salt = require('./app/models/salt');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Call Made');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /salt
// ----------------------------------------------------
router.route('/salt')

    // create a salt (accessed at POST http://localhost:8080/api/salt)
    .post(function(req, res) {
        console.log(req);
        var salt = new Salt();      // create a new instance of the Salt model
        salt.name = req.body.name;  // set the salt name (comes from the request)

        // save the salt and check for errors
        salt.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Salt created!' });
        })
        
    });

router.route('/salt/:search')

    // search for the salt (accessed at GET http://localhost:8080/api/salt/:search)
    .get(function(req, res) {
        Salt.find({
        	// 'name' : '/' + req.params.search + '/'
        	"$text": {
		      "$search": req.params.search
		    }
        }, function(err, salt) {
            if (err)
                res.send(err);
            res.json(salt);
        });
    });

router.route('/salts')
	// get all the salts (accessed at GET http://localhost:8080/api/salts)
	.get(function(req, res) {
		Salt.find(function(err, salts) {
			if (err)
				res.send(err);

			res.json(salts);
		});
	});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);
