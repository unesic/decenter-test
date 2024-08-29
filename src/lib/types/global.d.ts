export {};

declare global {
  interface Window {
    abort: Record<string, boolean>;
    ethereum?: import("ethers").Eip1193Provider;
  }

  namespace JSX {
    interface IntrinsicAttributes {
      className?: string;
    }
  }
}
