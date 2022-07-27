import axios from "axios";
/*
    This function fetches a pricing object from the api
*/
export async function getPricing() {
	try {
		let res = await axios.get("/api/pricing");
		return res.data;
	} catch (err) {
		throw new Error("An error occured while fetching your price data, please refresh and try again");
	}
}

export async function makePayment(updateData) {
	try {
		let res = await axios.post("/api/pay", { ...updateData });
		return res.data;
	} catch (err) {
		throw new Error("Could not process your payment, please try again.");
	}
}

export async function getAvailability() {
	let res = await axios.get("/api/availability");
	return res.data;
}
