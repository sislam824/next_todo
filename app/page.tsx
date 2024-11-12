"use client";

import React from "react";
import Todos from "../components/Todos";
export default function Home() {
  return (
    <div>
      <h2 className="text-4xl text-center text-black bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg p-6">
        Welcome to todo App
      </h2>
      <Todos />;
    </div>
  );
}
