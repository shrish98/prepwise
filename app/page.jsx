import { Button } from "@/components/ui/button";
import HeroSection from "@/components/ui/hero";
import { features } from "./data/features";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";



export default function Home() {
    return (
        <div>
            <div className="grid-background"></div>
            <div className="relative">
                <HeroSection />
                <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                    <div className="container mx-auto px-4 md:px-6 lg:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Powerful features for your career growth</h2>
                        <div className="grid grid-cols-1 md:grif-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"> {features.map((feature, index) => {
                            return (
                                <Card key={index}
                                    className="border-2 hover:border-primary transition-colors duration-300">

                                    <CardContent className="p-4 pt-6 text-center flex flex-col items-center">
                                        <div className="flex flex-col items-center justify-center">{feature.icon}</div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </CardContent>

                                </Card>
                            )

                        })}</div>
                    </div>

                </section>

            </div >
        </div >
    )
}
