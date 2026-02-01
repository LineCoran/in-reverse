import { ButtonBlock } from './button-block';
import {
  _ButtonColorTypes,
  _ButtonVariantTypes,
} from 'antd/es/button/buttonHelpers';

export function View() {
  const colors = 4;
  return (
    <div
      style={{
        width: '100%',
        gap: '16px',
        display: 'grid',
        gridTemplateColumns: `repeat(${colors}, 1fr)`,
        gridTemplateRows: `1fr`,
      }}
    >
      {_ButtonVariantTypes.map((variant) =>
        [..._ButtonColorTypes]
          .splice(0, colors)
          .map((color) => (
            <ButtonBlock
              color={color}
              key={`${color}_${variant}`}
              variant={variant}
            />
          )),
      )}
    </div>
  );
}
