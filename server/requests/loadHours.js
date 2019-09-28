const express = require("express");
const router = express.Router();
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const cors = require("cors");
const bodyParser = require("body-parser");

// Middleware

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

async function loadTider() {
  const connection = await mongo.connect(url, { useNewUrlParser: true });
  return connection.db("peltier").collection("bookings");
}

router.get("/", async function(req, res) {

 // const dag = req.body.date;
  const jour = await loadTider();
  const day = jour.find({}).toArray();
  const timmar = await day;

  res.send(timmar);
});

/*
router.post('/', async function(req, res) {
	let bookedHours = [];
	const dag = req.body.date;
	const jour = await loadTider();
	const day = jour
		.find({
			date: dag
		})
		.toArray();
	const timmar = await day;

	timmar.forEach((el) => {
		bookedHours.push(el.heure);
	});
	res.send(bookedHours);
});

*/

module.exports = router;
