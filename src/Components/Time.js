import React from "react";

export default function Time({ minutes }) {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='50' cy='50' r='40' fill='#007bff' />
      <rect x='47' y='20' width='6' height='30' fill='#fff' />
      <text
        x='50'
        y='70'
        textAnchor='middle'
        alignmentBaseline='middle'
        fill='#fff'
        fontSize='30'
        fontWeight='bold'
      >
        {minutes}
      </text>
    </svg>
  );
}
