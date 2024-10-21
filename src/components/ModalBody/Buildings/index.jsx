import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import api from "../../../api";

const Buildings = (buildingName) => {
    const [locations, setLocations] = useState()

    const fetchLocations = async () => {
        const locationData = await api.get("/location/"+buildingName)
        setLocations(locationData.data)
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return(
        <Box m="2vw">
            <Text>Localizações da {buildingName}</Text>
            {locations.map((location) => (
                <Box key={location.location_name} bg="white" p="2vw" m="1vw">
                    <Text key={location.campus}>{location.campus}</Text>
                    <Text key={location.location_name}>{location.location_name}</Text>
                    <Text key={location.description}>{location.description}</Text>
                    <Text key={location.open_time}>{location.open_time}</Text>
                    <Text key={location.closing_time}>{location.closing_time}</Text>
                </Box>
            ))}
        </Box>
    )
}

export default Buildings;