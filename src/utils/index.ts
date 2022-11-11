import { FormattingBarIconTypes } from '../components/Toolbar/types';

const removeItem = (
  item: FormattingBarIconTypes,
  arr: FormattingBarIconTypes[]
) => arr.filter((itm) => itm !== item);

export { removeItem };
