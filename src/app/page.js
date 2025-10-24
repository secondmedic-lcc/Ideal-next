"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SplashPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    } else {
      const timer = setTimeout(() => {
        router.replace("/home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div className="splash-page">
      <img src="/img/logo.png" alt="Splash logo" className="splash-logo" />
    </div>
  );
};

export default SplashPage;
