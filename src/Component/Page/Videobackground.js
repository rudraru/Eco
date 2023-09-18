// BackgroundImage.js

import React from 'react';

const BackgroundImage = ({ children }) => {
  const backgroundImageStyle = {
    backgroundImage: `url('https://tse2.mm.bing.net/th?id=OIP.mzJy_JKVRRdMsD6dHhniVAHaCW&pid=Api&P=0&h=180')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    color: '#fff',
   
  };

  return (
    <div style={backgroundImageStyle}>
      {children}
    </div>
  );
};
  
export default BackgroundImage;

