import { SelectOption } from "@/components/select-dropdown/SelectDropdown";
import { CollType } from "@/lib/w3/types";

import IconETH from "@/assets/icons/ETH.svg";
import IconWBTC from "@/assets/icons/WBTC.svg";
import IconUSDC from "@/assets/icons/USDC.svg";

export const LIQUIDATION_RATIO: Record<CollType, number> = {
  [CollType.ETH_A]: 1.45,
  [CollType.WBTC_A]: 1.45,
  [CollType.USDC_A]: 1.01,
};

export const CURRENT_PRICE: Record<CollType, number> = {
  [CollType.ETH_A]: 2_534.03,
  [CollType.WBTC_A]: 59_168.77,
  [CollType.USDC_A]: 1,
};

export const COLLATERAL_TYPE_ICON_MAP: Record<CollType, string> = {
  [CollType.ETH_A]: IconETH,
  [CollType.WBTC_A]: IconWBTC,
  [CollType.USDC_A]: IconUSDC,
};

export const SELECT_OPTIONS: SelectOption[] = [
  {
    icon: COLLATERAL_TYPE_ICON_MAP[CollType.ETH_A],
    label: CollType.ETH_A,
    value: CollType.ETH_A,
  },
  {
    icon: COLLATERAL_TYPE_ICON_MAP[CollType.WBTC_A],
    label: CollType.WBTC_A,
    value: CollType.WBTC_A,
  },
  {
    icon: COLLATERAL_TYPE_ICON_MAP[CollType.USDC_A],
    label: CollType.USDC_A,
    value: CollType.USDC_A,
  },
];
