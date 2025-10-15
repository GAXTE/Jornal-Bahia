import { useEffect, useRef } from "react";

interface AdSenseProps {
  adClient?: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const AdSense = ({
  adClient = "ca-pub-1725545045518278",
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className = "",
}: AdSenseProps) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    // Carrega o script do AdSense dinamicamente se ainda não estiver carregado
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Aguarda o script carregar e então inicializa o anúncio
    const pushAd = () => {
      if (!isAdPushed.current && window.adsbygoogle && adRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isAdPushed.current = true;
        } catch (error) {
          console.error("Erro ao carregar AdSense:", error);
        }
      }
    };

    // Aguarda um pouco para garantir que o conteúdo carregou primeiro
    const timer = setTimeout(pushAd, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [adClient]);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", ...style }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
};

// Declaração TypeScript para o objeto window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
