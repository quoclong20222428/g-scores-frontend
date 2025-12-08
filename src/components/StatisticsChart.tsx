import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ScoreLevel {
  level: string;
  label: string;
  color: string;
  min: number;
  max: number;
  key: string;
}

interface StatisticsChartProps {
  chartData: any[];
  selectedLevels: string[];
  scoreLevels: ScoreLevel[];
}

const SUBJECT_NAME_MAP: Record<string, string> = {
  toan: "Mathematics",
  ngu_van: "Literature",
  ngoai_ngu: "Foreign Language",
  vat_li: "Physics",
  hoa_hoc: "Chemistry",
  sinh_hoc: "Biology",
  lich_su: "History",
  dia_li: "Geography",
  gdcd: "Civic Education",
};

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
  scoreLevels: ScoreLevel[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  scoreLevels,
}: CustomTooltipProps) => {
  if (active && payload && payload.length && label) {
    const subjectName = SUBJECT_NAME_MAP[label] || label;

    return (
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-3">
        <p className="font-bold text-gray-900 mb-2">{subjectName}</p>
        {payload.map((entry, index) => {
          const levelConfig = scoreLevels.find((l) => l.key === entry.dataKey);
          return (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {levelConfig?.level}: {entry.value.toLocaleString()}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export const StatisticsChart = ({
  chartData,
  selectedLevels,
  scoreLevels,
}: StatisticsChartProps) => {
  const barKeys = selectedLevels.filter(
    (level) => chartData.length > 0 && chartData[0][level] !== undefined
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Student Performance by Subject
      </h2>

      <div className="w-full h-64 sm:h-80 lg:h-96 overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="subject"
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => SUBJECT_NAME_MAP[value] || value}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip scoreLevels={scoreLevels} />} />
            {barKeys.map((level) => {
              const levelConfig = scoreLevels.find((l) => l.key === level);
              return (
                <Bar
                  key={level}
                  dataKey={level}
                  stackId="a"
                  fill={levelConfig?.color}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-6">
        {selectedLevels.map((levelKey) => {
          const levelConfig = scoreLevels.find((l) => l.key === levelKey);
          return (
            <div key={levelKey} className="flex items-center gap-2">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                style={{
                  backgroundColor: levelConfig?.color,
                }}
              ></div>
              <span className="text-xs sm:text-sm text-gray-700">
                {levelConfig?.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
