import React, { useEffect } from 'react';
import ReactDom from 'react-dom';


const Modal = React.memo(({ children, open }) => {
  const domNode = document.getElementById('portal');
  const element = document.createElement('div');
  useEffect(() => {
    domNode?.appendChild(element);
    return () => {
      domNode?.removeChild(element);
    };
  });

  return open ? ReactDom.createPortal(children, element) : null;
});

export default Modal;