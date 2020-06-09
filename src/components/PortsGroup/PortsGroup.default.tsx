import styled, { css } from 'styled-components'
import { IConfig } from '../../'

export interface IPortsGroupDefaultProps {
  config: IConfig
  side: 'top' | 'bottom' | 'left' | 'right'
}

export const PortsGroupDefault = styled.div<IPortsGroupDefaultProps>`
  position: absolute;
  display: flex;
  justify-content: center;

  ${(props) => {
    if (props.side === 'top') {
      return css`
        left: 50%;
        top: -12px;
        flex-direction: row;
        align-items: center;
        > div {
          margin: 0 3px;
        }
      `
    } else if (props.side === 'bottom') {
      return css`
        left: 50%;
        bottom: -12px;
        flex-direction: row;
        align-items: center;
        > div {
          margin: 0 3px;
        }
      `
    } else if (props.side === 'left') {
      return css`
        top: 50%;
        left: -12px;
        flex-direction: column;
        align-items: center;
        > div {
          margin: 3px 0;
        }
      `
    } else {
      return css`
        top: 50%;
        right: -12px;
        flex-direction: column;
        align-items: center;
        > div {
          margin: 3px 0;
        }
      `
    }
  }}
`
