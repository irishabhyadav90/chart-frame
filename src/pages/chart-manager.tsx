import ChartForm from '@components/chart-form';
import ChartList from '@components/chart-list';

const ChartManager = () => {
  const onAddChart = () => {};

  return (
    <div>
      <ChartForm onAddChart={onAddChart} />
      <ChartList />
    </div>
  );
};

export default ChartManager;
