import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section className="w-full pt-36 md:pt-48 pb-0">
            <div className="space-y-6 text-center">
                <div className="space-y-6 mx-auto">
                    <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title" >
                        Your AI Career Coach for
                        <br />
                        Professional Success
                    </h1>
                    <p>
                        Advance your career with AI-powered resume building and interview prep
                    </p>
                </div>
                <div>
                    <Link href="/dashboard">
                        <Button size="lg" className="px-8">
                            Get Started
                        </Button>
                    </Link>

                </div>
                <div className="hero-image-wrapper mt-0">
                    <div className="relative w-full max-w-5xl mx-auto">
                        <Image src="/banner-trimmed.png" alt="banner preview" width={1280} height={720} className="rounded-lg shadow-2xl border mx-auto w-full h-auto" priority />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection