import {
	Box,
	Button,
	Center,
	Heading,
	HStack,
	Image,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";

function Title({ handleStartButton }) {
	return (
		<Box>
			<Logo />
			<Center margin="auto" textAlign="center">
				<SimpleGrid columns={1}>
					<Box
						bg={"white"}
						p={8}
						borderRadius={10}
						boxShadow="1px 5px 5px gray"
					>
						<HStack>
							<VStack width={250}>
								<Heading color="black.300">Alabama</Heading>
								<Image
									pt={15}
									boxSize="175px"
									objectFit="contain"
									src="https://images.squarespace-cdn.com/content/v1/5c96c17de5f7d145081a1f94/1554842197658-YP0X05MG5G3216PKZTGY/Alabama.png"
								/>
							</VStack>
							<Box width={350} textAlign="center">
								<Text fontWeight={"bold"} fontSize="22">
									Preclearance v. Non-Preclearance
								</Text>
								<Text>
									The analysis of racial/ethnic fairness in
									the U.S. political process.
								</Text>
							</Box>
							<VStack width={250}>
								<Heading color="black.300">New Mexico</Heading>
								<Image
									pt={15}
									boxSize="175px"
									objectFit="contain"
									src="https://images.squarespace-cdn.com/content/v1/5c96c17de5f7d145081a1f94/1566487222549-IJQDOGY6FHK0REQIZZ85/New+Mexico.png"
								/>
							</VStack>
						</HStack>
					</Box>
				</SimpleGrid>
			</Center>
			<Box display="flex" justifyContent="center" pt={10}>
				<Button
					bg={"gray.300"}
					color="black"
					onClick={handleStartButton}
				>
					Start
				</Button>
			</Box>
			<Box display="flex" justifyContent="center">
				<SimpleGrid columns={4} spacing={40} pt={10}>
					<Text>Jeremy Brunelle</Text>
					<Text>Hong Wei Chen</Text>
					<Text>Ronith Mudhuganti</Text>
					<Text>Gary Tran</Text>
				</SimpleGrid>
			</Box>
		</Box>
	);
}
export default Title;
