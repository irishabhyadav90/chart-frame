import { ChartConfig } from 'src/schema/zod';
import ChartDisplay from './chartDisplay';
interface ChartListProps {
  charts: ChartConfig[];
  onEditChart: (chartId: number) => void;
  onDeleteChart: (chartId: number) => void;
}

const ChartList: React.FC<ChartListProps> = ({
  charts,
  onEditChart,
  onDeleteChart,
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {charts.length === 0 ? (
        <p className="text-gray-600 text-center col-span-full">
          No charts available. Add one to get started!
        </p>
      ) : (
        charts.map((chart) => (
          <div
            key={chart.id}
            className="bg-white p-4 rounded-lg shadow-lg chart-item"
          >
            <h3 className="text-lg font-bold mb-2">{chart.title}</h3>

            {/* Chart Display */}
            <ChartDisplay
              dataSourceId={chart.data_source.id}
              type={chart.type}
              yAxisName={chart.y_axis_name || 'Y-axis'}
              options={{
                color: chart.color,
                lineStyle: chart.line_style,
                barStyle: chart.bar_style,
              }}
              frequency={chart.frequency}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => onEditChart(chart.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteChart(chart.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChartList;
