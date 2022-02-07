import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user'
};

type Props = {
  afterConfirm: (base64: string) => Promise<void>;
};

export const SharedWebcamImage: React.FC<Props> = ({ afterConfirm }: Props) => {
  const webcamRef = useRef<any>(null);
  const [imageCaptured, setImageCaptured] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImageCaptured(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImageCaptured(null);
  };

  const confirmImage = useCallback(async () => {
    setIsUploading(true);
    await afterConfirm(imageCaptured);
    setImageCaptured(false);
    setIsUploading(false);
  }, [imageCaptured, afterConfirm]);

  return !imageCaptured ? (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <Button onClick={capture}>Capture photo</Button>
    </>
  ) : (
    <>
      <div>
        <div style={{ position: 'relative' }}>
          <img
            src={imageCaptured}
            alt="avatar"
            style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}
          />
          {isUploading && (
            <LoadingOutlined
              style={{
                fontSize: '500px',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
          )}
        </div>
        <Button onClick={retake}>Retake photo</Button>
        <Button onClick={confirmImage}>Upload</Button>
      </div>
    </>
  );
};
