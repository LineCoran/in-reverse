'use client';
import { Flex } from 'antd';
import { ReactMediaRecorder } from 'react-media-recorder';
import { UiFlex, UiText } from '@common/ui';
import { useReverseAudio, useTimer } from '../hooks';
import { RecordButton } from '../ui/record-button';

export const View = () => {
  const { onStopRecord, reversedAudio, originAudio } = useReverseAudio();
  const {
    stop: stopTimer,
    start: startTimer,
    continueTimer,
    pauseTimer,
    formatedValue,
  } = useTimer();

  const handleStop = (...args: Parameters<typeof onStopRecord>) => {
    void onStopRecord(...args);
    stopTimer();
  };

  const onPauseRecording = (cb: () => void) => {
    cb();
    pauseTimer();
  };

  const onResumeRecording = (cb: () => void) => {
    cb();
    continueTimer();
  };

  return (
    <Flex vertical>
      <ReactMediaRecorder
        audio
        onStart={startTimer}
        onStop={handleStop}
        render={(restOf) => (
          <>
            <RecordButton
              showedTime={formatedValue}
              {...restOf}
              pauseRecording={() => onPauseRecording(restOf.pauseRecording)}
              resumeRecording={() => onResumeRecording(restOf.resumeRecording)}
            />

            {originAudio && (
              <UiFlex vertical gap={8}>
                <UiText>Оригинальная дорожка:</UiText>
                <audio
                  src={originAudio}
                  controls
                  style={{ width: '100%' }}
                />
              </UiFlex>
            )}
            {reversedAudio && (
              <UiFlex vertical gap={8}>
                <UiText>Обратная дорожка (задом наперед):</UiText>
                <audio src={reversedAudio} controls style={{ width: '100%' }} />
              </UiFlex>
            )}
          </>
        )}
      />
    </Flex>
  );
};
