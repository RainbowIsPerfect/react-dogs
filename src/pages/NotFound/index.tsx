import s from './notfound.module.scss';

interface NotFoundProps {
  message?: string;
}

export const NotFound = ({ message }: NotFoundProps) => {
  return (
    <div>
      <p className={s.text}>
        {message ??
          'This page is not available. Maybe look for something else?'}
      </p>
    </div>
  );
};
