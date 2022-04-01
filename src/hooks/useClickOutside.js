import { useEffect } from "react";

function useClickOutside(ref, closeCallback = () => null) {
  const handleClose = (e) => {
    if (!ref.current.contains(e.target)) {
      closeCallback();
    }
  };

  useEffect(() => {
    if (ref.current) {
      window.addEventListener("click", handleClose);
    }
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [ref]);
}

export default useClickOutside;
