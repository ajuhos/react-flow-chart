import { IChart } from './chart'
import { IOnLinkCompleteInput } from './functions'

export interface IConfig {
  readonly?: boolean
  snapToGrid?: boolean
  smartRouting?: boolean
  showArrowHead?: boolean
  renderInViewOnly?: boolean
  gridSize?: number
  validateLink?: (props: IOnLinkCompleteInput & { chart: IChart }) => boolean
  nodeProps?: any
  linkGradientDelta?: number
  zoom?: IZoomConfig
  [key: string]: any
}

export interface IZoomConfig {
  transformEnabled?: boolean
  minScale?: number
  maxScale?: number
  pan?: {
    disabled?: boolean
    wheelEnabled?: boolean
  }
  wheel?: {
    disabled?: boolean
    step?: number
    wheelEnabled?: boolean
    touchPadEnabled?: boolean,
  }
  zoomIn?: {
    disabled?: boolean
    step?: number,
  }
  zoomOut?: {
    disabled?: boolean
    step?: number,
  }
}
