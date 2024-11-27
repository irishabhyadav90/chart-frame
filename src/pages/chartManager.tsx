import { useState } from 'react';
import ChartForm from '@components/chartForm';
import ChartList from '@components/chartList';
import { ChartConfig } from 'src/schema/zod';

const ChartManager = () => {
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [editingChart, setEditingChart] = useState<ChartConfig | null>(null); 

  const handleAddChart = (chart: ChartConfig) => {
    if (editingChart) {
      setCharts((prevCharts) =>
        prevCharts.map((c) => (c.id === editingChart.id ? chart : c))
      );
      setEditingChart(null);
    } else {
      setCharts((prevCharts) => [...prevCharts, chart]);
    }
  };

  // Edit an existing chart
  const handleEditChart = (chartId: number) => {
    const chartToEdit = charts.find((chart) => chart.id === chartId);
    if (chartToEdit) {
      setEditingChart(chartToEdit);
    }
  };

  // Delete a chart
  const handleDeleteChart = (chartId: number) => {
    setCharts((prevCharts) =>
      prevCharts.filter((chart) => chart.id !== chartId),
    );
  };

  return (
    <div>
      <ChartForm onAddChart={handleAddChart} editingChart={editingChart}/>
      <ChartList
        charts={charts}
        onEditChart={handleEditChart}
        onDeleteChart={handleDeleteChart}
      />
    </div>
  );
};

export default ChartManager;
