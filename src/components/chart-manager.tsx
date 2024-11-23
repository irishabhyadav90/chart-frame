import ChartForm from './chart-form';
import ChartList from './chart-list';

const ChartManager = () => {
  
  const onAddChart = () => {

  }
  
  return (
    <div>
      <ChartForm onAddChart={onAddChart}/>
      <ChartList />
    </div>
  );
};

export default ChartManager;
