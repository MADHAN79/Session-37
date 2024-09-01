import "./index.css"
import { useState, useEffect } from 'react';

const App = () => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const createFile = async () => {
    const response = await fetch('https://session-37.onrender.com/create-file', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message);
    fetchFiles(); // Refresh the list of files
  };

  const fetchFiles = async () => {
    const response = await fetch('https://session-37.onrender.com/files');
    const data = await response.json();
    setFiles(data.files);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File System</h1>
      <button 
        onClick={createFile} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New File
      </button>
      {message && <p className="mb-4">{message}</p>}
      <h2 className="text-xl font-semibold">Available Files:</h2>
      <ul className="list-disc pl-5">
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
