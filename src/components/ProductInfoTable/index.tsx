import { AdditionalProductInfo } from '../../types';
import { Table } from '../UI/Table';

interface ProductInfoTableProps {
  productInfo: AdditionalProductInfo;
}

export const ProductInfoTable = ({ productInfo }: ProductInfoTableProps) => {
  return (
    <Table>
      {[
        { header: 'Weight', data: productInfo.wight },
        { header: 'Stock', data: productInfo.stock },
        {
          header: 'Created at',
          data: productInfo.createdAt,
        },
        {
          header: 'Updated at',
          data: productInfo.updatedAt,
        },
      ]}
    </Table>
  );
};
