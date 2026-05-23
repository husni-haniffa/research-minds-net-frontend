"use client"
import Hero from "@/components/app/Hero";
import News from "@/components/app/News";
import Event from "@/components/app/Event";
import Publication from "@/components/app/Publication";
import Membership from "@/components/app/Membership";

export default function Home() { 
  return (
    <div>
      <Hero/>
      <div className="container">
        <Publication/>
        <News/>
        <Event/>
        <Membership/>
      </div>
    </div>
  );
}

