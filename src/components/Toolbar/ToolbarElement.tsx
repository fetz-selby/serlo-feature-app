import { IconButton } from '@mui/material';
import { cloneElement, useCallback, useId, useState } from 'react';
import { getIconRender } from './IconsMap';
import { FormattingBarIconTypes } from './types';

interface ToolbarElementProps {
  icon: FormattingBarIconTypes;
  onIconClicked: (c: FormattingBarIconTypes, state: boolean) => void;
}

/**
 * Since all clickable icon has similar props and implementation
 * This is a core component to shape the icon to a toolbar functioning
 * component.
 */

const ToolbarElement = ({ icon, onIconClicked }: ToolbarElementProps) => {
  const [toggle, setToggle] = useState(false);
  const iconId = useId();

  const handleOnIconClicked = useCallback(() => {
    setToggle((prev) => !prev);
    onIconClicked(icon, !toggle);
  }, [toggle, icon, onIconClicked]);

  const cloned = cloneElement(<IconButton />, {
    id: iconId,
    key: iconId,
    onClick: () => handleOnIconClicked(),
  });

  return <cloned.type {...cloned.props}>{getIconRender(icon)}</cloned.type>;
};

export { ToolbarElement };
