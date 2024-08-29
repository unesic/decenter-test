import { useEffect, useState } from "react";

import { CDPDetails, CDPDisplayData, CDPResult, Signature } from "@/lib/w3/types";
import { formatCDPInfo, formatIlk, formatNumber, getCdpDetails } from "@/lib/functions";
import { CURRENT_PRICE } from "@/lib/constants";

import ArrowRight from "@/assets/icons/arrow-right.svg";
import Check from "@/assets/icons/check.svg";

import InfoCard, { Body, Header, Details, Info, Subtitle, Title } from "@/components/info-card";
import InfoBox from "@/components/info-box";
import Tooltip from "@/components/tooltip";
import IlkIcon from "@/components/ilk-icon";

import { Loading } from "./Loading";

interface CDPInfoCardProps {
  cdp?: CDPResult;
  signature?: Signature;
  sign: () => void;
  loading: boolean;
}

export const CDPInfoCard: React.FC<CDPInfoCardProps> = ({ cdp, signature, sign, loading }) => {
  const [cdpDetails, setCdpDetails] = useState<CDPDetails>();
  const [display, setDisplay] = useState<CDPDisplayData>();

  useEffect(() => {
    if (!cdp) return;
    const newCdpDetails = getCdpDetails(cdp);
    setCdpDetails(newCdpDetails);
    setDisplay(formatCDPInfo(cdp, newCdpDetails));
  }, [cdp]);

  if (loading || !cdp) return <Loading />;

  const { debtWithRate, id, ilk, userAddr } = cdp;
  const { maxCollateral, availableCollateralIlk, availableDebt } = cdpDetails ?? {};

  return (
    <InfoCard>
      <Header>
        <Title>
          <IlkIcon ilk={ilk} size="xl" /> {ilk} Vault {id}
        </Title>

        <Details>
          <Subtitle>
            <Tooltip tooltip={userAddr}>
              <span className="font-medium opacity-60">Owner:</span>{" "}
              <strong className="font-mono">{display?.userAddr}</strong>
            </Tooltip>
          </Subtitle>

          <Info>
            <Tooltip tooltip={`Current ${ilk} price`}>
              <span className="opacity-60">Current price:</span>{" "}
              <strong>{formatNumber(CURRENT_PRICE[ilk], { style: "currency" })}</strong>
            </Tooltip>
          </Info>
        </Details>
      </Header>

      <Body>
        <InfoBox
          label="Collateral"
          value={display?.maxCollateral}
          tooltip={formatNumber(maxCollateral, { style: "currency" })}
          info={display?.collateral}
        />
        <InfoBox
          label="Debt"
          value={display?.debtWithRate}
          tooltip={formatNumber(debtWithRate, { suffix: "DAI" })}
        />
        <InfoBox
          label="Collateralization ratio"
          value={display?.collateralizationRatio}
          info={`Liquidation ratio: ${display?.liquidationRatio}`}
        />
        <InfoBox
          label="Available to withdraw"
          value={display?.availableCollateralIlk}
          tooltip={formatNumber(availableCollateralIlk, {
            fractionDigits: 6,
            suffix: formatIlk(ilk),
          })}
          info={display?.availableCollateral}
        />
        <InfoBox
          label="Available to generate"
          value={display?.availableDebt}
          tooltip={formatNumber(availableDebt, { fractionDigits: 6, suffix: "DAI" })}
        />
        {window.ethereum &&
          (signature ? (
            <InfoBox<React.ReactNode>
              label="Signature"
              value={
                <span className="flex items-center gap-2">
                  Success! <Check className="w-8 h-8 text-crypto-accent" />
                </span>
              }
            />
          ) : (
            <InfoBox<React.ReactNode>
              label="Signature"
              onClick={sign}
              value={
                <span className="flex items-center gap-2">
                  Sign CDP <ArrowRight className="w-8 h-8 text-crypto-accent" />
                </span>
              }
            />
          ))}
      </Body>
    </InfoCard>
  );
};
