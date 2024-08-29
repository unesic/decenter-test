import { MS_IN_SEC } from "@/lib/constants";
import { CDPDetails, CDPResult } from "@/lib/w3/types";
import { assetAmountInEth } from "@defisaver/tokens";

export function bigIntToFloat(number: bigint) {
  return parseFloat(assetAmountInEth(number.toString()));
}

export function formatNumber(
  num: number | undefined = undefined,
  config: {
    style?: Intl.NumberFormatOptions["style"];
    notation?: Intl.NumberFormatOptions["notation"];
    currency?: Intl.NumberFormatOptions["currency"];
    currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"];
    fractionDigits?: Intl.NumberFormatOptions["maximumFractionDigits"];
    suffix?: string;
  } = {}
) {
  if (typeof num !== "number") return "";

  const { style, notation, currency, currencyDisplay, fractionDigits, suffix } = config;

  const number = new Intl.NumberFormat("en", {
    style: style ?? "decimal",
    notation: notation ?? "standard",
    currency: currency ?? "USD",
    currencyDisplay: currencyDisplay ?? "symbol",
    minimumFractionDigits: fractionDigits ?? 2,
    maximumFractionDigits: fractionDigits ?? 2,
  }).format(num);

  if (!suffix) return number;
  return `${number} ${suffix}`;
}

export function msToSec(ms: number) {
  return (ms / MS_IN_SEC).toFixed(2);
}

export function shortenHash(hash?: string, substringLen = 3) {
  if (!hash) return "";
  const rawHex = hash.split("x")[1];
  const left = rawHex?.substring(0, substringLen);
  const right = rawHex?.substring(rawHex?.length - substringLen);
  return `0x${left}...${right}`;
}

export function formatIlk(ilk: string) {
  return ilk.split("-")[0];
}

export function formatCDPInfo(
  { id, ilk, debt, ilkRate, userAddr, collateral, debtWithRate }: CDPResult,
  {
    maxDebt,
    availableDebt,
    maxCollateral,
    liquidationRatio,
    availableCollateral,
    collateralizationRatio,
    availableCollateralIlk,
  }: CDPDetails
) {
  return {
    // CDPResult
    id: String(id),
    ilk,
    debt: formatNumber(debt, { notation: "compact", suffix: "DAI" }),
    ilkRate: ilkRate.toString(),
    userAddr: shortenHash(userAddr, 4),
    collateral: formatNumber(collateral, { fractionDigits: 6, suffix: formatIlk(ilk) }),
    debtWithRate: formatNumber(debtWithRate ?? debt, { notation: "compact", suffix: "DAI" }),
    // CDPDetails
    maxDebt: formatNumber(maxDebt, { notation: "compact", suffix: "DAI" }),
    availableDebt: formatNumber(availableDebt, { notation: "compact", suffix: "DAI" }),
    maxCollateral: formatNumber(maxCollateral, { style: "currency", notation: "compact" }),
    liquidationRatio: formatNumber(liquidationRatio, { style: "percent", fractionDigits: 0 }),
    availableCollateral: formatNumber(availableCollateral, { style: "currency" }),
    collateralizationRatio: formatNumber(collateralizationRatio, { style: "percent" }),
    availableCollateralIlk: formatNumber(availableCollateralIlk, {
      notation: "compact",
      suffix: formatIlk(ilk),
    }),
  };
}
