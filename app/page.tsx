"use client";
import Navbar from "./(components)/navbar";
import Content from "./(components)/content";
import { useAppSelector } from "./(store)/store";

export default function Home() {
 
  return (
    <>
      <Navbar />
      <Content />
    </>
  );
}
