type SummaryBadgeProps = {
  badge: number;
};

const SummaryBadge = ({ badge }: SummaryBadgeProps) => {
  let colorClass = '';
  let text = '';

  if (badge > 70) {
    colorClass = 'bg-green-500 text-white';
    text = 'Strong';
  } else if (badge >= 49) {
    colorClass = 'bg-yellow-400 text-yellow-900';
    text = 'Good Start';
  } else {
    colorClass = 'bg-red-500 text-white';
    text = 'Needs Work';
  }

  return (
    <span
      className={`px-3 mt-1 py-0.5 text-xs rounded-full ${colorClass} inline-block`}
    >
      {text}
    </span>
  );
};

export default SummaryBadge;
