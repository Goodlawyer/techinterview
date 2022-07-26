import Head from "next/head";
import Image from "next/image";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Grid, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

import { getPricing } from "./../api/pricing";

export default function Home() {
	const queryClient = useQueryClient();
	const { data, isLoading, isError, error } = useQuery(
		["pricing"],
		async () => {
			return await getPricing();
		},
		{ retry: 1 }
	);
	console.log(data, isLoading, isError, error);

	return (
		<Box p="50px">
			<Box p="20px" sx={{ border: "solid 1px rgba(0,0,0,0.29)", borderRadius: "4px", maxWidth: "400px" }}>
				<Grid container justifyContent="center">
					<Grid item>
						<LoadingButton variant="contained" onClick={() => queryClient.invalidateQueries(["pricing"])}>
							This is a button
						</LoadingButton>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

/*
    We would like to show a breakdown of a users legal bill in this format:

    legal item               $40
    legal item              $250
    ----------------------------
    subtotal                $290
    tax                      $10
    total                   $300

    The above data comes from a "pricing" item which is fetched from an api, during the fetch we want to display
    a skeleton loader to show the user that the data is being fetched and disable the button.

    The api is not super stable and will sometimes return errors, if an error is returned we want to provide some
    feedback to the user about what happened and how they can fix the error, we should also provide some way for the user
    to actually fix the error. e.g. a refresh button, refresh the page
*/
