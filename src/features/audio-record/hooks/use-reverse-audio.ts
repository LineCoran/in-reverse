import { useEffect, useState } from 'react';

export const useReverseAudio = () => {
  const [originAudio, setOriginAudio] = useState<string | null>(null);
  const [reversedAudio, setReversedAudio] = useState<string | null>(null);
  const reverseAudio = async (blob: Blob) => {
    try {
      const audioContext = new AudioContext();

      const arrayBuffer = await blob.arrayBuffer();

      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const reversedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate,
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const reversedData = reversedBuffer.getChannelData(channel);

        for (let i = 0; i < channelData.length; i++) {
          reversedData[i] = channelData[channelData.length - 1 - i];
        }
      }

      const numberOfChannels = reversedBuffer.numberOfChannels;
      const length = reversedBuffer.length;
      const sampleRate = reversedBuffer.sampleRate;
      const newArrayBuffer = new ArrayBuffer(
        44 + length * numberOfChannels * 2,
      );

      const view = new DataView(newArrayBuffer);

      writeString(view, 0, 'RIFF');
      view.setUint32(4, 36 + length * numberOfChannels * 2, true);
      writeString(view, 8, 'WAVE');
      writeString(view, 12, 'fmt ');
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numberOfChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numberOfChannels * 2, true);
      view.setUint16(32, numberOfChannels * 2, true);
      view.setUint16(34, 16, true);
      writeString(view, 36, 'data');
      view.setUint32(40, length * numberOfChannels * 2, true);

      const offset = 44;
      for (let i = 0; i < length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = Math.max(
            -1,
            Math.min(1, reversedBuffer.getChannelData(channel)[i]),
          );
          view.setInt16(
            offset + (i * numberOfChannels + channel) * 2,
            sample < 0 ? sample * 0x8000 : sample * 0x7fff,
            true,
          );
        }
      }

      const reversedBlob = new Blob([newArrayBuffer], { type: 'audio/wav' });
      return URL.createObjectURL(reversedBlob);
    } catch (error) {
      console.error('Error creating reversed audio:', error);
      return null;
    }
  };

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const onStopRecord = async (blobUrl: string, blob: Blob) => {
    setOriginAudio(blobUrl);

    const reversedUrl = await reverseAudio(blob);
    if (reversedUrl) {
      setReversedAudio(reversedUrl);
    }
  };

  useEffect(() => {
    return () => {
      // :TODO Добавить очистку
      // if (originAudio) {
      //   URL.revokeObjectURL(originAudio);
      // }
      // if (reversedAudio) {
      //   URL.revokeObjectURL(reversedAudio);
    };
  }, [originAudio, reversedAudio]);

  return {
    onStopRecord,
    originAudio,
    reversedAudio,
  };
};
