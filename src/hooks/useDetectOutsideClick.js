import { useEffect, useRef } from "react";

export function useDetectOutsideClick(callback, listenCapturing = true) {
    const ref = useRef(null);

    useEffect(() => {
      function handleClick(e) {
        if(ref.current && !ref.current.contains(e.target)){
          callback();
        }
          
      }
      document.addEventListener("click", handleClick, listenCapturing);
  
      return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [callback, listenCapturing]);

    return ref;
}
