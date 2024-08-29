import httpService from "@/lib/http";
import { ContractABIParsed, ContractABIRaw, ContractResult } from "./types";

interface GetContractABIResponse extends ContractABIRaw {}

export async function getContractABI(
  contractId: string
): Promise<ContractABIParsed | GetContractABIResponse> {
  const { data } = await httpService.get<GetContractABIResponse>("/api", {
    params: { module: "contract", action: "getabi", address: contractId },
  });

  if (data.message === "NOTOK") {
    console.error(data.result);
    return data;
  }

  return {
    ...data,
    result: JSON.parse(data.result) as ContractResult[],
  };
}
