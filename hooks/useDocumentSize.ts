import { useEffect, useLayoutEffect, useState } from 'react';

import { useMeasure } from './useMeasure';

export function useDocumentSize() {
  const [ref, size] = useMeasure();

  useLayoutEffect(() => {
    ref(document.body);
  }, [ref]);

  return size;
}
