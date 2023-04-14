export const isItServer = (): boolean => {
  return !(typeof window != 'undefined' && window.document);
};
