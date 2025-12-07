import { Filter, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { statisticsApi } from "../api/api";
import type { TopStudent } from "../api/api";
import { StatisticsChart } from "../components/StatisticsChart";
import { TopStudentsTable } from "../components/TopStudentsTable";

// Score levels configuration
interface ScoreLevel {
  level: string;
  label: string;
  color: string;
  min: number;
  max: number;
  key: string;
}

// Block configuration
interface BlockInfo {
  key: string;
  name: string;
  subjects: Array<{ key: string; name: string }>;
}

const SCORE_LEVELS: ScoreLevel[] = [
  {
    level: "Excellent",
    label: "Excellent (≥ 8)",
    color: "#10b981", // green
    min: 8,
    max: 10,
    key: "excellent",
  },
  {
    level: "Good",
    label: "Good (6-8)",
    color: "#3b82f6", // blue
    min: 6,
    max: 8,
    key: "good",
  },
  {
    level: "Average",
    label: "Average (4-6)",
    color: "#f59e0b", // amber
    min: 4,
    max: 6,
    key: "average",
  },
  {
    level: "Poor",
    label: "Poor (< 4)",
    color: "#ef4444", // red
    min: 0,
    max: 4,
    key: "poor",
  },
];

const BLOCKS: BlockInfo[] = [
  {
    key: "A",
    name: "Block A (Mathematics - Physics - Chemistry)",
    subjects: [
      { key: "toan", name: "Mathematics" },
      { key: "vat_li", name: "Physics" },
      { key: "hoa_hoc", name: "Chemistry" },
    ],
  },
  {
    key: "B",
    name: "Block B (Mathematics - Chemistry - Biology)",
    subjects: [
      { key: "toan", name: "Mathematics" },
      { key: "hoa_hoc", name: "Chemistry" },
      { key: "sinh_hoc", name: "Biology" },
    ],
  },
  {
    key: "C",
    name: "Block C (Literature - History - Geography)",
    subjects: [
      { key: "ngu_van", name: "Literature" },
      { key: "lich_su", name: "History" },
      { key: "dia_li", name: "Geography" },
    ],
  },
  {
    key: "D",
    name: "Block D (Mathematics - Foreign Language - Literature)",
    subjects: [
      { key: "toan", name: "Mathematics" },
      { key: "ngu_van", name: "Literature" },
      { key: "ngoai_ngu", name: "Foreign Language" },
    ],
  },
];

interface Metadata {
  subjects: Array<{ key: string; name: string }>;
}

interface StatisticsDataState {
  [subject: string]: {
    excellent?: number;
    good?: number;
    average?: number;
    poor?: number;
  };
}

const Dashboard = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [subjectsDropdownOpen, setSubjectsDropdownOpen] = useState(false);
  const [levelsDropdownOpen, setLevelsDropdownOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string>("A");
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [loadingTopStudents, setLoadingTopStudents] = useState(false);

  // Fetch metadata on component mount
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await statisticsApi.getMetadata();
        setMetadata(data);
        // Initialize with all subjects selected
        const allSubjectKeys = data.subjects.map((s) => s.key);
        setSelectedSubjects(allSubjectKeys);
        // Initialize with all levels selected (hardcoded)
        setSelectedLevels(["excellent", "good", "average", "poor"]);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    };

    fetchMetadata();
  }, []);

  // Fetch statistics data when filters change
  useEffect(() => {
    if (selectedSubjects.length === 0 || selectedLevels.length === 0) {
      setChartData([]);
      return;
    }

    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const subjectsParam = selectedSubjects.join(",");
        const levelsParam = selectedLevels.join(",");

        const data = await statisticsApi.getFilteredStatistics(
          subjectsParam,
          levelsParam
        );

        // Transform data for chart
        const transformedData = Object.entries(data as StatisticsDataState).map(
          ([subject, levels]) => {
            const item: any = { subject };
            selectedLevels.forEach((level) => {
              const levelKey = level as keyof typeof levels;
              item[level] = (levels as any)[levelKey] || 0;
            });
            return item;
          }
        );

        setChartData(transformedData);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [selectedSubjects, selectedLevels]);

  // Fetch top students when selected block changes
  useEffect(() => {
    const fetchTopStudents = async () => {
      setLoadingTopStudents(true);
      try {
        const data = await statisticsApi.getTopStudentsByBlock(selectedBlock);
        setTopStudents(data);
      } catch (error) {
        console.error("Failed to fetch top students:", error);
        setTopStudents([]);
      } finally {
        setLoadingTopStudents(false);
      }
    };

    fetchTopStudents();
  }, [selectedBlock]);

  const toggleSubject = (subjectKey: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectKey)
        ? prev.filter((s) => s !== subjectKey)
        : [...prev, subjectKey]
    );
  };

  const toggleLevel = (levelKey: string) => {
    setSelectedLevels((prev) =>
      prev.includes(levelKey)
        ? prev.filter((l) => l !== levelKey)
        : [...prev, levelKey]
    );
  };

  const selectAllSubjects = () => {
    if (metadata) {
      setSelectedSubjects(metadata.subjects.map((s) => s.key));
    }
  };

  const deselectAllSubjects = () => {
    setSelectedSubjects([]);
  };

  const selectAllLevels = () => {
    setSelectedLevels(["excellent", "good", "average", "poor"]);
  };

  const deselectAllLevels = () => {
    setSelectedLevels([]);
  };

  if (loading && chartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  const barKeys = selectedLevels.filter(
    (level) => chartData.length > 0 && chartData[0][level] !== undefined
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-blue-600" size={32} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Exam Statistics
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              Comprehensive analysis of student performance across all subjects
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={24} className="text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subjects Dropdown Filter */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Subjects
                </label>
                <div className="relative">
                  <button
                    onClick={() =>
                      setSubjectsDropdownOpen(!subjectsDropdownOpen)
                    }
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-left font-medium text-gray-700 hover:border-blue-400 transition flex justify-between items-center"
                  >
                    <span>
                      {selectedSubjects.length === 0
                        ? "Select subjects..."
                        : selectedSubjects.length === metadata?.subjects.length
                        ? "All subjects"
                        : `${selectedSubjects.length} selected`}
                    </span>
                    <span
                      className={`transition-transform ${
                        subjectsDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {subjectsDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                      <div className="sticky top-0 bg-gray-50 border-b p-3 flex gap-2">
                        <button
                          onClick={selectAllSubjects}
                          className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition"
                        >
                          All
                        </button>
                        <button
                          onClick={deselectAllSubjects}
                          className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {metadata?.subjects.map((subject) => (
                          <label
                            key={subject.key}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                          >
                            <input
                              type="checkbox"
                              checked={selectedSubjects.includes(subject.key)}
                              onChange={() => toggleSubject(subject.key)}
                              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {subject.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedSubjects.length === 0 && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                      ⚠️ Select at least one subject
                    </div>
                  )}
                </div>
              </div>

              {/* Score Levels Dropdown Filter */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Score Levels
                </label>
                <div className="relative">
                  <button
                    onClick={() => setLevelsDropdownOpen(!levelsDropdownOpen)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-left font-medium text-gray-700 hover:border-blue-400 transition flex justify-between items-center"
                  >
                    <span>
                      {selectedLevels.length === 0
                        ? "Select levels..."
                        : selectedLevels.length === 4
                        ? "All levels"
                        : `${selectedLevels.length} selected`}
                    </span>
                    <span
                      className={`transition-transform ${
                        levelsDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {levelsDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg z-10">
                      <div className="sticky top-0 bg-gray-50 border-b p-3 flex gap-2">
                        <button
                          onClick={selectAllLevels}
                          className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition"
                        >
                          All
                        </button>
                        <button
                          onClick={deselectAllLevels}
                          className="flex-1 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition"
                        >
                          Clear
                        </button>
                      </div>
                      <div>
                        {SCORE_LEVELS.map((level) => (
                          <label
                            key={level.key}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                          >
                            <input
                              type="checkbox"
                              checked={selectedLevels.includes(level.key)}
                              onChange={() => toggleLevel(level.key)}
                              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                            />
                            <div
                              className="w-3 h-3 rounded"
                              style={{
                                backgroundColor: level.color,
                              }}
                            ></div>
                            <span className="text-sm font-medium text-gray-700">
                              {level.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedLevels.length === 0 && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                      ⚠️ Select at least one level
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Summary */}
          {selectedSubjects.length > 0 && selectedLevels.length > 0 && (
            <>
              {/* Chart Section */}
              {chartData.length > 0 && barKeys.length > 0 && (
                <StatisticsChart
                  chartData={chartData}
                  selectedLevels={selectedLevels}
                  scoreLevels={SCORE_LEVELS}
                />
              )}

              {/* Top 10 Students Table */}
              <TopStudentsTable
                topStudents={topStudents}
                loadingTopStudents={loadingTopStudents}
                selectedBlock={selectedBlock}
                blocks={BLOCKS}
                onBlockChange={setSelectedBlock}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
