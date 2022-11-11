import './App.css';
import { Editor } from './components/Editor';
import { CommentProvider } from './context/CommentContext';
import { story } from './constants';

function App() {
  return (
    <CommentProvider>
      <Editor text={story} />
    </CommentProvider>
  );
}

export default App;
