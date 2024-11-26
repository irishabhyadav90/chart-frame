import useSeriesData from '@hooks/useSeriesData';
import { Observations } from '@types-api/fred-api';
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
interface ChartDisplayProps {
  dataSourceId: string; // ID of the data source
  type: 'line' | 'bar'; // Chart type
  options: {
    color?: string;
    lineStyle?: string;
    barStyle?: string;
  };
  frequency: string;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  dataSourceId,
  type,
  options,
  frequency,
}) => {
  const { chartData, isLoading, error } = useSeriesData(
    dataSourceId,
    frequency,
  );
  console.log('chartData', chartData);
  if (isLoading) {
    return <p>Loading chart data...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const chartJsData = {
    labels: chartData.map((observation: Observations) =>
      parseFloat(observation.date),
    ), // X-axis values
    datasets: [
      {
        label: 'Data',
        data: chartData.map(
          (observation: Observations) => parseFloat(observation.value) || 0,
        ), // Y-axis values
        backgroundColor: options?.color || 'rgba(75,192,192,0.4)',
        borderColor: options?.color || 'rgba(75,192,192,1)',
        borderWidth: 2,
        tension: type === 'line' ? 0.4 : undefined, // Example option for line charts
      },
    ],
  };

  return type === 'line' ? (
    <Line data={chartJsData} />
  ) : (
    <Bar data={chartJsData} />
  );
};

export default ChartDisplay;
