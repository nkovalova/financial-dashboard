import { useState } from 'react';
import transactionsModel from '../../models/transactions';

const useUploadFile = (onUploadSuccess: () => void) => {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await transactionsModel.uploadCsv(formData);
      onUploadSuccess();
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading };
};

export default useUploadFile;
