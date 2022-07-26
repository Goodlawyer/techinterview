export default function handler(req, res) {
	if (req.method !== "POST") {
		res.status(400).send({ code: "ERROR/METHOD", message: "Only POST methods are allowed" });
	}

	if (getRandomInt(2) % 2 === 0) {
		res.status(200).send({ result: "SUCCESS" });
	} else {
		res.status(400).send({ code: "ERROR/NO_CARD", message: "Your payment could not be processed at this time." });
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
