import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapture) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick() {
        if (ref.current && !ref.current.contains(event.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapture);

      () => document.removeEventListener("click", handleClick, listenCapture);
    },
    [handler, listenCapture]
  );

  return ref;
}
