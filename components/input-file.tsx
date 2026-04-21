'use client';

import { Upload } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useEffect, useId, useRef, useState } from 'react';

interface PropsTypes {
  name: string;
  isDropable: boolean;
}

export default function InputFile(props: PropsTypes) {
  const { name, isDropable = false } = props;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      (e.preventDefault(), e.stopPropagation());
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setUploadedImage(e.dataTransfer?.files?.[0] || null);
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener('dragover', handleDragOver);
      dropCurrent.addEventListener('drop', handleDrop);

      return () => {
        dropCurrent.removeEventListener('dragover', handleDragOver);
        dropCurrent.removeEventListener('drop', handleDrop);
      };
    }
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }
  };

  return (
    <label
      ref={drop}
      htmlFor={`dropzone-file${dropzoneId}`}
      className="w-full min-h-24 flex flex-coll  border-2 border-dashed rounded-lg p-6 items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      {uploadedImage ? (
        <div className=" relative flex flex-col items-center justify-center p-4">
          <div className=" relative w-1/2 mb-2">
            <Image
              fill
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              className="relative!"
            />
          </div>
          <p className="text-sm font-semibold text-center text-gray-500">
            {uploadedImage.name}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4">
          <Upload className="mb-2 w-10 h-10  text-gray-400" />
          <p className="text-sm font-semibold text-center text-gray-500">
            {isDropable
              ? 'Drag and drop or click to upload image'
              : 'Click to upload image'}
          </p>
        </div>
      )}
      <input
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
        id={`dropzone-file${dropzoneId}`}
        onChange={handleOnChange}
      />
    </label>
  );
}
