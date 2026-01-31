import { useEffect, useState } from 'react';

export const useReverseAudio = () => {
  // Функция для создания обратного аудио
  const [originAudio, setOriginAudio] = useState<string | null>(null);
  const [reversedAudio, setReversedAudio] = useState<string | null>(null);
  const reverseAudio = async (blob: Blob) => {
    try {
      // 1. Создаем AudioContext
      // @ts-expect-error
      const audioContext = new (window.AudioContext || (window as unknown).webkitAudioContext)();

      // 2. Преобразуем Blob в ArrayBuffer
      const arrayBuffer = await blob.arrayBuffer();

      // 3. Декодируем аудиоданные
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // 4. Создаем новый AudioBuffer для обратного аудио
      const reversedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
      );

      // 5. Переворачиваем каждый канал
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const reversedData = reversedBuffer.getChannelData(channel);

        for (let i = 0; i < channelData.length; i++) {
          reversedData[i] = channelData[channelData.length - 1 - i];
        }
      }

      // 6. Конвертируем обратно в Blob
      const numberOfChannels = reversedBuffer.numberOfChannels;
      const length = reversedBuffer.length;
      const sampleRate = reversedBuffer.sampleRate;
      const newArrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);

      // Создаем WAV-заголовок
      const view = new DataView(newArrayBuffer);

      // RIFF identifier
      writeString(view, 0, 'RIFF');
      // RIFF chunk length
      view.setUint32(4, 36 + length * numberOfChannels * 2, true);
      // RIFF type
      writeString(view, 8, 'WAVE');
      // format chunk identifier
      writeString(view, 12, 'fmt ');
      // format chunk length
      view.setUint32(16, 16, true);
      // sample format (raw)
      view.setUint16(20, 1, true);
      // channel count
      view.setUint16(22, numberOfChannels, true);
      // sample rate
      view.setUint32(24, sampleRate, true);
      // byte rate (sample rate * block align)
      view.setUint32(28, sampleRate * numberOfChannels * 2, true);
      // block align (channel count * bytes per sample)
      view.setUint16(32, numberOfChannels * 2, true);
      // bits per sample
      view.setUint16(34, 16, true);
      // data chunk identifier
      writeString(view, 36, 'data');
      // data chunk length
      view.setUint32(40, length * numberOfChannels * 2, true);

      // Записываем PCM-данные
      const offset = 44;
      for (let i = 0; i < length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const sample = Math.max(-1, Math.min(1, reversedBuffer.getChannelData(channel)[i]));
          view.setInt16(offset + (i * numberOfChannels + channel) * 2, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        }
      }

      // Создаем Blob из ArrayBuffer
      const reversedBlob = new Blob([newArrayBuffer], { type: 'audio/wav', });
      const reversedUrl = URL.createObjectURL(reversedBlob);

      return reversedUrl;
    } catch (error) {
      console.error('Error creating reversed audio:', error);
      return null;
    }
  };

  // Вспомогательная функция для записи строк в DataView
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // Обработчик остановки записи
  const onStopRecord = async (blobUrl: string, blob: Blob) => {
    // Сохраняем оригинальную дорожку
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
      // }
    };
  }, [originAudio, reversedAudio]);
    
  return {
    onStopRecord,
    originAudio,
    reversedAudio,
  }
}