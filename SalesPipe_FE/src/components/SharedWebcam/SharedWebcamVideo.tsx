import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useStopwatch } from 'common/helper/customHook';
type Props = {
  afterConfirm: (blob: any) => Promise<void>;
};
export const SharedWebcamVideo: React.FC<Props> = ({ afterConfirm }: Props) => {
  const webcamRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useStopwatch();

  const [recordedChunks, setRecordedChunks] = useState([]);
  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    if (elapsedTime > 0) {
      resetTimer();
      startTimer();
      setRecordedChunks([]);
    } else {
      startTimer();
    }
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm'
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [elapsedTime, handleDataAvailable, resetTimer, startTimer]);

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    stopTimer();
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleUpload = React.useCallback(() => {
    setIsUploading(true);
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });

      afterConfirm(blob);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
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

      <div>
        {capturing ? (
          <Button onClick={handleStopCaptureClick}>Stop Capture</Button>
        ) : (
          <Button onClick={handleStartCaptureClick}>Start Capture</Button>
        )}
        <Button style={{ cursor: 'auto' }} loading={capturing}>
          {elapsedTime} s
        </Button>
        {recordedChunks.length > 0 && (
          <Button onClick={handleUpload}>Upload</Button>
        )}
      </div>
    </>
  );
};
