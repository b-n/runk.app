import React from 'react';
import { hsl } from 'd3-color'

interface SVGIdProps {
  id: string
  className: string
  width: number
  height: number
}

const SVGId: React.FC<SVGIdProps> = ({ id, width, height, className }: SVGIdProps) => {
  const startHue = hsl('#' + id.substring(0,6))
  startHue.s = 0.75;
  startHue.l = 0.6;

  return (
    <svg width={width} height={height} className={className} viewBox="0 0 200 200">
      <defs>
        <clipPath id="box">
          <rect x="0" y="0" width="40" height="40" rx="5"/>
        </clipPath>
      </defs>
      {getArray(id).map((value, x) => value.map((count, y) => {
        startHue.h += 15; 
        return (
          <circle
            key={''+x+''+y}
            cx={20}
            cy={20}
            clipPath="url(#box)"
            r={10 + count*2}
            fill={startHue+''}
            transform={`translate(${x*40+20} ${y*40+20})`}
          />
        )
      }))}
    </svg>
  )
}

const getArray = (value: string): Array<Array<number>> => {
  const ret = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
  const chars = value.split('')
  while (chars.length) {
    const v = (parseInt(chars.pop() as string, 16) << 4) | parseInt(chars.pop() as string, 16)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const compare = (Math.pow(2, i) << 4) | Math.pow(2, j)
        if ((v & compare) === compare) {
          ret[i][j]++
        }
      }
    }
  }
  return ret
}

export { SVGId }
