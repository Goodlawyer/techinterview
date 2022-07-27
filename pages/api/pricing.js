// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	await new Promise((res) => setTimeout(res, 2000));
	if (getRandomInt(2) % 2 === 0) {
		res.send({
			total: 300,
			subtotal: 290,
			tax: 10,
			lineItems: [
				{ item: "Item 1", cost: 250 },
				{ item: "Item 2", cost: 40 },
			],
			random: getRandomInt(100), //This is to prevent stale data in react-query
		});
	} else {
		res.status(400).send({ code: "ERROR/BAD_REQUEST", message: "Your request could not be processed at this time" });
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
