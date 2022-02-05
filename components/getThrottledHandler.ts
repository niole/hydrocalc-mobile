export function getThrottledHandler<A extends any[]>(h: (...a: A) => void, timeout: number = 200): (...a: A) => void {
  let t: any = null;
  return (...a: A) => {
    clearTimeout(t);
    t = setTimeout(() => h(...a), timeout);
  };
}
