import React from 'react';

interface EarProps {
  transform?: string;
  className: string;
  animate: boolean;
}

const Ear: React.FC<EarProps> = ({ transform, className, animate }) => (
  <g transform={transform}>
    <g className={`ear ${className} ${animate ? 'animate' : ''}`} fill="#999">
      <path d="M 50 165
               C 40 150 35 120 40 100
               C 55 85 70 110 85 130
               Z" />
      <rect fill="#363636"
        x="40"
        y="105"
        width="35"
        height="50"
        clipPath="url(#inside-ear)" />
      <path fill="#555"
        d="M 53 105
               Q 50 130 65 155
               L 40 155
               L 40 105"
        clipPath="url(#inside-ear)" />
    </g>
  </g>
);

interface EyeProps {
  transform?: string;
  className: string;
  animate: boolean;
}

const Eye: React.FC<EyeProps> = ({ transform, className, animate }) => (
  <g transform={transform}>
    <g className={`eye ${className} ${animate ? 'animate' : ''}`}>
      <path fill="#363636"
        d="M 120 230
               L 40 220
               L 40 200
               L 110 165
               L 113 190
               L 120 230
               Z" />
      <path fill="#CDCDCD"
        d="M 113 190
               C 113 180 105 175 95 175
               S 55 195 40 210
               L 40 190
               C 60 174 75 160 95 160
               S 115 175 120 190
               Z" />
      <ellipse className="ball"
        fill="#000"
        cx="100"
        cy="190"
        rx="10"
        ry="10"/>
      <circle className="ball-reflection"
        fill="#FFF"
        cx="102"
        cy="192"
        r="3" />
    </g>
  </g>
);

const Nose = () => (
  <g className="nose"
    fill="#444">
    <path fill="#CDCDCD"
      d="M 120 237
             C 110 237 100 235 100 230
             C 100 220 115 220 113 190
             L 127 190
             C 125 220 140 220 140 230
             C 140 235 130 237 120 237
             Z"/>
    <path fill="555"
      d="M 110 233
             C 120 220 115 220 117 150
             C 117 130 117 130 110 120
             L 130 120
             C 123 130 123 130 123 150
             C 125 220 120 220 130 233
             Z" />
    <path fill="#333"
      d="M 110 235
             C 110 230 110 230 120 230
             S 130 230 130 235
             C 130 237 125 240 120 240
             S 110 237 110 235 Z" />
  </g>
);

interface TailProps {
  animate: boolean;
}

const Tail: React.FC<TailProps> = ({ animate }: TailProps) => (
  <g className={`tail ${animate ? 'animate' : ''}`}>
    <path fill="#000"
      d="M 120 140
             S 60 100 60 70
             C 60 45 90 30 115 30
             C 190 30 180 10 180 5
             C 195 35 145 40 125 40
             C 105 40 85 50 85 75
             C 85 115 135 140 135 140
             Z" />
    <path fill="#FFF"
      d="M 135 140
             S 85 115 85 75
             C 85 50 105 40 125 40
             C 145 40 195 35 180 5
             C 205 35 185 55 150 55
             C 135 55 115 65 115 85
             C 115 105 145 140 145 140
             Z" />
    <path fill="#000"
      d="M 145 140
             S 115 105 115 85
             C 115 65 135 55 150 55
             C 185 55 205 35 180 5
             C 220 35 190 60 155 60
             C 135 60 125 70 125 85
             C 125 105 150 140 150 140
             Z" />
  </g>
);

interface LogoProps {
  className?: string;
  width: number;
  height: number;
  animateTail?: boolean;
  animateEye?: boolean;
  animateEar?: boolean;
}
const Logo: React.FC<LogoProps> = ({
  className = '',
  animateTail = false,
  animateEye = false,
  animateEar = false,
  width,
  height,
}: LogoProps) => (
  <svg viewBox="0 0 240 240" className={`logo ${className}`} width={width} height={height}>
    <defs>
      <clipPath id="inside-ear">
        <path d="M 55 153
                 Q 45 135 47 105
                 Q 61 115 70 133
                 Q 65 145 55 153
                 Z" />
      </clipPath>
      <clipPath id="head">
        <path d="M 120 230
                 L 45 215
                 A 5 5 0 0 1 40 210
                 C 40 165 60 120 115 120
                 L 125 120
                 C 180 120 200 165 200 210
                 A 5 5 0 0 1 195 215
                 Z" />
      </clipPath>
    </defs>
    <Tail animate={animateTail}/>
    <g className="head" clipPath="url(#head)" fill="#999">
      <rect x="25" y="110" width="190" height="130" />
      <Eye className="eye-left" animate={false}/>
      <Eye className="eye-right" transform="scale(-1 1) translate(-240 0)" animate={animateEye}/>
    </g>
    <Ear className="ear-left" animate={animateEar}/>
    <Ear className="ear-right" transform="scale(-1 1) translate(-240 0)" animate={false}/>
    <Nose />
  </svg>
);

export { Logo };
