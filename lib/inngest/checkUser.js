import { currentUser } from "@clerk/nextjs/server";
import { db } from "../prisma";

export const checkUser = async () => {
    const user = await currentUser();

    console.log("CheckUser: Fetched Clerk user:", user ? "Found" : "Not Found");
    if (!user) {
        return null;
    }

    try {
        console.log("CheckUser: Checking if user exists in DB...", user.id);
        const loggedInUser = await db.user.findUnique({
            where: {
                ClerkUserId: user.id
            }
        });

        if (loggedInUser) {
            console.log("CheckUser: User already exists in DB", loggedInUser.id);
            return loggedInUser;
        }

        console.log("CheckUser: User not in DB. Creating new user...");
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        const email = user.emailAddresses[0]?.emailAddress;

        // Check if user exists by email (happens if a user deletes and recreates their Clerk account)
        if (email) {
            const existingUserByEmail = await db.user.findUnique({
                where: { email }
            });

            if (existingUserByEmail) {
                console.log("CheckUser: Email exists but ClerkUserId mismatched. Updating User in DB... ", existingUserByEmail.id);
                const updatedUser = await db.user.update({
                    where: { email },
                    data: {
                        ClerkUserId: user.id,
                        name,
                        imageUrl: user.imageUrl,
                    }
                });
                return updatedUser;
            }
        }

        const newUser = await db.user.create({
            data: {
                ClerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email,
            }
        });

        console.log("CheckUser: Successfully created user!", newUser.id);
        return newUser;
    } catch (error) {
        console.error("CheckUser Database Error:", error);
        return null;
    }
};


