export function debounce<T extends any[]>(cb: (...args: T) => void, wait = 20) {
  let h = 0;
  let callable = (...args: T) => {
    clearTimeout(h);
    h = setTimeout(() => cb(...args), wait) as any;
  };
  return callable;
}
