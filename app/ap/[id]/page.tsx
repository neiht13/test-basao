import { HAMLETS_DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import HamletDetailClient from "./HamletDetailClient";

// This is required for static site generation with dynamic routes
export function generateStaticParams() {
    return HAMLETS_DATA.map((hamlet) => ({
        id: hamlet.id,
    }));
}

export default function HamletPage({ params }: { params: { id: string } }) {
    const hamlet = HAMLETS_DATA.find((h) => h.id === params.id);

    if (!hamlet) {
        notFound();
    }

    return <HamletDetailClient hamlet={hamlet} />;
}