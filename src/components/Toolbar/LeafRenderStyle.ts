import { FormattingBarIconTypes } from './types';
import fromPairs from 'lodash.frompairs';

/**
 * This files is responsible for handling the styles regarding to the formatting
 * This is special because it combines multiple styles to be applied to a leaf
 */

const LEAF_STYLE = new Map([
  [FormattingBarIconTypes.BOLD, ['fontWeight', 'bold']],
  [FormattingBarIconTypes.ITALIC, ['fontStyle', 'italic']],
  [FormattingBarIconTypes.UNDERLINED, ['textDecoration', 'underline']],
  [FormattingBarIconTypes.STRIKETHROUGHS, ['textDecoration', 'line-through']],
]);

const getLeafRenderStyle = (icons: FormattingBarIconTypes[]) => {
  const arrOfStyles = icons.map((icon) => LEAF_STYLE.get(icon) || []);
  return fromPairs(arrOfStyles);
};

export { getLeafRenderStyle };
