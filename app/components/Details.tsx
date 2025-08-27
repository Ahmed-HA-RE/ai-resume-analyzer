import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'app/components/Accordian';
import type { Feedback } from 'types/resumes';
import colorscore from '~/utils/colorscore';

function Details({ feedback }: { feedback: Feedback }) {
  const getColor = (type: 'good' | 'improve') =>
    type === 'good' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  const renderTips = (tips: { type: 'good' | 'improve'; tip: string }[]) => (
    <div className='flex flex-col flex-wrap gap-2'>
      {tips.length > 0 ? (
        tips.map((tip, i) => (
          <div
            key={i}
            className={`px-3 py-1 flex flex-row justify-between rounded-full text-sm font-medium ${getColor(
              tip.type
            )}`}
          >
            <p>{tip.tip}</p>
            <p className='mr-4 text-base'>
              {tip.type === 'good' ? '✅' : '❌'}
            </p>
          </div>
        ))
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );

  const renderHeader = (title: string, score: number) => (
    <div className='flex flex-row items-center space-x-2 w-full'>
      <span className='font-semibold'>{title}</span>
      <div className='flex flex-col items-end'>
        <span className={`text-sm font-bold ${colorscore(score)} `}>
          {score}/100
        </span>
      </div>
    </div>
  );

  return (
    <div className='w-full mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-6'>📋 Resume Feedback</h2>
      <Accordion type='multiple' className='space-y-4'>
        {/* Tone & Style */}
        <AccordionItem value='tone'>
          <AccordionTrigger>
            {renderHeader('🗣️ Tone & Style', feedback.toneAndStyle.score)}
          </AccordionTrigger>
          <AccordionContent>
            {renderTips(feedback.toneAndStyle.tips)}
          </AccordionContent>
        </AccordionItem>

        {/* Content */}
        <AccordionItem value='content'>
          <AccordionTrigger>
            {renderHeader('📑 Content Suggestions', feedback.content.score)}
          </AccordionTrigger>
          <AccordionContent>
            {renderTips(feedback.content.tips)}
          </AccordionContent>
        </AccordionItem>

        {/* Structure */}
        <AccordionItem value='structure'>
          <AccordionTrigger>
            {renderHeader(
              '🧩 Structure & Formatting',
              feedback.structure.score
            )}
          </AccordionTrigger>
          <AccordionContent>
            {renderTips(feedback.structure.tips)}
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value='skills'>
          <AccordionTrigger>
            {renderHeader('💡 Skills Highlight', feedback.skills.score)}
          </AccordionTrigger>
          <AccordionContent>
            {renderTips(feedback.skills.tips)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Details;
