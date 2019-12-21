export default () => {
  if (typeof window === 'undefined') {
    return { width: 1920, height: 1920 };
  }
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  };
};
