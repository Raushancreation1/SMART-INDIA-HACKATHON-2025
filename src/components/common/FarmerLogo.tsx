import React from 'react';
import { Box, SvgIcon, SvgIconProps } from '@mui/material';

const FarmerLogoIcon = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 512 512" {...props}>
    {/* Background circle */}
    <circle cx="256" cy="256" r="240" fill="#f8f5f0" />
    
    {/* Farmer silhouette */}
    <path d="M256 80C220.7 80 192 108.7 192 144V160H320V144C320 108.7 291.3 80 256 80Z" fill="#2c3e2d" />
    <path d="M288 160V144C288 117.5 266.5 96 240 96H272C298.5 96 320 117.5 320 144V160H288Z" fill="#1a4f2b" />
    <path d="M208 160H304V224C304 235 295 244 284 244H228C217 244 208 235 208 224V160Z" fill="#4a7c59" />
    <path d="M208 224V160H288V224C288 235 279 244 268 244H228C217 244 208 235 208 224Z" fill="#3a6a49" />
    
    {/* Wheat stalks */}
    <path d="M144 352L160 336L176 368L192 336L208 368L224 336L240 368L256 336L272 368L288 336L304 368L320 336L336 352" stroke="#e3b448" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M160 352V448H336V352" stroke="#d4a017" strokeWidth="16" strokeLinecap="round" />
    
    {/* Sun */}
    <circle cx="400" cy="120" r="24" fill="#e3b448" />
    <path d="M400 72V96M400 144V168M448 120H424M376 120H352M366.059 94.0586L382.059 110.059M366.059 145.941L382.059 129.941M433.941 94.0586L417.941 110.059M433.941 145.941L417.941 129.941" stroke="#d4a017" strokeWidth="8" strokeLinecap="round" />
    
    {/* Decorative elements */}
    <path d="M128 352C128 352 144 320 176 320C208 320 224 352 224 352" stroke="#4a7c59" strokeWidth="8" strokeLinecap="round" />
    <path d="M288 352C288 352 304 320 336 320C368 320 384 352 384 352" stroke="#4a7c59" strokeWidth="8" strokeLinecap="round" />
    
    {/* Border */}
    <circle cx="256" cy="256" r="240" stroke="#d0d9d0" strokeWidth="16" />
  </SvgIcon>
);

interface FarmerLogoProps {
  size?: number | string;
  color?: string;
  sx?: object;
}

const FarmerLogo: React.FC<FarmerLogoProps> = ({ size = 200, color, sx }) => {
  return (
    <Box 
      component="div" 
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        ...sx
      }}
    >
      <FarmerLogoIcon 
        sx={{
          width: '100%',
          height: '100%',
          color: color,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)'
          }
        }} 
      />
    </Box>
  );
};

export default FarmerLogo;
