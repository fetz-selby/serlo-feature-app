import "./App.css";
import { Editor } from "./components/Editor";
import { CommentProvider } from "./context/CommentContext";

function App() {
  return (
    <CommentProvider>
      <Editor sentence="There're always problems to solve, and this one in particular is Serlos problem" />
    </CommentProvider>
  );
}

export default App;
