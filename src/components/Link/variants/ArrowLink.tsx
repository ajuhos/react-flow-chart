import * as React from 'react'
import { IConfig, ILink, IOnLinkClick, IOnLinkMouseEnter, IOnLinkMouseLeave, IPosition } from '../../../'

function lightenDarkenColor(col: string, amt: number) {
  col = col.slice(1);
  const num = parseInt(col,16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if  (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return "#" + (g | (b << 8) | (r << 16)).toString(16)
}

export interface IArrowLinkProps {
  link: ILink
  config: IConfig
  linkColor: string
  points: string
  isHovered: boolean
  isSelected: boolean
  startPos: IPosition
  endPos: IPosition
  onLinkMouseEnter: IOnLinkMouseEnter
  onLinkMouseLeave: IOnLinkMouseLeave
  onLinkClick: IOnLinkClick
}

export const ArrowLink = ({
  link,
  config,
  linkColor,
  points,
  isHovered,
  isSelected,
  startPos,
  endPos,
  onLinkMouseEnter,
  onLinkMouseLeave,
  onLinkClick,
}: IArrowLinkProps) => {
  const marker = { markerEnd: 'url(#arrowHead)' }

  const startColor = config.linkGradientDelta ? lightenDarkenColor(linkColor, config.linkGradientDelta) : linkColor;
  const endColor = config.linkGradientDelta ? lightenDarkenColor(linkColor, -config.linkGradientDelta) : linkColor;
  const gradientName = linkColor.slice(1);

  return (
    <svg
      style={{
        overflow: 'visible',
        position: 'absolute',
        cursor: 'pointer',
        left: 0,
        right: 0,
      }}
    >
      <defs>
        <marker
          id="arrowHead"
          orient="auto-start-reverse"
          markerWidth="2"
          markerHeight="4"
          refX="0.1"
          refY="2"
        >
          <path d="M0,0 V4 L2,2 Z" fill={endColor} />
        </marker>
        <linearGradient id={`gradient${gradientName}A`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="10%" stopColor={startColor} />
          <stop offset="90%" stopColor={endColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
        <linearGradient id={`gradient${gradientName}B`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="10%" stopColor={startColor} />
          <stop offset="90%" stopColor={endColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
      {/* Main line */}
      <path
          d={points}
          stroke={linkColor}
          strokeWidth="3"
          fill="none"
          {...marker}
      />
      <path
        d={points}
        stroke={`url(#gradient${gradientName}${startPos.y > endPos.y ? 'B' : 'A'})`}
        strokeWidth="3"
        fill="none"
        {...marker}
      />
      {/* Thick line to make selection easier */}
      <path
        d={points}
        stroke={`url(#gradient${gradientName}${startPos.y > endPos.y ? 'B' : 'A'})`}
        strokeWidth="20"
        fill="none"
        strokeLinecap="round"
        strokeOpacity={isHovered || isSelected ? 0.1 : 0}
        onMouseEnter={() => onLinkMouseEnter({ config, linkId: link.id })}
        onMouseLeave={() => onLinkMouseLeave({ config, linkId: link.id })}
        onClick={(e) => {
          onLinkClick({ config, linkId: link.id })
          e.stopPropagation()
        }}
      />
    </svg>
  )
}
