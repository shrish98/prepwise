import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const testUser = await db.user.create({
            data: {
                ClerkUserId: "test_clerk_id_" + Date.now(),
                email: "test_" + Date.now() + "@example.com",
                name: "Test User",
                imageUrl: "http://example.com/image.jpg",
            },
        });

        // Clean up immediately
        await db.user.delete({ where: { id: testUser.id } });

        return NextResponse.json({ success: true, message: "Successfully created and deleted user.", user: testUser });
    } catch (error) {
        console.error("Test DB Error:", error);
        return NextResponse.json({ success: false, error: error.message, stack: error.stack }, { status: 500 });
    }
}
