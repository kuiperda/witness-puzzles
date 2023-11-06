import { ReactNode } from "react"
import "./Vertex.scss"

interface VertexProps {
    essential: boolean,
    incoming: 'u' | 'd' | 'l' | 'r' | null,
    outgoing: 'u' | 'd' | 'l' | 'r' | null,
    active: boolean,
    cu: boolean,
    cd: boolean, 
    cl: boolean,
    cr: boolean,
    incu: boolean,
    incd: boolean,
    incl: boolean,
    incr: boolean,
    outu: boolean,
    outd: boolean,
    outl: boolean,
    outr: boolean,

}

export function Vertex({
    essential = false,
    active,
    cu, 
    cd, 
    cl, 
    cr, 
    incu,
    incd,
    incl,
    incr,
    outu,
    outd,
    outl,
    outr,
} : VertexProps
) {    
    return (
        <div className="vertex-whole">
            <Row>
                <Space></Space>
                {cu ? <Edge active={incu || outu}></Edge> : <Space></Space>}
                <Space></Space>
            </Row>
            <Row>
                {cl ? <Edge active={incl || outl}></Edge> : <Space></Space>}
                <Edge active={active}></Edge>
                {cr ? <Edge active={incr || outr}></Edge> : <Space></Space>}
            </Row>
            <Row>
                <Space></Space>
                {cd ? <Edge active={incd || outd}></Edge> : <Space></Space>}
                <Space></Space>
            </Row>
        </div>
    )

    interface RowProps {
        children?: ReactNode
    }
    function Row({
        children
    }:RowProps) {
        return (
            <div className="vertex-row">
                {children}
            </div>
        )
    }
    
    interface SpaceProps {
        children?: ReactNode
    }
    function Space({
        children 
    }:SpaceProps) {
        return (
            <span className="vertex-space">
                {children}
            </span>
        )
    }
    
    interface EdgeProps {
        children?: ReactNode
        active?: boolean
    }
    function Edge({
        children,
        active = false,
    }:EdgeProps) {
        return (
            <span className={`vertex-edge ${active && "vertex-edge-active"}`}>
                {children}
            </span>
        )
    }
}

