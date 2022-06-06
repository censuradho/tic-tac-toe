export function createWrapperAndAppendToBody(wrapperId: string | number) {
  const id = String(wrapperId)

  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", id);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

export const resolvePath = (path: string, obj: Record<string, any>) => {
  let tempPath = path;

  Object.keys(obj).map(key => (tempPath = tempPath.replace(`:${key}`, obj[key])));

  return tempPath;
};