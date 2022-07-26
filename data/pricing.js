import axios from "axios";
/*
    This function fetches a pricing object from the api
*/
export async function getPricing() {
	let res = await axios.get("/api/pricing");
	return res.data;
}
