import * as dayjs from 'dayjs';
import { Product } from '../../store/slices/productsSlice';
import { Table } from '../UI/Table';

interface ProductInfoTableProps {
  productInfo: Pick<
    Product,
    'stock' | 'wight' | 'created_at' | 'updated_at' | '_id'
  >;
}

export const ProductInfoTable = ({ productInfo }: ProductInfoTableProps) => {
  const val = [
    { header: 'Weight', data: productInfo.wight, id: productInfo._id },
    { header: 'Stock', data: productInfo.stock, id: productInfo._id },
    {
      header: 'Created at',
      data: dayjs(productInfo.created_at).format('DD/MM/YYYY HH:mm:ss'),
      id: productInfo._id,
    },
    {
      header: 'Updated at',
      data: dayjs(productInfo.updated_at).format('DD/MM/YYYY HH:mm:ss'),
      id: productInfo._id,
    },
  ];

  return <Table content={val} />;
};
