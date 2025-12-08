import { Search } from "lucide-react";
import { useState } from "react";

interface SearchbarProps {
  onSearch?: (value: string) => void;
}

const Searchbar = ({ onSearch }: SearchbarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearch = async () => {
    if (searchValue.trim()) {
      setIsLoading(true);
      if (onSearch) {
        await onSearch(searchValue.trim());
      }
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search your score here..."
          value={searchValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg 
                       bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={isLoading || !searchValue.trim()}
        className="w-full md:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg 
                   transition-colors flex items-center justify-center md:justify-start gap-2 whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span className="hidden sm:inline">Searching...</span>
          </>
        ) : (
          <>
            <Search size={18} className="md:hidden" />
            <span className="md:hidden">Search</span>
            <span className="hidden md:inline">Submit</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Searchbar;
