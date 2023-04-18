import s from './card-tags.module.scss';

interface CardTagsProps {
  tags: (string | number)[];
  className?: string;
}

export const CardTags = ({ tags, className = '' }: CardTagsProps) => {
  const cardTags = tags.filter(Boolean);

  if (cardTags.length === 0) {
    return null;
  }

  return (
    <div className={`${s['tags-container']} ${className}`}>
      {tags.filter(Boolean).map((tag, i) => {
        return (
          <p key={i} className={s.tag}>
            {tag}
          </p>
        );
      })}
    </div>
  );
};
