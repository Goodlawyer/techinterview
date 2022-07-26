import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Grid, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { getPricing } from "../data/pricing";

export default function Home() {
	return (
		<Box p={10}>
			<Box px={2} py={1} sx={{ border: "solid 1px rgba(0,0,0,0.29)", borderRadius: "4px" }}>
				<Typography variant="h6" color="primary">
					Your bill
				</Typography>
				<Grid container justifyContent="center">
					<Grid item>
						<LoadingButton variant="contained">Pay</LoadingButton>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

/*
    We would like to show a breakdown of a users legal bill in this format:

    Your bill
    
    legal item               $40
    legal item              $250
    ----------------------------
    subtotal                $290
    tax                      $10
    total                   $300
                Pay

    The above data comes from a "pricing" item which is fetched from an api, during the fetch we want to display
    a skeleton loader to show the user that the data is being fetched and disable the button.

    The api is not super stable and will sometimes return errors, if an error is returned we want to provide some
    feedback to the user about what happened and how they can fix the error, we should also provide some way for the user
    to actually fix the error. e.g. a refresh button, refresh the page

    Once the user is happy they should be able to click "Pay" to make a payment, we should send all of the payment info to 
    POST /api/pay, and display a success message.
*/
