import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.enum(['line', 'bar']),
  data_source: z.string().min(1, { message: 'Data source is required' }),
  y_axis_name: z.string().optional(),
  frequency: z.enum(['monthly', 'quarterly', 'yearly']),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, { message: 'Invalid color code' }),
  line_style: z.enum(['solid', 'dashed', 'dotted']).optional(),
  bar_style: z.enum(['thin', 'medium', 'thick']).optional(),
});

type ChartFormInputs = z.infer<typeof formSchema>;

interface ChartConfig extends ChartFormInputs {
  id: number;
}

interface ChartFormProps {
  onAddChart: (chart: ChartConfig) => void;
}

const ChartForm: React.FC<ChartFormProps> = ({ onAddChart }) => {
  const {
    register,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm<ChartFormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: 'line',
      data_source: '',
      frequency: 'monthly',
      color: '#8884d8',
      line_style: 'solid',
      bar_style: 'medium',
    },
  });

  const selectedType = watch('type');

  const onSubmit: SubmitHandler<ChartFormInputs> = (data) => {
    const newChart: ChartConfig = {
      id: Date.now(),
      ...data,
    };
    onAddChart(newChart);
    reset();
  };

  return (
    <form
      className="mb-4 bg-white shadow-xl rounded w-full p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Chart Title
            </label>
            <input
              {...register('title')}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter chart title"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Chart Type
            </label>
            <select
              {...register('type')}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mt-4">Data Source</label>
        <input
          {...register("data_source")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for data series (e.g., GDP)"
        />
        {errors.data_source && <p className="text-sm text-red-500">{errors.data_source.message}</p>}
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Y-Axis Name</label>
            <input
              {...register("y_axis_name")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Y-axis name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Time Frequency</label>
            <select
              {...register("frequency")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Line/Bar Color</label>
            <input
              type="color"
              {...register("color")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            />
            {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
          </div>

          {selectedType === "line" && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Line Style</label>
              <select
                {...register("line_style")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
              </select>
            </div>
          )}

          {selectedType === "bar" && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Bar Style</label>
              <select
                {...register("bar_style")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="thin">Thin</option>
                <option value="medium">Medium</option>
                <option value="thick">Thick</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded mt-4"
      >
        Add Chart
      </button>
    </form>
  );
};

export default ChartForm;
