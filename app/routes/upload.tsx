import { useState, type FormEvent } from 'react';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar';
import { toast } from 'sonner';
import type { FormData } from 'types/FormData';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import { convertPdfToImage } from '~/lib/pdfToImage';
import { generateUUID } from '~/utils/generateUUID';
import { prepareInstructions } from '~/data/resume';

function UploadPage() {
  const { auth, kv, isLoading, fs, ai } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobtitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  async function handleAnalyze({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: FormData) {
    setIsProcessing(true);
    setStatusText('Uploading The File...');
    const uploadeFile = await fs.upload([file]);

    if (!uploadeFile) {
      setStatusText('Failed to upload file');
      toast.error('Failed to upload file');
      return;
    }

    setStatusText('Converting Image...');
    const imageFile = await convertPdfToImage(file);

    if (!imageFile.file) {
      setStatusText('Failed to convert PDF to Image');
      toast.error('Failed to convert PDF to Image');
      return;
    }

    setStatusText('Uploading The Image...');
    const uploadImage = await fs.upload([imageFile.file]);

    if (!uploadImage) {
      setStatusText('Failed to upload Image');
      toast.error('Failed to upload Image');
      return;
    }

    setStatusText('Preparing data...');

    const uuid = generateUUID();
    const data = {
      id: uuid,
      companyName,
      jobDescription,
      jobTitle,
      resumePath: uploadeFile.path,
      imagePath: uploadImage.path,
      feedback: '',
    };

    await kv.set(`resume ${uuid}`, JSON.stringify(data));
    setStatusText('Analyzing...');
    const feedback = await ai.feedback(
      uploadeFile.path,
      prepareInstructions({ jobDescription, jobTitle })
    );

    if (!feedback) {
      setStatusText('Failed to analyze resume');
      toast.error('Failed to analyze resume');
      return;
    }

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume${uuid}`, JSON.stringify(data));
    setStatusText('Analysis Complete, redirecting...');
    navigate(`/resume/${data.id}`);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!companyName || !jobTitle || !jobDescription || !file) {
      toast.error('Please Fill All The Fields ');
      return;
    }

    const message = {
      companyName,
      jobTitle,
      jobDescription,
      file,
    };
    handleAnalyze(message);
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
