import React from 'react';

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface SimplePieChartProps {
  data: DataPoint[];
  size?: number;
}

export const SimplePieChart: React.FC<SimplePieChartProps> = ({ data, size = 200 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const getPath = (value: number) => {
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const x1 = size / 2 + (size / 2) * Math.cos((Math.PI * startAngle) / 180);
    const y1 = size / 2 + (size / 2) * Math.sin((Math.PI * startAngle) / 180);
    const x2 = size / 2 + (size / 2) * Math.cos((Math.PI * endAngle) / 180);
    const y2 = size / 2 + (size / 2) * Math.sin((Math.PI * endAngle) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    return `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${size / 2} ${size / 2} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {data.map((item, index) => (
          <path key={index} d={getPath(item.value)} fill={item.color} />
        ))}
      </svg>
      <div className="mt-4 flex gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
