import { useRef } from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, setCode }) {
  const editorRef = useRef(null);

  const onMount = (editor) => {
    editorRef.current = editor;
  };

  const handleFormat = () => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run();
  };

  return (
    <section>
      <button type="button" className="secondary" onClick={handleFormat}>
        Format Code
      </button>
      <Editor
        height="380px"
        defaultLanguage="python"
        language="python"
        value={code}
        onChange={(value) => setCode(value || '')}
        onMount={onMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          fontSize: 14,
          automaticLayout: true,
          formatOnType: true,
          formatOnPaste: true
        }}
      />
    </section>
  );
}

export default CodeEditor;
