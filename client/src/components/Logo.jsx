import { Box, Image } from "@chakra-ui/react";
import React from "react";

function Logo() {
	return (
		<Box
			alignContent={"center"}
			display={"flex"}
			justifyContent="center"
			mt={-15}
		>
			<Image
				pb={1}
				boxSize="200px"
				objectFit="contain"
				src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Logo_of_the_Detroit_Pistons_%282005%E2%80%932017%29.png"
				alt="Pistons Logo"
			/>
		</Box>
	);
}
export default Logo;
