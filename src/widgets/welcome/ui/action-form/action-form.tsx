import { UiDivider, UiFlex, UiText } from '@common/ui';
import { TeamOutlined } from '@ant-design/icons';
import { InputAction } from '@common/ui';

export const ActionForm = () => {
  const onCreate = (name: string) => {
    alert(`name ${name}`);
  };

  const onConnect = (id: string) => {
    alert(`id ${id}`);
  };

  return (
    <UiFlex vertical gap={12}>
      <InputAction
        placeholder="Введи свое имя"
        buttonText="Создать комнату"
        onSubmit={onCreate}
        icon={<TeamOutlined />}
      />
      <UiDivider>
        <UiText.Text>или</UiText.Text>
      </UiDivider>
      <InputAction
        placeholder="Введи код комнаты"
        buttonText="Подключиться"
        buttonColor="blue"
        onSubmit={onConnect}
      />
    </UiFlex>
  );
};
