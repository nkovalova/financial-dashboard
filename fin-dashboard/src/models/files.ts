import axiosClient from '../utils/axiosClient';

type FormData = {
  file: File;
}

class FilesModel {
  uploadCsv(formData: FormData): Promise<boolean> {
    return axiosClient.post('/api/upload/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new FilesModel();
