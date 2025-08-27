import { Link } from 'react-router';
import type { Resume } from 'types/resumes';
import ScoreCircle from './ScoreCircle';
import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter';

type ResumeCardProps = {
  resume: Resume;
};

function ResumeCard({ resume }: ResumeCardProps) {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    async function loadResumes() {
      const blob = await fs.read(resume.imagePath);

      if (!blob) return;

      let url = URL.createObjectURL(blob);

      setResumeUrl(url);
    }

    loadResumes();
  }, [resume.imagePath]);

  return (
    <Link
      className='resume-card animate-in fade-in duration-1000'
      to={`/resume/${resume.id}`}
    >
      <div className='resume-card-header'>
        <div className='flex flex-col items-center md:items-start gap-2'>
          <h2 className='!text-black font-bold break-words'>
            {resume.companyName}
          </h2>
          <h3 className='text-lg break-words text-gray-500'>
            {resume.jobTitle}
          </h3>
        </div>
        <div className='flex-shrink-0'>
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className='gradient-border animate-in fade-in duration-1000'>
        <div className='h-full w-full'>
          <img
            src={resumeUrl}
            alt='resume'
            className='w-full h-[350px] max-sm:h-[200px] object-cover object-top'
          />
        </div>
      </div>
    </Link>
  );
}

export default ResumeCard;
