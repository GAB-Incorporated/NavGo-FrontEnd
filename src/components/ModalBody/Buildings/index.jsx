import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import api from "../../../api";
import styles from './buildings.module.css'

const Buildings = ({buildingID, buildingName}) => {
    const [locations, setLocations] = useState([])

    console.log(buildingID+buildingName)
    const fetchLocations = async () => {
        const locationData = await api.get("/locations/fromBuilding/"+buildingID)
        setLocations(locationData.data)
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return(
        <Box m="2vw">
            <Text textAlign="center">Localizações da {buildingName}</Text>
            {locations.map((location) => (
                <>
                    <Box key={location.location_name} bg="white" p="1vw" m="1vw" w="inherit"
                        borderColor="main.100" borderWidth="10px" borderRadius={30}>
                        <Text className={styles.info} key={location.campus}>{location.campus}</Text>
                        <Flex gap="1vw">
                            <label className={styles.infoLabel}>Nome:</label>
                            <Text className={styles.info} key={location.location_name}>{location.location_name}</Text>
                        </Flex>
                        <Flex gap="1vw">
                            <label className={styles.infoLabel}>Descrição:</label>
                            <Text className={styles.info} key={location.description}>{location.description}</Text>
                        </Flex>
                        <Flex gap="1vw">
                            <label className={styles.infoLabel}>Hora Abertura:</label>
                            <Text className={styles.info} key={location.open_time}>{location.open_time}</Text>
                        </Flex>
                        <Flex gap="1vw">
                            <label className={styles.infoLabel}>Hora Fechamento:</label>
                            <Text className={styles.info} key={location.closing_time}>{location.closing_time}</Text>
                        </Flex>
                    </Box>
                </>
            ))}
        </Box>
    )
}

export default Buildings;