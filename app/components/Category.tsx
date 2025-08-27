import SummaryBadge from './SummaryBadge';

type CategoryProps = {
  title?: string;
  score: number;
};

function Category({ title, score }: CategoryProps) {
  const textColor =
    score > 70
      ? 'text-green-600'
      : score > 49
        ? 'text-yellow-600'
        : 'text-red-600';

  return (
    <div className='resume-summary'>
      <div className='category'>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <p className='text-2xl'>{title}</p>
          <SummaryBadge badge={score} />
        </div>
        <p className='text-2xl'>
          <span className={textColor}>{score}/100</span>
        </p>
      </div>
    </div>
  );
}

export default Category;
