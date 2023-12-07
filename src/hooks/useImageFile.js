import { useCallback, useState } from 'react';
import { festivalStorageRef } from 'fb/firebase';

const accepted = {
  type: (targetFile) =>
    ['image/jpeg', 'image/png', 'image/webp'].includes(targetFile.type) || '지원하지 않는 파일 형식입니다.',
  size: (targetFile) => targetFile.size <= 5 * 1024 ** 2 || '파일 사이즈를 확인하세요'
};

export const useImageFile = () => {
  const [imageFiles, setImageFiles] = useState([]);

  const validateFile = useCallback((file) => {
    if (accepted.type(file) !== true) {
      return alert(accepted.type(file));
    }
    if (accepted.size(file) !== true) {
      return alert(accepted.size(file));
    }
    return accepted.type(file) && accepted.size(file);
  }, []);

  const handleUploadImageFiles = (e) => {
    const files = e.target.files;
    const filesArray = [];

    for (let file of files) {
      if (validateFile(file)) {
        const data = {
          file,
          preview: URL.createObjectURL(file),
          location: 'local'
        };
        filesArray.push(data);
      }
    }

    setImageFiles([...imageFiles, ...filesArray]);
  };

  // const handleUploadStorage = async (docID) => {
  //   const imgRef = festivalStorageRef(docID)
  //   try {
  //     await uploadBytes(imgRef, imgFileState.file)
  //   } catch (error) {

  //   }
  // }

  return [imageFiles, handleUploadImageFiles];
};
