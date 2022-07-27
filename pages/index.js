import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Grid, Box, Typography, Divider, Skeleton, IconButton, Alert } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import { getPricing, makePayment, getAvailability } from "../data/pricing";

export default function Home() {
	const [success, setSuccess] = useState("");
	const queryClient = useQueryClient();
	const { data, isFetching, isError, error } = useQuery(
		["pricing"],
		async () => {
			return await getPricing();
		},
		{ retry: false }
	);

	const avail = useQuery(
		["availability"],
		async () => {
			return await getAvailability();
		},
		{ retry: false }
	);

	const {
		mutate,
		isError: mutateIsError,
		error: mutateError,
		isLoading: mutateLoading,
	} = useMutation(
		async (updateData) => {
			return await makePayment(updateData);
		},
		{
			onMutate: () => setSuccess(""),
			onSuccess: () => {
				setSuccess("Payment Successful!");
			},
		}
	);

	return (
		<Box p={10}>
			<Box px={2} py={2} sx={{ border: "solid 1px rgba(0,0,0,0.29)", borderRadius: "4px" }}>
				<Grid container justifyContent="space-between">
					<Grid item>
						<Typography variant="h5" color="primary">
							Your bill
						</Typography>
					</Grid>
					<Grid item>
						<IconButton onClick={() => queryClient.invalidateQueries(["pricing"])}>
							<Refresh />
						</IconButton>
					</Grid>
				</Grid>
				<Box mb={1} />

				{isFetching ? (
					<>
						<Skeleton variant="rectangular" height="200px" />
						<Box mb={1} />
						<Skeleton variant="rectangular" height="50px" />
					</>
				) : (
					<>
						{data?.lineItems?.map((lineItem) => {
							return (
								<Grid container key={lineItem?.item} justifyContent="space-between">
									<Grid item>
										<Typography variant="body1">{lineItem?.item || "Not found"}</Typography>
									</Grid>
									<Grid item>
										<Typography variant="body1">${lineItem?.cost || "Not found"}</Typography>
									</Grid>
								</Grid>
							);
						})}
						<Box mb={1} />
						<Divider />
						<Grid mt={1} container justifyContent="space-between">
							<Grid item>
								<Typography variant="body1">Subtotal</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">${data?.subtotal}</Typography>
							</Grid>
						</Grid>
						<Grid container justifyContent="space-between">
							<Grid item>
								<Typography variant="body1">Tax</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body1">${data?.tax}</Typography>
							</Grid>
						</Grid>
						<Grid container justifyContent="space-between">
							<Grid item>
								<Typography variant="h5">Total</Typography>
							</Grid>
							<Grid item>
								<Typography variant="h5">${data?.total}</Typography>
							</Grid>
						</Grid>

						<Grid mt={2} container justifyContent="center">
							<Grid item>
								<LoadingButton
									onClick={() => {
										mutate(data);
									}}
									disabled={isFetching}
									loading={mutateLoading}
									variant="contained"
									sx={{ minWidth: "200px" }}
								>
									Pay
								</LoadingButton>
							</Grid>
						</Grid>
						{!data && !!error && (
							<Alert sx={{ marginTop: "10px" }} color="error" severity="error">
								{error?.message || "An error occured while fetching. Please refresh and try again."}
							</Alert>
						)}
						{!!mutateError && !success && (
							<Alert sx={{ marginTop: "10px" }} color="error" severity="error">
								{mutateError?.message || "An error occured while processing your payment. Please try again."}
							</Alert>
						)}
						{!!success && !mutateError && (
							<Alert sx={{ marginTop: "10px" }} severity="success">
								{success}
							</Alert>
						)}
					</>
				)}
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
