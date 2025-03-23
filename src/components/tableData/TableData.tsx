import React from 'react';

import { TableData as ITableData } from '../../interfaces/TableData';
import styles from './TableData.module.css';

interface TableDataProps {
  data: ITableData;
}

const TableData: React.FC<TableDataProps> = ({ data }) => {
  if (
    !data.columns ||
    !data.rows ||
    data.columns.length === 0 ||
    data.rows.length === 0
  ) {
    return <div className={styles.noData}>No data available</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={styles.table}>
        <thead>
          <tr>
            {data.columns.map((col, colIndex) => (
              <th key={`col-${colIndex}`}>{col.trim()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={`row-${row._id}`}>
              {row.values.map((cellValue, colIndex) => {
                const headerLabel = data.columns[colIndex].trim();
                return (
                  <td
                    key={`cell-${row._id}-${colIndex}`}
                    data-label={headerLabel}
                  >
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
