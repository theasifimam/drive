import Header from "@/components/Header";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-black">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
