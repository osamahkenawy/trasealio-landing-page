import ActionBox from "@/components/ActionBox";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Feedback from "@/components/Feedback";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Skill from "@/components/Skill";
import Team from "@/components/Team";
import Footer from "@/layouts/Footer";
import type { ReactNode } from "react";

const layout = ({ children }: Readonly<{ children: ReactNode; }>) => {
    return (
        <>
            {children}
            <Features />
            <Portfolio />
            <Skill />
            <Pricing />
            <Team />
            <ActionBox />
            <Feedback />
            <Blog />
            <Contact />
            <Footer />
        </>
    )
}

export default layout