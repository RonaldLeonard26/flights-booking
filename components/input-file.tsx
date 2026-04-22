'use client';

import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';

interface PropsTypes {
  name: string;
  isDropable?: boolean;
}

export default function InputFile(props: PropsTypes) {
  const { name, isDropable = false } = props;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const dropRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneId = useId();

  // Fungsi helper untuk menangani file dan preview sekaligus
  const handleFileAction = (file: File | null) => {
    if (preview) URL.revokeObjectURL(preview); //hapus preview lama jika ada

    if (file) {
      setUploadedImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setUploadedImage(null);
      setPreview(null);
    }
  };

  // pasang event listener ke ref untuk handleDrop
  useEffect(() => {
    const dropCurrent = dropRef.current;

    const preventDefault = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onDrop = (e: DragEvent) => {
      preventDefault(e);
      if (isDropable && e.dataTransfer?.files?.[0]) {
        const file = e.dataTransfer.files[0];
        handleFileAction(file);

        // sinkron ke input asli agar form tetap valid
        if (inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          inputRef.current.files = dataTransfer.files;
        }
      }
    };

    if (dropCurrent && isDropable) {
      dropCurrent.addEventListener('dragover', preventDefault);
      dropCurrent.addEventListener('dragenter', preventDefault);
      dropCurrent.addEventListener('drop', onDrop);

      return () => {
        dropCurrent.removeEventListener('dragover', preventDefault);
        dropCurrent.removeEventListener('dragenter', preventDefault);
        dropCurrent.removeEventListener('drop', onDrop);
      };
    }
  }, [isDropable, preview]);

  return (
    <label
      ref={dropRef}
      htmlFor={`dropzone-file${dropzoneId}`}
      className="w-full min-h-24 flex flex-coll  border-2 border-dashed rounded-lg p-6 items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      {preview ? (
        <div className=" relative flex flex-col items-center justify-center p-4">
          <div className=" relative w-1/2 mb-2">
            <Image fill src={preview} alt="image" className="relative!" />
          </div>
          <p className="text-sm font-semibold text-center text-gray-500">
            {uploadedImage?.name}
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
        onChange={(e) => handleFileAction(e.target.files?.[0] || null)}
      />
    </label>
  );
}
