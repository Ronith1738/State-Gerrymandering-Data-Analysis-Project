import React from "react";
import { Center, ChakraProvider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import MainPage from "./components/MainPage";
import Title from "./components/Title";

function App() {
    const [showWelcomePage, setShowWelcomePage] = useState(true);

    const handleStartButton = () => {
        setShowWelcomePage(false);
    };
    return (
        <>
            {showWelcomePage ? (
                <>
                    <ChakraProvider>
                        <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"} bgGradient="linear(#325482 50%, transparent 50%)">
                            <Center>
                                <Title handleStartButton={handleStartButton} />
                            </Center>
                        </Flex>
                    </ChakraProvider>
                </>
            ) : (
                <MainPage />
            )}
        </>
    );
}

export default App;
