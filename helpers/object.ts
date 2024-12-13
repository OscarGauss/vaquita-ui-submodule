export function isStringJson(str: any): boolean {
  try {
    if (typeof str === 'string') {
      JSON.parse(str);
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

export function isObjectJson(obj: any): boolean {
  try {
    return typeof JSON.stringify(obj) === 'string';
  } catch (e) {
    return false;
  }
}
