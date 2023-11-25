import { PropsWithChildren } from "react";
import "./EssentialDot.scss";

interface EssentialDotProps extends PropsWithChildren {
  gridUnit: number;
}

export function EssentialDot({ gridUnit }: EssentialDotProps) {
  return (
    <div
      className="essential-dot"
      style={{
        width: `${0.4 * gridUnit}vh`,
        height: `${0.4 * gridUnit}vh`,
      }}
    ></div>
  );
}
