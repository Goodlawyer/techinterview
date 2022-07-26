/*
    This function fetches a pricing object from the api
*/
export async function getPricing() {
	console.log("Calling API");
	try {
		let res = await apiCall();
		return res;
	} catch (err) {
		console.log("API error");
		throw err;
	}
}

/*
    PRETEND THIS DOESN'T EXIST, IT'S SERVER SIDE
*/
let count = 0;
async function apiCall() {
	await new Promise((res) => setTimeout(res, 1000));
	if (getRandomInt(3) % 2 === 0) {
		return {
			total: 300,
			subtotal: 290,
			tax: 10,
			lineItems: [
				{ item: "Item 1", cost: 250 },
				{ item: "Item 2", cost: 40 },
			],
			random: getRandomInt(100), //This is to prevent stale data in react-query
		};
	} else {
		throw { code: "ERROR/BAD_REQUEST", message: "Your request could not be processed at this time" };
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
