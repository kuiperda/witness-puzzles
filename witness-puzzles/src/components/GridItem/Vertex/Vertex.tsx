import { PropsWithChildren } from "react";
import "./Vertex.scss";

interface VertexProps extends PropsWithChildren {
  active: boolean;
}

export function Vertex({ active, children }: VertexProps) {
  return (
    <div className={`vertex ${active && "vertex-active"}`}>{children}</div>
  );
}
