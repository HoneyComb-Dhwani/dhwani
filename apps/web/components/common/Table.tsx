import { Edit, Trash2 } from 'lucide-react';

type Column = {
  key: string;
  header: string;
  icon?: React.ReactNode;
  render?: (value: any, rowData?: any) => React.ReactNode;
};

type TableProps = {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  showActions?: boolean;
};

const Table: React.FC<TableProps> = ({ columns, data, onEdit, onDelete, showActions = true }) => {
  const tableData = Array.isArray(data) ? data : [];

  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              {column.header}
            </th>
          ))}
          {showActions && (
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {tableData.length > 0 ? (
          tableData.map((item, index) => (
            <tr key={item.id || index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4">
                  <div className="flex items-center">
                    {column.icon && <span className="mr-2">{column.icon}</span>}
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </div>
                </td>
              ))}
              {showActions && (
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + (showActions ? 1 : 0)}
              className="py-4 text-center text-gray-500"
            >
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
