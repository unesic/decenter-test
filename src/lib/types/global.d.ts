export {};

declare global {
  interface Window {
    abort: Record<number, boolean>;
    ethereum?: import("ethers").Eip1193Provider;
  }

  namespace JSX {
    interface IntrinsicAttributes {
      className?: string;
    }
  }
}
