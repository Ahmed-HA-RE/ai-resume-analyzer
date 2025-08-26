import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import formatSize from '~/utils/formatSize';

type FileUploaderProps = {
  onFileSelect?: (file: File | null) => void;
};

function FileUploader({ onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { 'application/pdf': ['.pdf'] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className='w-full gradient-border'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className='space-y-4 cursor-pointer'>
          {file ? (
            <div
              className='uploader-selected-file'
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <img
                  src='../../public/images/pdf.png'
                  className='w-10 object-cover'
                />
              </div>
              <div className='flex flex-col items-center space-y-1'>
                <p className='text-sm truncate text-gray-700 font-medium'>
                  {file.name}
                </p>
                <p className='text-xs  text-gray-700'>
                  {formatSize(file.size)}
                </p>
              </div>

              <button
                className='p-2 cursor-pointer'
                onClick={() => onFileSelect?.(null)}
              >
                <img
                  src='../../public/icons/cross.svg'
                  alt='remove'
                  className='w-4 h-4'
                />
              </button>
            </div>
          ) : (
            <div>
              <div className='mx-auto w-16 h-16 flex items-center justify-center mb-4'>
                <img src='../../public/icons/info.svg' alt='resume-uploader' />
              </div>
              <p className='text-lg text-gray-500'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-lg text-gray-500'>
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
