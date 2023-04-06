import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductInfoTable } from '../../components/ProductInfoTable';
import { ReviewsList } from '../../components/ReviewsList';
import { Button } from '../../components/UI/Button';
import { Modal } from '../../components/UI/Modal';
import { Tabs } from '../../components/UI/Tabs';
import { useGetProductByIdQuery } from '../../store/slices/productsSlice';
import { countDiscountedPrice } from '../../utils/countDiscountedPrice';
import { NotFound } from '../NotFound';
import s from './product.module.scss';

export const CurrentProduct = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { productId } = useParams<string>();
  const navigate = useNavigate();
  const { data, isError, isLoading, isSuccess } = useGetProductByIdQuery(
    productId ?? skipToken
  );

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <div>
          <Button
            className={s.product__button}
            variant="secondary"
            onClick={() => navigate('..', { relative: 'path' })}
          >
            Go back
          </Button>
          <div className={s.product}>
            <div
              className={s['product__image-wrapper']}
              onClick={() => setIsOpen(true)}
            >
              <img
                src={data.pictures}
                alt={data.name}
                className={s.product__image}
              />
              <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <img
                  src={data.pictures}
                  alt={data.name}
                  className={s.product__image}
                />
              </Modal>
            </div>
            <div className={s.product__info}>
              <h1 className={s.product__name}>{data.name}</h1>
              <p className={s.product__number}>Item No. {data._id}</p>
              <div className={s.product__main}>
                {data.discount ? (
                  <>
                    <span className={s.product__price_special}>
                      {countDiscountedPrice(data.price, data.discount)} &#8381;
                    </span>
                    <span className={s.product__price_full}>
                      {data.price} &#8381;
                    </span>
                  </>
                ) : (
                  <>{data.price} &#8381;</>
                )}
              </div>
              <Button variant="primary">Add to cart</Button>
            </div>
          </div>
          <Tabs
            tabs={[
              {
                title: 'Description',
                content: <ProductDescription description={data.description} />,
              },
              {
                title: 'Additional Information',
                content: (
                  <ProductInfoTable
                    productInfo={{
                      _id: data._id,
                      wight: data.wight,
                      stock: data.stock,
                      created_at: data.created_at,
                      updated_at: data.updated_at,
                    }}
                  />
                ),
              },
              {
                title: 'Reviews',
                content: <ReviewsList reviews={data.reviews} />,
              },
            ]}
          />
        </div>
      )}
    </>
  );
};
