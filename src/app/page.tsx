import Features from "@/components/compo/feature";
import Footer from "@/components/compo/footer";
import Header from "@/components/compo/header";
import Hero from "@/components/compo/hero";
import Image from "next/image";
import OpenAI from "openai";
import { useEffect } from "react";

export default function Home() {
    return(<>
    
    <Header/>
    <Hero/>
    <Features/>
    <Footer/>


    </>)

}
