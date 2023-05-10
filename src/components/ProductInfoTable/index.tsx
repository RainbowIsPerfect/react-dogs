import { AdditionalProductInfo } from '../../types';
import { Table } from '../UI/Table';

interface ProductInfoTableProps {
  productInfo: AdditionalProductInfo;
}

export const ProductInfoTable = ({ productInfo }: ProductInfoTableProps) => {
  const val = [
    { header: 'Weight', data: productInfo.wight },
    { header: 'Stock', data: productInfo.stock },
    {
      header: 'Created at',
      data: productInfo.created_at,
    },
    {
      header: 'Updated at',
      data: productInfo.created_at,
    },
  ];

  return <Table>{val}</Table>;
};
