import { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { Context } from "@/lib/context/Context";
import w3, { applyDebtRate, getIlkInfo, getSingleCdp } from "@/lib/w3";
import { CDPResult, Signature } from "@/lib/w3/types";

import { RouterContext } from "@/pages/PageLayout";
import CDPInfoCard from "@/components/cdp-info-card";
import SignatureInfoCard from "@/components/signature-info-card";

export const CDPInfo: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { roughCdpId, setRoughCdpId, setCollType } = useOutletContext<RouterContext>();
  const { cdpContract, ilkContract, ilkRate, setIlkRate } = useContext(Context);

  const [loading, setLoading] = useState(true);
  const [cdp, setCdp] = useState<CDPResult>();
  const [signature, setSignature] = useState<Signature>();

  useEffect(() => {
    const id = Number(params.id);
    if (Number.isNaN(id) || id < 1) return navigate("/", { replace: true });
    setRoughCdpId(id);
  }, [navigate, setRoughCdpId, params.id]);

  const initCdp = async (id: number) => {
    const cdp = await getSingleCdp(id, cdpContract!, ilkRate);
    if (!cdp) return;

    /**
     * Means we probably got here from the homepage and
     * there's no need to fetch the rate again.
     */
    if (typeof ilkRate === "number") return setCdp(cdp);

    const { rate } = await getIlkInfo(ilkContract!, cdp.ilk);
    setCollType(cdp.ilk);
    setCdp(applyDebtRate(cdp, rate));
    setIlkRate(rate);
  };

  useEffect(() => {
    if (!cdpContract || !ilkContract) return;
    if (+roughCdpId < 1 || typeof roughCdpId === "string") {
      navigate(`/cdp/${roughCdpId}`, { replace: true });
      return;
    }
    navigate(`/cdp/${roughCdpId}`, { replace: true });
    initCdp(+roughCdpId).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cdpContract, ilkContract, roughCdpId]);

  const signCdp = async () => {
    if (!window.ethereum) return;

    const method = "eth_requestAccounts";
    const [account] = await window.ethereum.request({ method });

    const providerSet = w3.setProvider(window.ethereum);
    if (!providerSet) return;

    const message = "This is my CDP";
    const signature = await w3.eth.personal.sign(message, account, "");
    const signedBy = await w3.eth.personal.ecRecover(message, signature);

    setSignature({ message, account, signature, signedBy });
  };

  return (
    <>
      <CDPInfoCard cdp={cdp} sign={signCdp} signature={signature} loading={loading} />
      <CDPInfoCard cdp={cdp} sign={signCdp} signature={signature} loading />
      {signature && <SignatureInfoCard {...signature} />}
    </>
  );
};
