import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
  const CHEKOUT_URL =
    "https://abhishek9503.lemonsqueezy.com/buy/169f3dc6-e51b-4ede-a8f3-5eee50b75e2f";

  return (
    <Link
      href={CHEKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}
