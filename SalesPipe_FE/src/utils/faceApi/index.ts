import * as faceapi from 'face-api.js';
import canvas from 'canvas';

export interface InfoFaceApi {
  gender: any;
  genderProbability: any;
  age: any;
  expressions: any;
}
const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
const minConfidence = 0.5;
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({
  minConfidence
});

export const getInfoFromImageUrl = async (imgUrl: string) => {
  await faceDetectionNet.loadFromUri('/models');
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
  await faceapi.nets.ageGenderNet.loadFromUri('/models');
  await faceapi.nets.faceExpressionNet.loadFromUri('/models');

  const img = await canvas.loadImage(imgUrl);
  const result = await faceapi
    .detectSingleFace(img as any, faceDetectionOptions)
    .withFaceExpressions()
    .withAgeAndGender();

  return result;
};
