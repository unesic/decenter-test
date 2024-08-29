import { CURRENT_PRICE, LIQUIDATION_RATIO } from "@/lib/constants";
import { CDPDetails, CDPResult } from "@/lib/w3/types";

export function getCdpDetails(cdp: CDPResult): CDPDetails {
  const currentPrice = CURRENT_PRICE[cdp.ilk];

  const maxCollateral = cdp.collateral * currentPrice;
  const liquidationRatio = LIQUIDATION_RATIO[cdp.ilk];

  const collateralizationRatio = maxCollateral / cdp.debtWithRate || 0;
  const maxDebt = maxCollateral / liquidationRatio;
  const availableDebt = maxDebt - cdp.debtWithRate;
  const availableCollateral = maxCollateral - liquidationRatio * cdp.debtWithRate;
  const availableCollateralIlk = availableCollateral / currentPrice;

  return {
    collateralizationRatio,
    liquidationRatio,
    maxCollateral,
    maxDebt,
    availableDebt,
    availableCollateral,
    availableCollateralIlk,
  };
}
