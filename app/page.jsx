import { Button } from "@/components/ui/button";
import HeroSection from "@/components/ui/hero";

export default function Home() {
    return (
        <div>
            <div className="grid-background"></div>
            <div className="relative z-50">
                <HeroSection />
            </div>
        </div>
    )
}
