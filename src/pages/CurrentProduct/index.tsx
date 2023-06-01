import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfoTable } from '../../components/ProductInfoTable';
import { ReviewsList } from '../../components/ReviewsList';
import { Button } from '../../components/UI/FormElements/Button';
import { Modal } from '../../components/UI/Modal';
import { Tabs } from '../../components/UI/Tabs';
import { useAppNavigate } from '../../hooks/useAppNavigate';
import { useGetProductByIdQuery } from '../../store/slices/productsApiSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addToCart } from '../../store/slices/cartSlice';
import { ProductPrice } from '../../components/ProductPrice';
import { ConditionalRenderer } from '../../components/ConditionalRenderer';
import s from './product.module.scss';
import { Rating } from '../../components/UI/Rating';

export const CurrentProduct = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { productId } = useParams<string>();
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const { data, isLoading, error } = useGetProductByIdQuery(
    productId ?? skipToken
  );
  const isInCart = useAppSelector((state) =>
    state.cart.products.find((item) => item._id === data?._id)
  );

  console.log(data);

  return (
    <ConditionalRenderer error={error} isLoading={isLoading}>
      {data && (
        <>
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
              <Rating className={s.product__rating} rating={data.avgRating} />
              <ProductPrice
                className={s.product__main}
                discountedPrice={data.discountedPrice}
                price={data.price}
              />
              {data.stock > 0 ? (
                <Button
                  onClick={() =>
                    isInCart ? navigate('/cart') : dispatch(addToCart(data._id))
                  }
                >
                  {isInCart ? 'Go to cart' : 'Add to cart'}
                </Button>
              ) : (
                <Button disabled>Out of stock</Button>
              )}
            </div>
          </div>
          <Tabs initial="1">
            <Tabs.TabSwitchers>
              <Tabs.Switcher label="1">Description</Tabs.Switcher>
              <Tabs.Switcher label="2">Additional Information</Tabs.Switcher>
              <Tabs.Switcher label="3">Reviews</Tabs.Switcher>
            </Tabs.TabSwitchers>
            <Tabs.TabContent label="1">
              <p className={s.product__description}>{data.description}</p>
            </Tabs.TabContent>
            <Tabs.TabContent label="2">
              <ProductInfoTable
                productInfo={{
                  wight: data.wight,
                  stock: data.stock,
                  createdAt: data.createdAt,
                  updatedAt: data.updatedAt,
                }}
              />
            </Tabs.TabContent>
            <Tabs.TabContent label="3">
              <ReviewsList _id={productId || ''} reviews={data.reviews} />
            </Tabs.TabContent>
          </Tabs>
        </>
      )}
    </ConditionalRenderer>
  );
};
