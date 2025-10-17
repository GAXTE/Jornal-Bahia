import { useEffect, useRef } from "react";

interface AdSenseProps {
  adClient?: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

// Gerenciador global de script do AdSense para evitar duplicação
let isAdSenseScriptLoaded = false;
let isAdSenseScriptLoading = false;

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
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    // Função para carregar o script do AdSense
    const loadAdSenseScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Se já está carregado, resolve imediatamente
        if (isAdSenseScriptLoaded && window.adsbygoogle) {
          resolve();
          return;
        }

        // Se já está carregando, aguarda
        if (isAdSenseScriptLoading) {
          const checkInterval = setInterval(() => {
            if (isAdSenseScriptLoaded && window.adsbygoogle) {
              clearInterval(checkInterval);
              resolve();
            }
          }, 100);
          return;
        }

        // Verifica se o script já existe no DOM
        const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');

        if (existingScript) {
          isAdSenseScriptLoaded = true;
          resolve();
          return;
        }

        // Carrega o script
        isAdSenseScriptLoading = true;
        const script = document.createElement("script");
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
        script.async = true;
        script.crossOrigin = "anonymous";

        script.onload = () => {
          isAdSenseScriptLoaded = true;
          isAdSenseScriptLoading = false;
          resolve();
        };

        script.onerror = () => {
          isAdSenseScriptLoading = false;
          reject(new Error("Falha ao carregar script do AdSense"));
        };

        document.head.appendChild(script);
      });
    };

    // Função para aguardar o elemento ter largura
    const waitForElementWidth = (element: HTMLElement, maxAttempts = 20): Promise<void> => {
      return new Promise((resolve, reject) => {
        let attempts = 0;

        const checkWidth = () => {
          if (!isMounted.current) {
            reject(new Error("Componente desmontado"));
            return;
          }

          const width = element.offsetWidth;

          if (width > 0) {
            resolve();
            return;
          }

          attempts++;
          if (attempts >= maxAttempts) {
            reject(new Error("Timeout: elemento sem largura"));
            return;
          }

          setTimeout(checkWidth, 100);
        };

        checkWidth();
      });
    };

    // Função para inicializar o anúncio
    const initializeAd = async () => {
      try {
        // Aguarda o script carregar
        await loadAdSenseScript();

        // Aguarda um pouco para garantir que o conteúdo e CSS carregaram
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verifica se o componente ainda está montado
        if (!isMounted.current || isAdPushed.current) {
          return;
        }

        // Verifica se o elemento existe
        if (!adRef.current) {
          return;
        }

        // Aguarda o elemento ter largura (máximo 2 segundos)
        try {
          await waitForElementWidth(adRef.current);
        } catch (error) {
          console.warn("AdSense: elemento ainda sem largura, tentando mesmo assim");
        }

        // Verifica novamente se ainda está montado
        if (!isMounted.current || isAdPushed.current) {
          return;
        }

        // Verifica se o AdSense está disponível
        if (adRef.current && window.adsbygoogle) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isAdPushed.current = true;
          } catch (error) {
            console.error("Erro ao inicializar anúncio AdSense:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar AdSense:", error);
      }
    };

    initializeAd();

    // Cleanup ao desmontar
    return () => {
      isMounted.current = false;
    };
  }, [adClient, adSlot]); // Dependências para evitar re-inicialização desnecessária

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={{
        display: "block",
        minHeight: "100px",
        width: "100%",
        maxWidth: "100%",
        ...style,
      }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      data-adtest={import.meta.env.MODE === "development" ? "on" : "off"}
    />
  );
};

// Declaração TypeScript para o objeto window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
