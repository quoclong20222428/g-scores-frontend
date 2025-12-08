import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: baseUrl,
});

/**
 * Score Data Interface
 */
export interface ScoreData {
  id?: number;
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
  // Block scores
  tongDiemKhoiA?: number;
  tongDiemKhoiB?: number;
  tongDiemKhoiC?: number;
  tongDiemKhoiD?: number;
  diemTrungBinh?: number;
}

/**
 * API Response Interface
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Search Scores API
 */
export const scoresApi = {
  /**
   * Search scores by registration number (SBD)
   * @param sbd Registration number
   * @returns Score data
   */
  searchBySbd: async (sbd: string): Promise<ScoreData> => {
    try {
      const response = await api.get<ApiResponse<ScoreData>>(
        `/scores/search/${sbd}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Registration number not found.");
        }
        throw new Error(
          error.response?.data?.message || "Error fetching scores."
        );
      }
      throw error;
    }
  },
};

/**
 * Statistics Metadata Interface
 */
export interface StatisticsMetadata {
  subjects: Array<{ key: string; name: string }>;
}

/**
 * Statistics Data Interface
 */
export interface StatisticsData {
  [subject: string]: {
    excellent?: number;
    good?: number;
    average?: number;
    poor?: number;
  };
}

/**
 * Top Student Interface
 */
export interface TopStudent {
  id: number;
  sbd: string;
  [key: string]: number | string; // Dynamic subject scores based on block
  total_score: number;
  rank: number;
}

/**
 * Statistics API
 */
export const statisticsApi = {
  /**
   * Get metadata (available subjects)
   * @returns Metadata with subjects list
   */
  getMetadata: async (): Promise<StatisticsMetadata> => {
    try {
      const response = await api.get<ApiResponse<StatisticsMetadata>>(
        `/statistics/metadata`
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy metadata thống kê");
    }
  },

  /**
   * Get filtered statistics data
   * @param subjects Comma-separated subject keys or "all"
   * @param levels Comma-separated level keys or "all"
   * @returns Statistics data
   */
  getFilteredStatistics: async (
    subjects: string,
    levels: string
  ): Promise<StatisticsData> => {
    try {
      const response = await api.get<ApiResponse<StatisticsData>>(
        `/statistics/filter?subjects=${subjects}&levels=${levels}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy dữ liệu thống kê");
    }
  },

  /**
   * Get top 10 students for a specific block
   * @param block Block key ("A", "B", "C", "D")
   * @returns Array of top 10 students with their scores and ranks for the block
   */
  getTopStudentsByBlock: async (block: string): Promise<TopStudent[]> => {
    try {
      const response = await api.get<ApiResponse<TopStudent[]>>(
        `/find-top/top/${block}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách top thí sinh");
    }
  },
};
