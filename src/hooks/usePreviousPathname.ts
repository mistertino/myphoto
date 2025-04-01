/* eslint-disable no-restricted-globals */

'use client';

import { useEffect, useRef, useState } from 'react';

const usePreviousPathname = (): string | undefined => {
  const [prePath, setPrePath] = useState<string | undefined>(undefined);
  const previousPathnameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const storedPath = sessionStorage.getItem('prePath');
    if (storedPath) {
      setPrePath(storedPath);
      previousPathnameRef.current = storedPath;
    }

    const handleChangeRoute = () => {
      const currentPath = window.location.pathname;
      sessionStorage.setItem('prePath', currentPath);

      if (previousPathnameRef.current !== undefined) {
        setPrePath(previousPathnameRef.current);
      }
      previousPathnameRef.current = currentPath;
    };

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      setTimeout(handleChangeRoute);
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      setTimeout(handleChangeRoute);
    };

    window.addEventListener('popstate', handleChangeRoute);

    return () => {
      window.removeEventListener('popstate', handleChangeRoute);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return prePath;
};

export default usePreviousPathname;

/* eslint-disable no-restricted-globals */

// 'use client';

// import { useEffect, useRef, useState } from 'react';

// const usePreviousPathname = (): string | undefined => {
//   const [prePath, setPrePath] = useState<string | undefined>(undefined);
//   const previousPathnameRef = useRef<string | undefined>(undefined);
//   useEffect(() => {
//     const storedPath = sessionStorage.getItem('prePath');
//     if (storedPath) {
//       setPrePath(storedPath);
//       previousPathnameRef.current = storedPath;
//     }
//     const handleChangeRoute = () => {
//       const currentPath = window.location.pathname;
//       sessionStorage.setItem('prePath', currentPath);

//       if (previousPathnameRef.current !== undefined) {
//         setPrePath(previousPathnameRef.current);
//       }
//       previousPathnameRef.current = currentPath;
//     };

//     const originalPushState = history.pushState;
//     const originalReplaceState = history.replaceState;

//     history.pushState = function (...args) {
//       originalPushState.apply(history, args);
//       handleChangeRoute();
//     };

//     history.replaceState = function (...args) {
//       originalReplaceState.apply(history, args);
//       handleChangeRoute();
//     };

//     window.addEventListener('popstate', handleChangeRoute);
//     return () => {
//       window.removeEventListener('popstate', handleChangeRoute);
//       history.pushState = originalPushState;
//       history.replaceState = originalReplaceState;
//     };
//   }, []);
//   return prePath;
// };

// export default usePreviousPathname;
