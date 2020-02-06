import React, { ReactElement } from "react";

interface Props {
  currentColor: string;
  thisColor: string;
  setColor: (value: string) => void;
  handleKeyBoard: (event: React.KeyboardEvent, color: string) => void;
  text: string;
  exception?: boolean;
}

export default function ColorPicker({
  currentColor,
  thisColor,
  setColor,
  handleKeyBoard,
  text,
  exception
}: Props): ReactElement {
  return (
    <div
      className="circle-content"
      tabIndex={0}
      role="button"
      aria-pressed={thisColor === currentColor ? true : false}
      onClick={() => setColor(thisColor)}
      onKeyPress={e => handleKeyBoard(e, thisColor)}
    >
      {exception && (
        <div
          className={
            thisColor === currentColor
              ? "circle all-color selected"
              : "circle all-color"
          }
        ></div>
      )}
      {!exception && (
        <div
          className={thisColor === currentColor ? "circle selected" : "circle"}
          style={{ backgroundColor: thisColor }}
        ></div>
      )}

      <p>{text}</p>
    </div>
  );
}
