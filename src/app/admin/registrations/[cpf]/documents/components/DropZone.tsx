'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function CNHDropZone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Arraste e solte os arquivos aqui...</p>
      ) : (
        <p>
          Arraste e solte os arquivos aqui, ou clique para selecionar arquivos
        </p>
      )}
    </div>
  );
}
