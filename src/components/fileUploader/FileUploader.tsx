import { ChangeEvent, ReactElement } from 'react';

import styles from './FileUploader.module.css';

interface FileUploaderProps {
  onFileUpload: (file: File) => Promise<void>;
}

const FileUploader = ({ onFileUpload }: FileUploaderProps): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.fileUploader}>
      <label
        htmlFor="csv-upload"
        className={styles.uploadLabel}
      >
        Upload CSV
      </label>
      <input
        type="file"
        id="csv-upload"
        accept=".csv"
        onChange={handleChange}
        className={styles.fileInput}
      />
    </div>
  );
};

export default FileUploader;
