import { useState } from "react";
import Searchbar from "../components/Searchbar";
import SearchResults from "../components/SearchResults";

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
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/scores/${registrationNumber}`);
      // const data = await response.json();

      // Mock data for demonstration
      if (registrationNumber === "01000001") {
        setTimeout(() => {
          setSearchResults({
            sbd: "01000001",
            toan: 8.4,
            ngu_van: 6.75,
            ngoai_ngu: 8.0,
            vat_li: 6.0,
            hoa_hoc: 5.25,
            sinh_hoc: 5.0,
            ma_ngoai_ngu: "N1",
          });
          setLoading(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setSearchResults(null);
          setError(`No scores found for registration number: ${registrationNumber}`);
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      setError("Failed to fetch scores. Please try again.");
      setLoading(false);
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

          {/* Sample Data Display */}
          {!hasSearched && (
            <div className="mt-12">
              <SearchResults showSampleData={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScores;
