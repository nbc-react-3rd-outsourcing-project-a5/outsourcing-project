import { storage } from '../fb/firebase';
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import uuid from 'react-uuid';

const uploadFile = async (storageName, docID, file) => {
  const imageID = `${storageName}-${uuid()}`;
  const imagePath = `${storageName}/${docID}/${imageID}`;
  const imageRef = ref(storage, imagePath);
  try {
    await uploadBytes(imageRef, file);
    const image = {
      path: imagePath,
      url: await getDownloadURL(imageRef)
    };
    return image;
  } catch (error) {
    console.error(error);
  }
};

export const uploadFiles = async (storageName, docID, files) => {
  try {
    const res = await Promise.all(
      files.map(async (file) => {
        return await uploadFile(storageName, docID, file);
      })
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
