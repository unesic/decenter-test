interface ContractResultArg {
  indexed?: boolean;
  internalType: InternalTypeEnum;
  name: string;
  type: InternalTypeEnum;
}

enum InternalTypeEnum {
  Address = "address",
  Bytes = "bytes",
  Bytes32 = "bytes32",
  Bytes4 = "bytes4",
  Int256 = "int256",
  Uint256 = "uint256",
}

enum StateMutability {
  Nonpayable = "nonpayable",
  View = "view",
}

enum ILKType {
  Constructor = "constructor",
  Event = "event",
  Function = "function",
}

export interface ContractResult {
  inputs: ContractResultArg[];
  payable?: boolean;
  stateMutability?: StateMutability;
  type: ILKType;
  anonymous?: boolean;
  name: string | never;
  constant?: boolean;
  outputs?: ContractResultArg[];
}

interface ContractABIBase {
  status: string;
  message: string;
}

export interface ContractABIRaw extends ContractABIBase {
  result: string;
}

export interface ContractABIParsed extends ContractABIBase {
  result: ContractResult[];
}
