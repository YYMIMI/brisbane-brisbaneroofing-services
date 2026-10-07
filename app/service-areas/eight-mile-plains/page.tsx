import type { Metadata } from "next";
import { roofSuburbGuides } from "../../suburb-guides";
import { RoofSuburbPage } from "../../suburb-page";
const guide = roofSuburbGuides[1];
export const metadata: Metadata = { title: guide.title, description: guide.description, alternates: { canonical: `/service-areas/${guide.slug}` }, openGraph: { title: guide.title, description: guide.description, url: `/service-areas/${guide.slug}` } };
export default function EightMilePlainsPage() { return <RoofSuburbPage guide={guide} />; }
