"use client";

import { useCallback } from "react";
import Image from "next/image";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ASSISTANT_LOGO_URL } from "@/lib/config";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto flex h-screen w-full max-w-5xl flex-col gap-4 px-4 py-4">
        <header className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Image
              src={ASSISTANT_LOGO_URL}
              alt="Assistant logo"
              width={36}
              height={36}
              unoptimized
            />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Nutrition Assistant
            </span>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-300">achu</span>
        </header>
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
      </div>
    </main>
  );
}
