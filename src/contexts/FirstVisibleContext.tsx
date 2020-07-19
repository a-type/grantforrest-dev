import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { debounce } from '../lib/debounce';
import { Fade } from '@material-ui/core';

export const FirstVisibleContext = React.createContext<{
  firstKey: string | null;
  backgroundRef: React.RefObject<HTMLDivElement> | null;
}>({
  firstKey: null,
  backgroundRef: null,
});

function getVisibleElementHeight(element: Element, viewportHeight: number) {
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  const visibleTop = rect.top >= 0 && rect.top < viewportHeight;
  const visibleBottom = rect.bottom > 0 && rect.bottom < viewportHeight;
  let visiblePx = 0;
  if (visibleTop && visibleBottom) {
    visiblePx = height;
  } else if (visibleTop) {
    visiblePx = viewportHeight - rect.top;
  } else if (visibleBottom) {
    visiblePx = rect.bottom;
  } else if (height > viewportHeight && rect.top < 0) {
    const absTop = Math.abs(rect.top);
    if (absTop < height) {
      visiblePx = height - absTop;
    }
  }

  return visiblePx / height;
}

export function FirstVisibleProvider({
  groupName,
  threshold = 0.5,
  children,
  ...rest
}: {
  children: React.ReactNode;
  groupName: string;
  threshold?: number;
}) {
  const [firstKey, setFirstKey] = React.useState<string | null>(null);
  const backgroundRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const sectionElements = document.querySelectorAll(
        `[data-first-visible-group="${groupName}"][data-first-visible-key]`,
      );
      let topmost: Element = null;
      let greatestPercent = 0;
      sectionElements.forEach((sectionEl) => {
        const visiblePercentage = getVisibleElementHeight(sectionEl, window.innerHeight);

        if (visiblePercentage > greatestPercent) {
          greatestPercent = visiblePercentage;
          topmost = sectionEl;
        }
      });

      const winningKey = topmost && topmost.getAttribute('data-first-visible-key');
      setFirstKey(winningKey);
    }
    onScroll();
    const debounced = debounce(onScroll, 100);
    document.addEventListener('scroll', debounced);
    return () => {
      document.removeEventListener('scroll', debounced);
    };
  }, [threshold, groupName]);

  return (
    <FirstVisibleContext.Provider value={{ firstKey, backgroundRef }} {...rest}>
      <div
        data-first-visible-background
        ref={backgroundRef}
        style={{ position: 'fixed', zIndex: -1, top: 0, left: 0, bottom: 0, right: 0 }}
      />
      {children}
    </FirstVisibleContext.Provider>
  );
}

export function useFirstVisibleSection(groupName: string, key: string) {
  const ctx = React.useContext(FirstVisibleContext);
  const isFirst = ctx.firstKey === key;

  function renderBackground(content: React.ReactNode) {
    const backgroundElement = ctx.backgroundRef.current;
    if (!backgroundElement) return null;
    return ReactDOM.createPortal(
      <Fade in={isFirst} timeout={400}>
        <div>{content}</div>
      </Fade>,
      backgroundElement,
    );
  }

  return [
    {
      'data-first-visible-group': groupName,
      'data-first-visible-key': key,
    },
    {
      isFirst,
      renderBackground,
    },
  ] as const;
}
