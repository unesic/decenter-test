import { shortenHash } from "@/lib/functions";
import { Signature } from "@/lib/w3/types";

import CheckCircle from "@/assets/icons/check-circle.svg";

import { InfoCard, Header, Title, Body, Subtitle } from "@/components/info-card";
import InfoBox from "@/components/info-box";
import Tooltip from "@/components/tooltip";

interface SignatureInfoCardProps extends Signature {}

export const SignatureInfoCard: React.FC<SignatureInfoCardProps> = ({
  account,
  message,
  signature,
  signedBy,
}) => (
  <InfoCard>
    <Header>
      <Title>
        <CheckCircle className="w-8 h-8 text-crypto-accent" /> CDP Signed
      </Title>
      <Subtitle>
        <Tooltip tooltip={signature}>
          <span className="font-medium opacity-60">Signature hash:</span>{" "}
          <strong className="font-mono">{shortenHash(signature, 4)}</strong>
        </Tooltip>
      </Subtitle>
    </Header>

    <Body>
      <InfoBox label="Message" value={message} />
      <InfoBox label="Account" value={shortenHash(account, 4)} tooltip={account} />
      <InfoBox label="Signed By" value={shortenHash(signedBy, 4)} tooltip={signedBy} />
    </Body>
  </InfoCard>
);
