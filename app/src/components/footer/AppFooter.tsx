import React from "react";

const AppFooter = () => {
  return (
    <footer className="w-full  py-4 px-4 bg-purple-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center gap-2">
        <p className="text-sm sm:text-base font-medium tracking-wide">
          © {new Date().getFullYear()} Created by{" "}
          <span className="text-indigo-400 font-semibold">ANIKET</span>
        </p>
        {/* Optional social icons or links can be added here */}
      </div>
    </footer>
  );
};

export default AppFooter;
