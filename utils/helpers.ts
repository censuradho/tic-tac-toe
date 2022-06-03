export function createWrapperAndAppendToBody(wrapperId: string | number) {
  const id = String(wrapperId)

  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", id);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}