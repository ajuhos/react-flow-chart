import * as React from 'react'
import {IConfig, INode, ISize, PortsGroupDefault} from '../../'
import ResizeObserver from "react-resize-observer";
import {useEffect, useState} from "react";

export interface IPortsDefaultProps {
  config: IConfig
  node: INode
  children: Array<React.ReactElement<any>>
  onResize: (size: ISize) => void
  scale: number
}

export const PortsDefault = ({ children, config, onResize, scale }: IPortsDefaultProps) => {
  const [ top, setTop ] = useState(0);
  const [ bottom, setBottom ] = useState(0);
  const [ right, setRight ] = useState(0);
  const [ left, setLeft ] = useState(0);
  const [ width, setWidth ] = useState(0);
  const [ height, setHeight ] = useState(0);

  useEffect(() => {
    setWidth(Math.max(top, bottom))
  }, [ top, bottom ]);

  useEffect(() => {
    setHeight(Math.max(left, right))
  }, [ left, right ]);

  useEffect(() => {
    onResize({ width, height })
  }, [ width, height, onResize ]);

  return (
    <div>
      <PortsGroupDefault config={config} side="top" style={{ marginLeft: -top/2 }}>
        <ResizeObserver onResize={(rect) => { setTop(rect.width/scale) }} />
        {children.filter((child) => ['input', 'top'].includes(child.props.port.type))}
      </PortsGroupDefault>
      <PortsGroupDefault config={config} side="bottom" style={{ marginLeft: -bottom/2 }}>
        <ResizeObserver onResize={(rect) => { setBottom(rect.width/scale) }} />
        {children.filter((child) => ['output', 'bottom'].includes(child.props.port.type))}
      </PortsGroupDefault>
      <PortsGroupDefault config={config} side="right" style={{ marginTop: -right/2 }}>
        <ResizeObserver onResize={(rect) => { setRight(rect.height/scale) }} />
        {children.filter((child) => ['right'].includes(child.props.port.type))}
      </PortsGroupDefault>
      <PortsGroupDefault config={config} side="left" style={{ marginTop: -left/2 }}>
        <ResizeObserver onResize={(rect) => { setLeft(rect.height/scale) }} />
        {children.filter((child) => ['left'].includes(child.props.port.type))}
      </PortsGroupDefault>
    </div>
  )
}
