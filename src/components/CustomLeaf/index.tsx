import { RenderLeafProps } from 'slate-react/dist/components/editable';
import { getLeafRenderStyle } from '../Toolbar/LeafRenderStyle';

const CustomLeaf = (props: RenderLeafProps) => {
  const style = getLeafRenderStyle(props.leaf.format);

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};

export { CustomLeaf };
