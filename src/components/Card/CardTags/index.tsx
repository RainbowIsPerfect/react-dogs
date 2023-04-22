import s from './card-tags.module.scss';

interface CardTagsProps {
  tags: (string | number)[];
  className?: string;
}

export const CardTags = ({ tags, className = '' }: CardTagsProps) => {
  return tags.length ? (
    <div className={`${s['tags-container']} ${className}`}>
      {tags.map((tag, i) => {
        return (
          <p key={i} className={s.tag}>
            {tag}
          </p>
        );
      })}
    </div>
  ) : null;
};
