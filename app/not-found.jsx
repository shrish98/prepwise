import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[100vh] px-4
        text-center">
            <h1 className="text-4xl font-bold gradient-title mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
            <p className="text-gray-600 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link href="/" >
                <Button>Back to home</Button>
            </Link>
        </div>
    )
}

export default NotFoundPage