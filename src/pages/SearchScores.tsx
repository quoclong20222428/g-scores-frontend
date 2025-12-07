import { useState } from "react";
import { toast } from "sonner";
import Searchbar from "../components/Searchbar";
import SearchResults from "../components/SearchResults";
import { scoresApi } from "../api/api";
import type { ScoreData } from "../api/api";

const SearchScores = () => {
  const [searchResults, setSearchResults] = useState<ScoreData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (registrationNumber: string) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // Call API to search scores
      const data = await scoresApi.searchBySbd(registrationNumber);
      setSearchResults(data);
      setLoading(false);
      toast.success("Found scores successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Lỗi khi tìm kiếm điểm";
      setError(errorMessage);
      setSearchResults(null);
      setLoading(false);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Search Your Scores
            </h1>
            <p className="text-lg text-gray-600">
              Enter your registration number to find your exam results and detailed statistics
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Search Section */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Registration Number
                </label>
                <Searchbar onSearch={handleSearch} />
              </div>
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div className="mt-12">
              <SearchResults
                data={searchResults || undefined}
                loading={loading}
                error={error || undefined}
                hasSearched={hasSearched}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScores;
