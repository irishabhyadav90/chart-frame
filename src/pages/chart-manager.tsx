import { useState } from 'react';
import ChartForm from '@components/chart-form';
import ChartList from '@components/chart-list';
import { ChartConfig } from 'src/schema/zod';

const ChartManager = () => {
  const [charts, setCharts] = useState<ChartConfig[]>([]);

  // Add a new chart
  const handleAddChart = (newChart: ChartConfig) => {
    setCharts((prevCharts) => [...prevCharts, newChart]);
  };

  // Edit an existing chart
  const handleEditChart = (chartId: number) => {
    const chartToEdit = charts.find((chart) => chart.id === chartId);
    if (chartToEdit) {
      console.log("Edit chart:", chartToEdit); // You can prefill the form here
    }
  };
  
  // Delete a chart
  const handleDeleteChart = (chartId: number) => {
    setCharts((prevCharts) => prevCharts.filter((chart) => chart.id !== chartId));
  };

  return (
    <div>
      <ChartForm onAddChart={handleAddChart} />
      <ChartList
        charts={charts}
        onEditChart={handleEditChart}
        onDeleteChart={handleDeleteChart}
      />
    </div>
  );
};

export default ChartManager;
