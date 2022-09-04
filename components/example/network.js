import { useEffect, useState } from "react";
import Callout from "nextra-theme-docs/callout";

function getProvider() {
  const provider = window.ton;
  if (!provider || !provider.isOpenMask) {
    throw new Error("Please install OpenMask");
  }
  return provider;
}

export default () => {
  const [network, setNetwork] = useState("");

  useEffect(() => {
    const provider = window.ton;
    if (!provider?.isOpenMask) return;

    // Initial chainId value
    provider.send("ton_getChain").then((chainId) => setNetwork(chainId));

    // Subscribe to change network
    provider.on("chainChanged", setNetwork);
    return () => {
      // Unsubscribe
      provider.off("chainChanged", setNetwork);
    };
  }, []);

  return (
    <div className="pb-8 pt-4">
      {network ? (
        <Callout emoji={network === "Mainnet" ? "💎" : "⚙️"}>{network}</Callout>
      ) : (
        <Callout>OpenMask not detected</Callout>
      )}
    </div>
  );
};
