"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function onBoardUser(data) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const user = await db.user.findUnique({
        where: {
            ClerkUserId: userId,
        }
    });

    if (!user) throw new Error("User not found");

    try {
        const result = await db.$transaction(
            async (tx) => {
                // find if the industry exists in the database
                let industryInsights = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    }
                });

                // if industry does not exist create a new one with default values - will replace it with ai user later    
                if (!industryInsights) {
                    industryInsights = await tx.industryInsight.create({
                        data: {
                            industry: data.industry,
                            salaryRange: [],
                            growthRate: 0,
                            demandLevel: "Medium",
                            topSkills: [],
                            marketOutlook: "Neutral",
                            keyTrends: [],
                            recommendedSkills: [],
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                        }
                    });
                }

                // update the user 
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    }
                });
                return { updatedUser, industryInsights };
            },
            {
                timeout: 10000,
            }
        );

        return result;

    } catch (error) {
        console.error("Error updating user and industry:", error);
        throw new Error("Failed to update user and industry");
    }
}

export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const user = await db.user.findUnique({
            where: {
                ClerkUserId: userId,
            },
            select: {
                industry: true,
            }
        });

        if (!user) {
            return {
                isOnboarded: false,
                industry: null,
            };
        }

        return {
            isOnboarded: !!user?.industry,
            industry: user?.industry,
        };
    } catch (error) {
        console.error("Error getting user onboarding status:", error.message);
        throw new Error("Failed to get user onboarding status");
    }
}