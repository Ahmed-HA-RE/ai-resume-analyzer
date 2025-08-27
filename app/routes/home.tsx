import type { Route } from '../../.react-router/types/app/routes/+types/home';
import Navbar from '~/components/Navbar';
import ResumeCard from '~/components/ResumeCard';
import { Link, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';
import { useEffect, useState } from 'react';
import type { Resume } from 'types/resumes';
import type { KVItem } from 'types/puter';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resumind' },
    { name: 'description', content: 'Smart feedback for your industry.' },
  ];
}

function HomePage() {
  const { auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    async function loadResumes() {
      setIsLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value));

      setResumes(parsedResumes);

      setIsLoadingResumes(false);
    }

    loadResumes();
  }, []);

  return (
    <main className='bg-[url(/images/bg-main.svg)] bg-cover'>
      <Navbar />
      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Track Your Applications & Resume Ratings</h1>

          {!isLoadingResumes && resumes.length === 0 ? (
            <h2>No resumes found. Upload your first resume to get feedback</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>

        {isLoadingResumes && (
          <div className='flex flex-col items-center justify-center'>
            <img
              src='/public/images/resume-scan-2.gif'
              alt='resume-scan'
              className='w-52'
            />
          </div>
        )}

        {!isLoadingResumes && resumes.length > 0 && (
          <div className='resumes-section'>
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!isLoadingResumes && resumes.length === 0 && (
          <Link
            to={'/upload'}
            className='primary-button w-fit text-xl font-semibold'
          >
            Upload Resume
          </Link>
        )}
      </section>
    </main>
  );
}

export default HomePage;
