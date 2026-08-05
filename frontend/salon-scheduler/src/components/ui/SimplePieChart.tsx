import React from 'react';

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface SimplePieChartProps {
  data: PieChartData[];
}

export function SimplePieChart({ data }: SimplePieChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let currentAngle = 0;

  // SVG configuration
  const size = 200;
  const radius = 80;
  const cx = size / 2;
  const cy = size / 2;

  const segments = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    
    // Calculate start and end coordinates
    const startAngleRad = (currentAngle - 90) * (Math.PI / 180);
    const endAngleRad = (currentAngle + angle - 90) * (Math.PI / 180);
    
    const x1 = cx + radius * Math.cos(startAngleRad);
    const y1 = cy + radius * Math.sin(startAngleRad);
    const x2 = cx + radius * Math.cos(endAngleRad);
    const y2 = cy + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // SVG Path data: Move to center, Line to start, Arc to end, Close path
    const pathData = [
      `M ${cx} ${cy}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');
    
    const segment = {
      path: pathData,
      color: item.color,
      name: item.name
    };
    
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, index) => (
          <path key={index} d={seg.path} fill={seg.color} stroke="white" strokeWidth="2" />
        ))}
      </svg>
      <div className="flex gap-4 mt-2 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
