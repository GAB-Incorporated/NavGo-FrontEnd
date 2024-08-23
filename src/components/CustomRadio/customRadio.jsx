import { Box, useRadio } from "@chakra-ui/react"
import styles from "./customRadio.module.css"
import PropTypes from "prop-types";

function CustomRadio(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label' className={styles.customBox} bg={props.bg}>
      <input {...input}/>
      <Box
        {...checkbox}
        {...props}
        padding='inherit'  
        _checked={{
          bg: 'yellow.400',
          color: 'black',
          borderColor: 'teal.600',
        }}
        _focus={{
          borderColor: 'black',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

CustomRadio.propTypes = {
  bg: PropTypes.string,       
  children: PropTypes.node,   
};

export default CustomRadio;