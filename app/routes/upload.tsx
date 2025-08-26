import { useState, type FormEvent } from 'react';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar';
import { toast } from 'sonner';

function UploadPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobtitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!companyName || !jobTitle || !jobDescription) {
      toast.error('Please Fill All The Fields ');
      return;
    }

    const message = {
      companyName,
      jobTitle,
      jobDescription,
      file,
    };
  }

  function onFileSelect(file: File | null) {
    setFile(file);
  }

  return (
    <main className='bg-[url(/images/bg-main.svg)] bg-cover px-2'>
      <Navbar />
      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src={'../../public/images/resume-scan.gif'}
                alt='resume-scan'
                className='w-full'
              />
            </>
          ) : (
            <>
              <h2>Drop your resume for an ATS score and improvement tips.</h2>
            </>
          )}

          {!isProcessing && (
            <form
              onSubmit={handleSubmit}
              id='upload-form'
              className='flex flex-col gap-4 mt-8'
            >
              <div className='form-div'>
                <label htmlFor='company-name'>Company Name</label>
                <input
                  type='text'
                  placeholder='Compane Name'
                  id='company-name'
                  name='company-name'
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className='form-div'>
                <label htmlFor='job-title'>Job Title</label>
                <input
                  type='text'
                  placeholder='Job Title'
                  id='job-title'
                  name='job-title'
                  value={jobTitle}
                  onChange={(e) => setJobtitle(e.target.value)}
                />
              </div>
              <div className='form-div'>
                <label htmlFor='job-description'>Job Description</label>
                <textarea
                  placeholder='Job Description'
                  id='job-description'
                  name='job-description'
                  className='resize-none !h-42'
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>
              <div className='form-div'>
                <label htmlFor='uploader'>Upload Resume</label>
                <FileUploader onFileSelect={onFileSelect} />
              </div>
              <button className='primary-button' type='submit'>
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default UploadPage;
