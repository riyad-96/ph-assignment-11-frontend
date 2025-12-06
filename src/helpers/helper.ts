export function getIsPointerFine() {
  return window.matchMedia('(pointer: fine)').matches;
}
