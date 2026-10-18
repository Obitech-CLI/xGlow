"use client";

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const script = document.createElement("script");

    script.async = true;
    script.src = "https://embed.tawk.to/6ad3f70dceb41f34ca74923d/1k55vq3ks";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);
  return null;
}
