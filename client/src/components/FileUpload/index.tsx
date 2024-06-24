import React, { ChangeEvent, useRef, useState } from "react";
import useUploadFile from "./useFileUpload";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const { uploadFile, uploading } = useUploadFile(() => {
    onUploadSuccess();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () =>
    file && uploadFile(file).then(() => setFile(null));

  return (
    <div className={styles.container}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={uploading}
        accept=".csv"
      />
      <button onClick={handleFileUpload} disabled={!file || uploading}>
        {uploading ? <div className={styles.spinner} /> : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
