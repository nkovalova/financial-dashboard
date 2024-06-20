import React, { useState } from 'react';
import { file as fileModel } from '../../../models/files';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if(!file) {
      console.log('Add file');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await fileModel.uploadCsv(formData)
      console.log('File uploaded successfully');
    } catch (error) {
      console.log('Error uploading file', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
