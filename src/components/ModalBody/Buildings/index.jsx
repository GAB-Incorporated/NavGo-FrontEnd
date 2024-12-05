import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import api from "../../../api";
import styles from './buildings.module.css'

const Buildings = ({buildingID, buildingName}) => {
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchLocations = async () => {
        const locationData = await api.get("/locations/fromBuilding/"+buildingID)
        setLocations(locationData.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchLocations()
    }, [])

    return(
        <Box className={styles.modal}>
            <Text className={styles.modalTitle}>Localizações da {buildingName}</Text>
            {loading ? (
                <Flex className={styles.flexWrapper}>
                    <Spinner color="main.400" thickness="4px"/>
                </Flex>) : locations.length > 0 ? locations.map((location) => (
                <>
                    <Box key={location.location_name} className={styles.locationCard}>
                        <Text className={styles.info} key={location.campus}>{location.campus}</Text>
                        <Flex className={styles.textLine}>
                            <label className={styles.infoLabel}>Nome:</label>
                            <Text className={styles.info} key={location.location_name}>{location.location_name}</Text>
                        </Flex>
                        <Flex className={styles.textLine}>
                            <label className={styles.infoLabel}>Descrição:</label>
                            <Text className={styles.info} key={location.description}>{location.description}</Text>
                        </Flex>
                        <Flex className={styles.textLine}>
                            <label className={styles.infoLabel}>Hora Abertura:</label>
                            <Text className={styles.info} key={location.open_time}>{location.open_time}</Text>
                        </Flex>
                        <Flex className={styles.textLine}>
                            <label className={styles.infoLabel}>Hora Fechamento:</label>
                            <Text className={styles.info} key={location.closing_time}>{location.closing_time}</Text>
                        </Flex>
                    </Box>
                </>
            )) : (
                <>
                    <Flex className={styles.flexWrapper}>
                        <Text className={styles.errorMessage}>A construção não possui localizações registradas!</Text>
                    </Flex>
                </>)}
        </Box>
    )
}

export default Buildings;