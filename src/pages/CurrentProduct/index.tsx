import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfoTable } from '../../components/ProductInfoTable';
import { ReviewsList } from '../../components/ReviewsList';
import { Button } from '../../components/UI/Button';
import { Modal } from '../../components/UI/Modal';
import { Tabs } from '../../components/UI/Tabs';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { NotFound } from '../NotFound';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useGetProductByIdQuery } from '../../store/slices/productsApiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addToCart } from '../../store/slices/userSlice';
import s from './product.module.scss';

export const CurrentProduct = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const { data, isError, isLoading, isSuccess, error } = useGetProductByIdQuery(
    productId ?? skipToken
  );
  const cart = useAppSelector((state) => state.user.cart);
  const isInCart = Boolean(cart.find((item) => item._id === data?._id));

  if (isError) {
    return <NotFound message={getErrorMessage(error)} />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isSuccess ? (
    <div>
      <Button
        className={s.product__button}
        variant="secondary"
        onClick={() => navigate('/')}
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
                  {data.discountedPrice} &#8381;
                </span>
                <span className={s.product__price_full}>
                  {data.price} &#8381;
                </span>
              </>
            ) : (
              <>{data.price} &#8381;</>
            )}
          </div>
          <Button
            onClick={() =>
              isInCart
                ? navigate('/cart')
                : dispatch(addToCart({ _id: data._id, stock: data.stock }))
            }
          >
            {isInCart ? 'Go to cart' : 'Add to cart'}
          </Button>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            title: 'Description',
            content: (
              <div className={s.product__description}>
                <p>{data.description}</p>
              </div>
            ),
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
  ) : null;
};
