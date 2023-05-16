import s from './table.module.scss';

interface TableItem {
  header: string;
  data: string | number;
}

interface TableProps {
  children: TableItem[];
}

export const Table = ({ children }: TableProps) => {
  return (
    <table className={s.table}>
      <tbody>
        {children.map((row, i) => {
          return (
            <tr key={i} className={s.table__row}>
              <th className={s.table__header}>{row.header}</th>
              <td className={s.table__data}>{row.data}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
