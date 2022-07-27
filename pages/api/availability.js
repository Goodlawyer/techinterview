const { setup } = require("./../../testdata/genAvailability");
const { Available } = require("./../../models/Availables");

//Setup DB

async function init() {
	await setup();

	//Use this to seed test data
	await Available.deleteMany({});
	await Available.create([{ test: "my test" }]);
}

/*
    We want this endpoint to take in a lawyerId and return a
    lawyers availability by combining their events with their default 
    availability

    default availability: [timestamp, timestamp, timestamp] // I am available at 1, 1:30 and 2
    events: [{                                              // I am not available between 12 and 1:30
        start:timestamp,
        end:timestamp                        
    }]

    In the above example the only timestamp that should be returned is the one at 2pm
*/
export default async function handler(req, res) {
	await init();

	let avail = await Available.find({});
	res.send(avail);
}
