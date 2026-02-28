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
        console.log("CheckUser: Extracted name:", name);
        console.log("CheckUser: Extracted email:", user.emailAddresses[0]?.emailAddress);
        console.log("CheckUser: Extracted imageUrl:", user.imageUrl);

        const newUser = await db.user.create({
            data: {
                ClerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress,
            }
        });

        console.log("CheckUser: Successfully created user!", newUser.id);
        return newUser;
    } catch (error) {
        console.error("CheckUser Database Error:", error);
        return null;
    }
};


