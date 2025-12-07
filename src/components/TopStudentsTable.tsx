import type { TopStudent } from "../api/api";

interface BlockInfo {
  key: string;
  name: string;
  subjects: Array<{ key: string; name: string }>;
}

interface TopStudentsTableProps {
  topStudents: TopStudent[];
  loadingTopStudents: boolean;
  selectedBlock: string;
  blocks: BlockInfo[];
  onBlockChange: (block: string) => void;
}

export const TopStudentsTable = ({
  topStudents,
  loadingTopStudents,
  selectedBlock,
  blocks,
  onBlockChange,
}: TopStudentsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Top 10 Students by Block
        </h2>

        {/* Block Selector */}
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Block
          </label>
          <select
            value={selectedBlock}
            onChange={(e) => onBlockChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:border-blue-400 transition focus:outline-none focus:border-blue-600"
          >
            {blocks.map((block) => (
              <option key={block.key} value={block.key}>
                {block.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loadingTopStudents ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : topStudents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                  Registration Number
                </th>
                {blocks
                  .find((b) => b.key === selectedBlock)
                  ?.subjects.map((subject) => (
                    <th
                      key={subject.key}
                      className="px-6 py-3 text-center text-sm font-bold text-gray-700"
                    >
                      {subject.name}
                    </th>
                  ))}
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student, index) => {
                const currentBlock = blocks.find(
                  (b) => b.key === selectedBlock
                );

                return (
                  <tr
                    key={student.sbd}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
                        {student.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {student.sbd}
                    </td>
                    {currentBlock?.subjects.map((subject) => (
                      <td
                        key={subject.key}
                        className="px-6 py-4 text-center text-gray-700"
                      >
                        {student[subject.key] !== null &&
                        student[subject.key] !== undefined
                          ? Number(student[subject.key]).toFixed(2)
                          : "-"}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right font-bold text-lg text-gray-900">
                      {student.total_score.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-gray-600 text-lg">
            No data available for the selected block
          </p>
        </div>
      )}
    </div>
  );
};
