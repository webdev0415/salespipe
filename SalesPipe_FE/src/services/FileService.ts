import api from './api';

const uploadImageUrl = `${process.env.REACT_APP_API_KEY}/files/uploadImage`;
const uploadVideoUrl = `${process.env.REACT_APP_API_KEY}/files/uploadVideo`;
const dataURIToBlob = (dataURI: string) => {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
};

const base64ToFormData = (base64: string): any => {
  const formData = new FormData();

  formData.append('avatar', dataURIToBlob(base64));

  return formData;
};

const axiosUploadImage = async (base64: string) => {
  const formData = base64ToFormData(base64);

  return await api.post('/files/uploadImage', formData);
};

const axiosUploadVideo = async (base64: string) => {
  const formData = base64ToFormData(base64);

  return await api.post('/files/uploadVideo', formData);
};

const axiosUploadVideoF = async (file: any) => {
  const formData = new FormData();

  formData.append('video', file);

  return await api.post('/files/uploadVideo', formData);
};

export const FileService = {
  uploadImageUrl,
  uploadVideoUrl,
  axiosUploadImage,
  axiosUploadVideo,
  axiosUploadVideoF
};
