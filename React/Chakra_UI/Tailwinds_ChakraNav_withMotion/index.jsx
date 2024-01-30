/**
 * Author Guyycodes
 */
import React, {useState} from "react";
import {Box, VStack, HStack, Flex, Image} from "@chakra-ui/react";
import { LeftSide } from "./leftSide";
import { Nav } from "./nav";
export const LandingPage = () => {

    return(
        <>
            <Box className="leading-normal tracking-normal text-gray-900" fontFamily="'Source Sans Pro', sans-serif">
                <Box className="h-screen pb-14 bg-right bg-cover" backgroundImage="background-image:url('bg.svg')">
                    <Nav/>
                </Box>
            </Box>
        </>
    )

}