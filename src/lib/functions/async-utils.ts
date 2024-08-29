import { MS_IN_SEC } from "@/lib/constants";

export async function sleep(time = MS_IN_SEC) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const debounce = <T extends (...args: any) => void>(fn: T, wait: number = 500) => {
  let t: NodeJS.Timeout;
  return ((...args: any) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  }) as T;
};
