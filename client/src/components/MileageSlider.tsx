import React, { useState } from "react";
import Slider from "react-input-slider";

interface Props {
  maxMile: number;
  setter: (x: number) => void;
}

export default function MileageSlider({ maxMile, setter }: Props) {
  const [state, setState] = useState({ x: maxMile });
  React.useEffect(() => {
    setter(state.x);
  }, [state.x, setter]);
  return (
    <div className="container">
      <h5>Car Mileage</h5>
      <div>{"Mileages less than :" + state.x}</div>
      <Slider
        styles={{
          track: {
            width: "100%"
          }
        }}
        axis="x"
        xstep={1}
        xmin={0}
        xmax={maxMile}
        x={state.x}
        onChange={({ x }) => setState({ x })}
      />
    </div>
  );
}
