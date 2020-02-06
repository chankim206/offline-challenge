import React, { ReactElement } from "react";

interface Props {
  isMarked: boolean;
  setter: (value: boolean) => void;
  text: string;
  overAll?: boolean;
}

export default function CheckBox({
  isMarked,
  setter,
  text,
  overAll
}: Props): ReactElement {
  const normal: string = "custom-control custom-checkbox custom-control-inline";
  const overHead: string =
    "custom-control custom-checkbox custom-control-inline m16";
  const overHeadText: string = "custom-control-label lead f15";
  const normalText: string = "custom-control-label";
  return (
    <div className={overAll ? overHead : normal}>
      <input
        className="custom-control-input"
        type="checkbox"
        id={text}
        checked={isMarked}
        onChange={() => setter(!isMarked)}
      />
      <label className={overAll ? overHeadText : normalText} htmlFor={text}>
        {text}
      </label>
    </div>
  );
}
