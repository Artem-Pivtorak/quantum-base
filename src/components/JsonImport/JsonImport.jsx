import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { importFrames } from '../../redux/frames/framesSlice';

const JsonImport = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const frames = JSON.parse(event.target.result);
        if (Array.isArray(frames)) {
          dispatch(importFrames(frames));
          alert('Імпорт успішний!');
        } else {
          alert('Файл має містити масив фреймів.');
        }
      } catch (error) {
        alert('Помилка читання файлу: ' + error.message);
      }
      fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <h3>Імпорт фреймів із JSON</h3>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
    </div>
  );
};

export default JsonImport;