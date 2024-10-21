import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import api from "../../../api";

const Buildings = (buildingName) => {
    const [locations, setLocations] = useState()

    const fetchLocations = async () => {
        const locationData = await api.get("/location/"+buildingName)
        setLocations(locationData.data)
    }

    useEffect(
        fetchLocations()
    , [])

    return(
        <Box m="2vw">
            <Text>Localizações da {buildingName}</Text>
            {locations.map((location) => (
                <Box bg="white" p="2vw" m="1vw">
                    <Text>{location.campus}</Text>
                    <Text>{location.location_name}</Text>
                    <Text>{location.description}</Text>
                    <Text>{location.open_time}</Text>
                    <Text>{location.closing_time}</Text>
                </Box>
            ))}
        </Box>
    )
}

export default Buildings;