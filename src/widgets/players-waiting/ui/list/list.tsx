import type { Item } from '../../types';
import { Player } from '../player';
import { UiButton, UiFlex, UiText } from '@common/ui';
import { config } from '../../config';

type Props = {
  list: Item[];
};

export const List = ({ list }: Props) => {
  return (
    <UiFlex vertical gap={8}>
      <UiText.Title level={5}>Игроки:</UiText.Title>
      <UiFlex vertical gap={16}>
        {list.map((item) => (
          <Player
            key={item.id}
            isOwner={item.isOwner}
            name={item.name}
            status={item.status}
            isMe={config.fakeOwnerId === item.id}
          />
        ))}
      </UiFlex>
      {list.length !== config.maxPlayersCount && (
        <UiButton
          style={{ paddingBlock: '24px' }}
          type="dashed"
          block
          disabled
          size="large"
          loading
        >
          Ожидание второго игрока...
        </UiButton>
      )}
    </UiFlex>
  );
};
