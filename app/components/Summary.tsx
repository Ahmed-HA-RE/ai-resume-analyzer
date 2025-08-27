import type { Feedback } from 'types/resumes';
import ScoreGuage from './ScoreGauge';
import Category from './Category';

type SummaryProps = {
  feedback: Feedback;
};

function Summary({ feedback }: SummaryProps) {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className='flex flex-row p-4 gap-8 items-center'>
        <ScoreGuage score={feedback.overallScore} />
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>Your Resume Score</h2>
          <p className='text-sm text-gray-500'>
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title='Tone & Style' score={feedback.toneAndStyle.score} />
      <Category title='Content' score={feedback.content.score} />
      <Category title='Structure' score={feedback.structure.score} />
      <Category title='Skills' score={feedback.skills.score} />
    </div>
  );
}

export default Summary;
