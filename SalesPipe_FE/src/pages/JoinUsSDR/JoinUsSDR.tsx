import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, message, Modal, Select, Upload } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined
} from '@ant-design/icons';
import ReactFullpage from '@fullpage/react-fullpage';

import { useDispatch } from 'react-redux';
import './JoinUsSDR.less';
import { asyncCreateSDRProfile } from 'redux/profiles/profile-slice';
import { FileService } from 'services/FileService';
import * as SDRFIELDS from 'shared/sharedSDRFields';
import { Redirect } from 'react-router-dom';
import { SharedWebcamImage } from 'components/SharedWebcam/SharedWebcamImage';
import { SharedWebcamVideo } from 'components/SharedWebcam/SharedWebcamVideo';
import { getInfoFromImageUrl } from 'utils/faceApi';

enum fields {
  firstName = 1,
  lastName,
  email,
  linkedIn,
  phone,
  country,
  languages,
  yose,
  saleChannels,
  saleSkills,
  saleTools,
  headline,
  bio,
  rate,
  hoursPerWeek,
  workHistory,
  avatar,
  video
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();

  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const JoinUsSDR: React.FC = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState<any>(null);
  const [fileListVideo, setFileListVideo] = useState<any>(undefined);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadVideoLoading, setUploadVideoLoading] = useState(false);
  const [isModalCaptureImageOpen, setIsModalCaptureImageOpen] = useState(false);
  const [isModalCaptureVideoOpen, setIsModalCaptureVideoOpen] = useState(false);

  const handleChangeImage = (info: any): void => {
    if (info.file.status === 'uploading') {
      setImageUrl('');
      setUploadLoading(true);

      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imgUrl: string) => {
        setImageUrl(imgUrl);
        form.setFieldsValue({ avatar: info.file.response.Location });
        setUploadLoading(false);
      });
    }
  };

  const handleChangeVideo = (info: any): void => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      message.success('Upload completed');
      form.setFieldsValue({ video: info.file.response.Location });
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setIsLoading(true);
      getInfoFromImageUrl(imageUrl).then((info: any) => {
        const expression = Object.keys(info.expressions).reduce((a, b) =>
          info.expressions[a] > info.expressions[b] ? a : b
        );

        setImageInfo({ ...info, expression });
        setIsLoading(false);
      });
    }
  }, [imageUrl]);

  const JoinUsSDR = useCallback(
    async (values: any): Promise<void> => {
      values.saleSkills = values.saleSkills.join(',');
      values.saleTools = values.saleTools.join(',');
      values.languages = values.languages.join(',');
      const { age, gender, expression } = imageInfo as any;

      const newProfile = asyncCreateSDRProfile({
        data: {
          ...values,
          industries: [],
          type: 'SDR',
          age,
          gender,
          expression
        },
        afterSucces: (userId: string) => {
          setIsSuccess(true);
          setNewUserId(userId);
        }
      });

      dispatch(newProfile);
    },
    [imageInfo, dispatch]
  );

  const handleCatchFormError = (error: any, fullpageApi: any): void => {
    if (error && error.errorFields.length > 0) {
      fullpageApi.moveTo(fields[error.errorFields[0].name]);
    }
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const uploadVideoButton = (
    <div>{uploadVideoLoading && <LoadingOutlined />}</div>
  );
  const afterConfirmCapture = useCallback(
    async (base64: string) => {
      const res = await FileService.axiosUploadImage(base64);

      if (res.data) {
        setImageUrl(base64);
        form.setFieldsValue({ avatar: res.data.Location });
        message.success('Upload completed');
      }
      setIsModalCaptureImageOpen(false);
    },
    [form]
  );

  const afterConfirmCaptureVideo = useCallback(
    async (blob: any) => {
      console.log(blob);
      const res = await FileService.axiosUploadVideoF(blob);

      if (res.data) {
        form.setFieldsValue({ video: res.data.Location });
        message.success('Upload completed');

        setFileListVideo([{ name: 'Video Captured' }]);
      }
      setIsModalCaptureVideoOpen(false);
    },
    [form]
  );
  const onRemove = (t: any) => {
    if (fileListVideo) {
      setFileListVideo((x: any) => {
        const index = x.indexOf((y: any) => y.name === t.name);

        if (index > -1) {
          x.splice(index, 1);
        } else {
          return undefined;
        }

        return [...x];
      });
    }
  };

  const modalCaptureImage = useCallback(() => {
    return (
      isModalCaptureImageOpen && (
        <Modal
          title={`Capture Image`}
          visible={isModalCaptureImageOpen}
          onCancel={() => setIsModalCaptureImageOpen(false)}
          footer={null}
          width={1280}>
          <SharedWebcamImage afterConfirm={afterConfirmCapture} />
        </Modal>
      )
    );
  }, [afterConfirmCapture, isModalCaptureImageOpen]);

  const modalCaptureVideo = () => {
    return (
      isModalCaptureVideoOpen && (
        <Modal
          title={`Capture Video`}
          visible={isModalCaptureVideoOpen}
          onCancel={() => setIsModalCaptureVideoOpen(false)}
          footer={null}
          width={1280}>
          <SharedWebcamVideo afterConfirm={afterConfirmCaptureVideo} />
        </Modal>
      )
    );
  };

  const validateSingleFormItem = (name: string, fullpageApi: any): void => {
    form.validateFields([name]).then(() => {
      if (fullpageApi) fullpageApi.moveSectionDown();
    });
  };

  return (
    <ReactFullpage
      scrollingSpeed={500}
      render={({ fullpageApi }): JSX.Element => {
        return (
          <ReactFullpage.Wrapper>
            <Form
              form={form}
              className="join-us-sdr-page"
              layout="vertical"
              onFinish={JoinUsSDR}
              onFinishFailed={(props): void =>
                handleCatchFormError(props, fullpageApi)
              }
              autoComplete="off">
              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.firstName(() => {
                    validateSingleFormItem('firstName', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('firstName', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.lastName(() => {
                    validateSingleFormItem('lastName', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('lastName', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.email(() => {
                    validateSingleFormItem('email', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('email', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.linkedin(() => {
                    validateSingleFormItem('linkedIn', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('linkedIn', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.phone(() => {
                    validateSingleFormItem('phone', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('phone', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.country()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('country', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.languages()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('language', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.yose()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('yearsExperience', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.saleChannels()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('saleChannels', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.saleSkills()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('saleSkills', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.saleTools()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('saleTools', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.headline(() => {
                    validateSingleFormItem('headline', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('headline', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.bio()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('bio', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.rate(() => {
                    validateSingleFormItem('rate', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('rate', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>
              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.hoursPerWeek(() => {
                    validateSingleFormItem('hoursPerWeek', fullpageApi);
                  })}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('hoursPerWeek', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  {SDRFIELDS.workHistory()}
                  <Button
                    type="primary"
                    onClick={(): void =>
                      validateSingleFormItem('workHistory', fullpageApi)
                    }>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item label="Profile picture" name="avatar">
                    <div>
                      <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        action={FileService.uploadImageUrl}
                        onChange={handleChangeImage}
                        fileList={fileListVideo}>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{ width: '100%' }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>

                      {imageUrl &&
                        (isLoading ? (
                          <div>
                            <LoadingOutlined />
                          </div>
                        ) : (
                          imageInfo && (
                            <div>
                              <div style={{ textTransform: 'capitalize' }}>
                                Gender: {imageInfo.gender}
                              </div>
                              <div>Age: {parseInt(imageInfo.age)}</div>
                              <div style={{ textTransform: 'capitalize' }}>
                                Expression: {imageInfo.expression}
                              </div>
                            </div>
                          )
                        ))}

                      <Button
                        onClick={() => {
                          setIsModalCaptureImageOpen(true);
                        }}>
                        Click Here to capture
                      </Button>
                    </div>
                  </Form.Item>
                  <Button
                    type="primary"
                    onClick={(): void => {
                      if (!isLoading) fullpageApi.moveSectionDown();
                    }}>
                    Next
                  </Button>
                </div>
              </div>

              <div className="section">
                <div className="form-item-wrapper">
                  <Form.Item label="Video Upload" name="video">
                    {uploadVideoButton}

                    <Upload
                      name="video"
                      action={FileService.uploadVideoUrl}
                      onRemove={onRemove}
                      onChange={handleChangeVideo}
                      fileList={fileListVideo}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Button
                      style={{ marginTop: '5px' }}
                      onClick={() => {
                        setIsModalCaptureVideoOpen(true);
                      }}>
                      Click Here to capture
                    </Button>
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign up
                  </Button>
                </div>
              </div>
            </Form>
            {isSuccess && newUserId !== '' && <Redirect to={`/profile`} push />}
            {modalCaptureImage()}
            {modalCaptureVideo()}
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};
