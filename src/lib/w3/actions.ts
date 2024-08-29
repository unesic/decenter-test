import { bytesToString, stringToBytes } from "@defisaver/tokens/esm/utils";

import w3 from "@/lib/w3";
import { bigIntToFloat } from "@/lib/functions";
import { getContractABI } from "@/lib/http";

import type {
  CollType,
  CDPInfoResponse,
  CDPInfoReturn,
  ILKInfoResponse,
  ILKInfoReturn,
  W3ContractAbi,
  CDPResult,
} from "./types";

export async function initContract(CONTRACT_ID: string) {
  const contractABI = await getContractABI(CONTRACT_ID);
  if (!contractABI || typeof contractABI?.result === "string") return;

  return new w3.eth.Contract(contractABI.result, CONTRACT_ID);
}

export async function getCdps(
  ids: number[],
  ilk: CollType,
  contract: W3ContractAbi,
  rate: number
): Promise<Array<CDPResult | null>> {
  return Promise.all(ids.map((id) => getSingleCdp(id, contract, rate, ilk)));
}

export async function getSingleCdp(
  id: number,
  contract: W3ContractAbi,
  rate?: number,
  collType?: CollType
): Promise<CDPResult | null> {
  const { collateral, ilk, debt, userAddr } = await getCdpInfo(contract, id);
  if (collType && ilk !== collType) return null;

  const cdp = { id, collateral, ilk, debt, userAddr };
  return applyDebtRate({ ...cdp, debtWithRate: debt, ilkRate: 1 }, rate);
}

export function applyDebtRate({ debt, ilkRate, ...rest }: CDPResult, rate?: number): CDPResult {
  return {
    ...rest,
    debt,
    debtWithRate: debt * (rate ? rate * 10 ** -9 : 1),
    ilkRate: rate ?? ilkRate,
  };
}

async function getCdpInfo(contract: W3ContractAbi, cdpId: number): Promise<CDPInfoReturn> {
  const { collateral, debt, ilk, ...rest }: CDPInfoResponse = await contract.methods
    .getCdpInfo(cdpId)
    .call();

  return {
    ...rest,
    collateral: bigIntToFloat(collateral),
    debt: bigIntToFloat(debt),
    ilk: bytesToString(ilk) as CollType,
  };
}

export async function getIlkInfo(contract: W3ContractAbi, ilk: string): Promise<ILKInfoReturn> {
  const { Art, dust, line, rate, spot, ...rest }: ILKInfoResponse = await contract.methods
    .ilks(stringToBytes(ilk))
    .call();

  return {
    ...rest,
    Art: bigIntToFloat(Art),
    dust: bigIntToFloat(dust),
    line: bigIntToFloat(line),
    rate: bigIntToFloat(rate),
    spot: bigIntToFloat(spot),
  };
}
