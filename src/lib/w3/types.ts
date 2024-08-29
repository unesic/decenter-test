import type { Contract, ContractAbi } from "web3";

export type W3ContractAbi = Contract<ContractAbi>;

export interface CDPInfoResponse {
  0: string;
  1: string;
  2: string;
  3: string;
  4: bigint;
  5: bigint;
  collateral: bigint;
  debt: bigint;
  ilk: string;
  owner: string;
  urn: string;
  userAddr: string;
}

export interface CDPInfoReturn extends Omit<CDPInfoResponse, "collateral" | "debt" | "ilk"> {
  collateral: number;
  debt: number;
  ilk: CollType;
}

export interface CDPResult extends Pick<CDPInfoReturn, "collateral" | "debt" | "userAddr" | "ilk"> {
  id: number;
  debtWithRate: number;
  ilkRate: number;
}

export interface CDPDetails {
  maxDebt: number;
  availableDebt: number;
  maxCollateral: number;
  liquidationRatio: number;
  availableCollateral: number;
  collateralizationRatio: number;
  availableCollateralIlk: number;
}

export interface CDPDisplayData extends Record<keyof CDPResult | keyof CDPDetails, string> {}

export interface ILKInfoResponse {
  0: bigint;
  1: bigint;
  2: bigint;
  3: bigint;
  4: bigint;
  Art: bigint;
  dust: bigint;
  line: bigint;
  rate: bigint;
  spot: bigint;
}

export interface ILKInfoReturn
  extends Omit<ILKInfoResponse, "Art" | "dust" | "line" | "rate" | "spot"> {
  Art: number;
  dust: number;
  line: number;
  rate: number;
  spot: number;
}

export enum CollType {
  ETH_A = "ETH-A",
  WBTC_A = "WBTC-A",
  USDC_A = "USDC-A",
}

export interface Signature {
  message: string;
  account: string;
  signature: string;
  signedBy: string;
}
