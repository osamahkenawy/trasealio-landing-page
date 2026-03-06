import ActionBox from "@/components/ActionBox";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Skill from "@/components/Skill";
import Whytraseallo from "@/components/Whytraseallo";
import Footer from "@/layouts/Footer";
import type { ReactNode } from "react";

const layout = ({ children }: Readonly<{ children: ReactNode; }>) => {
    return (
        <>
            {children}
            <Whytraseallo />
            <Features />
            <Portfolio />
            <Skill />
            <Pricing />
            <ActionBox />
            {/* <Blog /> */}
            <Contact />
            <Footer />
        </>
    )
}

export default layout