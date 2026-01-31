'use client';
import { UiFlex, UiInput, UiButton, UiSpace } from '@common/ui'
import { useState, useMemo } from 'react';
import { sleep, uuid } from '@common/lib';
import { useRouter } from 'next/navigation';

export const CreateRoomWidget = () => {
    
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

    
  const isDisabled = useMemo(() => {
    return !name.trim()
  }, [name])


  const onClick = async () => {
    setIsLoading(true)
    const id = uuid.v4();
    await sleep(2000)
    router.push(`/rooms/${id}`)
    setIsLoading(false)
  }
    
  return (
    <UiFlex vertical>
      <UiSpace.Compact style={{ width: '100%' }}>
        <UiInput
          name='Имя'
          placeholder='Имя пользователя'
          onChange={(e) => setName(e.target.value)}
          status={isDisabled ? 'error' : ''}
          value={name}
        />
        <UiButton
          loading={isLoading}
          onClick={onClick}
          disabled={isDisabled}
          type='primary'
        >Играть</UiButton>
      </UiSpace.Compact>
    </UiFlex>
  )
}