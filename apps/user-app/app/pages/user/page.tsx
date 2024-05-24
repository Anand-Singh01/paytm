"use client";
import { useBalance } from "@repo/store/useBalance";
const page = () => {
  const balance = useBalance();
  return <div>Balance: {balance}</div>;
};
export default page;