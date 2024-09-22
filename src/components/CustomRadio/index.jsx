import { Box, useRadio } from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomRadio = ({ children, ...rest }) => {
  const { getInputProps, getRadioProps } = useRadio(rest);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box
      as='label' 
      {...checkbox} 
      {...rest}
    >
      <input {...input} />
      {children}
    </Box>
  );
}

CustomRadio.propTypes = {
  bg: PropTypes.string,
  children: PropTypes.node,
};

export default CustomRadio;
