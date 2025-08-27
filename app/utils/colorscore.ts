function colorscore(score: number) {
  let colorClass = '';
  if (score > 70) {
    colorClass = 'bg-green-500 text-white rounded-full px-2 py-0.5 text-xs';
  } else if (score >= 49) {
    colorClass =
      'bg-yellow-400 text-yellow-900 rounded-full px-2 py-0.5 text-xs';
  } else {
    colorClass = 'bg-red-500 text-white rounded-full px-2 py-0.5 text-xs ';
  }

  return colorClass;
}

export default colorscore;
