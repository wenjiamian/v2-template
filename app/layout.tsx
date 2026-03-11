import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "城市更新全流程管理系统",
  description: "城市更新数字化管理平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
