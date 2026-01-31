import { type ReactMediaRecorderRenderProps } from 'react-media-recorder';
import styles from './styles.module.css';
import { UiButton, UiFlex, UiText } from '@common/ui';
import { cn } from '@common/lib/cn';
import {
  AudioOutlined,
  CaretRightFilled,
  PauseOutlined,
  XFilled,
} from '@ant-design/icons';

type Props = {
  showedTime: string;
};

export const RecordButton = ({
  startRecording,
  stopRecording,
  status,
  pauseRecording,
  resumeRecording,
  showedTime,
}: ReactMediaRecorderRenderProps & Props) => {
  const isRecording = status === 'recording';
  const isPaused = status === 'paused';

  const onClickRecord = () => {
    if (isRecording || isPaused) {
      return stopRecording();
    } else {
      return startRecording();
    }
  };

  const onClickPause = () => {
    if (isRecording) {
      return pauseRecording();
    }

    if (isPaused) {
      return resumeRecording();
    }
  };

  return (
    <UiFlex vertical gap={12}>
      <UiFlex
        className={styles.wrapper}
        align="center"
        justify="center"
        gap={4}
      >
        <UiFlex
          className={cn(
            styles.recordWrapper,
            (isRecording || isPaused) && styles.recordWrapperRecording,
          )}
          align="center"
          gap={12}
        >
          <UiButton
            className={styles.recordButton}
            shape="circle"
            onClick={onClickRecord}
            type="primary"
            danger
            icon={isRecording || isPaused ? <XFilled /> : <AudioOutlined />}
          />
          {(isRecording || isPaused) && (
            <UiText.Text style={{ color: 'white' }}>{showedTime}</UiText.Text>
          )}
        </UiFlex>
        {(isRecording || isPaused) && (
          <UiFlex className={cn(styles.pauseWrapper)} align="center">
            <UiButton
              className={styles.recordButton}
              size="small"
              shape="circle"
              onClick={onClickPause}
              type="default"
              icon={isRecording ? <PauseOutlined /> : <CaretRightFilled />}
            />
          </UiFlex>
        )}
      </UiFlex>
    </UiFlex>
  );
};
