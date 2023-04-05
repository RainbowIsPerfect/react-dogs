import s from './table.module.scss';

interface TableProps {
  content: {
    header: string;
    data: string | number;
    id: string | number;
  }[];
}

export const Table = ({ content }: TableProps) => {
  return (
    <table className={s.table}>
      <tbody>
        {content.map((row) => {
          return (
            <tr key={row.id} className={s.table__row}>
              <th className={s.table__header}>{row.header}</th>
              <td className={s.table__data}>{row.data}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
