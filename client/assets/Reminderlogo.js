import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={12} cy={12} r={9} fill="#7E869E" fillOpacity={0.25} />
    <Path
      d="M5 2.80385C4.08789 3.33046 3.33046 4.08788 2.80385 5"
      stroke="#222222"
      strokeLinecap="round"
    />
    <Path
      d="M19 2.80385C19.9121 3.33046 20.6695 4.08788 21.1962 5"
      stroke="#222222"
      strokeLinecap="round"
    />
    <Path
      d="M12 6.5V11.75C12 11.8881 12.1119 12 12.25 12H16.5"
      stroke="#222222"
      strokeLinecap="round"
    />
  </Svg>
);
export default SVGComponent;
