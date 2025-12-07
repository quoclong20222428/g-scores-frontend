import { CheckCircle2, AlertCircle } from "lucide-react";

interface ScoreData {
  sbd: string;
  toan?: number;
  ngu_van?: number;
  ngoai_ngu?: number;
  vat_li?: number;
  hoa_hoc?: number;
  sinh_hoc?: number;
  lich_su?: number;
  dia_li?: number;
  gdcd?: number;
  ma_ngoai_ngu?: string;
}

interface SearchResultsProps {
  data?: ScoreData;
  loading?: boolean;
  error?: string;
  hasSearched?: boolean;
  showSampleData?: boolean;
}

const SearchResults = ({
  data,
  loading = false,
  error,
  hasSearched = false,
  showSampleData = false,
}: SearchResultsProps) => {
  // Sample data for demonstration
  const sampleData: ScoreData = {
    sbd: "01000001",
    toan: 8.4,
    ngu_van: 6.75,
    ngoai_ngu: 8.0,
    vat_li: 6.0,
    hoa_hoc: 5.25,
    sinh_hoc: 5.0,
    ma_ngoai_ngu: "N1",
  };

  // Use sample data if showSampleData is true
  const displayData = showSampleData ? sampleData : data;

  if (!hasSearched && !showSampleData) {
    return null;
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
        <p className="text-gray-600 mt-4">Searching for your scores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-600" size={24} />
          <div>
            <h3 className="font-semibold text-red-900">Search Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-yellow-600" size={24} />
          <div>
            <h3 className="font-semibold text-yellow-900">No Results Found</h3>
            <p className="text-yellow-700">
              No scores found for the provided registration number. Please check and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Define subject labels and order
  const subjects = [
    { key: "sbd", label: "Registration Number" },
    { key: "toan", label: "Mathematics" },
    { key: "ngu_van", label: "Literature" },
    { key: "ngoai_ngu", label: "Foreign Language" },
    { key: "vat_li", label: "Physics" },
    { key: "hoa_hoc", label: "Chemistry" },
    { key: "sinh_hoc", label: "Biology" },
    { key: "lich_su", label: "History" },
    { key: "dia_li", label: "Geography" },
    { key: "gdcd", label: "Civic Education" },
  ];

  // Get language code if available
  const languageCode = displayData.ma_ngoai_ngu || "";

  // Filter subjects that have data
  const filledSubjects = subjects.filter((subject) => {
    const value = displayData[subject.key as keyof ScoreData];
    return value !== null && value !== undefined && value !== "";
  });

  // Calculate total score
  const scoreValues = filledSubjects
    .filter((s) => s.key !== "sbd")
    .map((s) => {
      const value = displayData[s.key as keyof ScoreData];
      return typeof value === "number" ? value : 0;
    });
  const totalScore =
    scoreValues.length > 0
      ? (scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length).toFixed(2)
      : 0;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <CheckCircle2 className="text-green-600 shrink-0" size={24} />
        <p className="text-green-800 font-medium">Score found successfully!</p>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Exam Results</h2>

        {/* Registration Number */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Registration Number</p>
          <p className="text-2xl font-bold text-gray-900">{displayData.sbd}</p>
          {languageCode && (
            <p className="text-sm text-gray-600 mt-2">
              Foreign Language: <span className="font-semibold">{languageCode}</span>
            </p>
          )}
        </div>

        {/* Scores Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Scores</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filledSubjects
              .filter((s) => s.key !== "sbd")
              .map((subject) => {
                const value = displayData[subject.key as keyof ScoreData];
                const score = typeof value === "number" ? value : 0;
                return (
                  <div
                    key={subject.key}
                    className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200"
                  >
                    <p className="text-xs font-medium text-gray-600 mb-1 truncate">
                      {subject.label}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">{score}</p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <p className="text-sm font-medium text-blue-100 mb-2">Average Score</p>
          <p className="text-4xl font-bold">{totalScore}</p>
          <p className="text-xs text-blue-100 mt-2">
            Based on {scoreValues.length} subject{scoreValues.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
