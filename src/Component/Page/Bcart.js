import React, { useState, useEffect } from 'react';


const Bcart = () => {
  const [objects, setObjects] = useState([{ id: 1, x: 0, y: 0 }]);
  const [buttonPosition, setButtonPosition] = useState({
    top: '50%',
    left: '50%',
  });

  const handleButtonClick = () => {
    setObjects(prevObjects => prevObjects.concat(prevObjects.map(obj => ({ ...obj, id: obj.id * 2 }))));
  };

  useEffect(() => {
    const mouseMoveHandler = (e) => {
      const updatedObjects = objects.map(obj => ({ ...obj, x: e.clientX, y: e.clientY }));
      setObjects(updatedObjects);
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [objects]);

  return (
    <div className="cursor-container">
      {objects.map(obj => (
        <div key={obj.id} className="custom-cursor" style={{ top: obj.y, left: obj.x }}></div>
      ))}
      <div
        style={{
          position: 'absolute',
          top: buttonPosition.top,
          left: buttonPosition.left,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <button id="myButton" onClick={handleButtonClick}>
          Click me!
        </button>
      </div>
    </div>
  );
};

export default Bcart;
