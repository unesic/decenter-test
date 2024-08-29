import { createContext, useEffect, useState } from "react";

import { CDP_CONTRACT_ID, ILK_CONTRACT_ID } from "@/lib/constants";
import { W3ContractAbi } from "@/lib/w3/types";
import { initContract } from "@/lib/w3";

interface ContextState {
  cdpContract?: W3ContractAbi;
  ilkContract?: W3ContractAbi;
  ilkRate?: number;
  setIlkRate: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Context = createContext<ContextState>({
  ilkRate: 1,
  setIlkRate: () => {},
});

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [cdpContract, setCdpContract] = useState<W3ContractAbi>();
  const [ilkContract, setIlkContract] = useState<W3ContractAbi>();
  const [ilkRate, setIlkRate] = useState<number>();

  useEffect(() => {
    Promise.all([initContract(CDP_CONTRACT_ID), initContract(ILK_CONTRACT_ID)]).then(
      ([cdpContract, ilkContract]) => {
        setCdpContract(cdpContract);
        setIlkContract(ilkContract);
      }
    );
  }, []);

  return (
    <Context.Provider value={{ cdpContract, ilkContract, ilkRate, setIlkRate }}>
      {children}
    </Context.Provider>
  );
};
