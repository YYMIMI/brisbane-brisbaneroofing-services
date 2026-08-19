import Link from "next/link";
import { PageShell } from "./components";

export default function NotFound() {
  return (
    <PageShell>
      <section className="not-found">
        <div className="shell">
          <p className="eyebrow">PAGE NOT FOUND</p>
          <h1>This roof repair page is not here.</h1>
          <p>
            Return to the service overview and choose the roof problem that
            best matches what you can see.
          </p>
          <Link className="button button-yellow" href="/services">
            View repair services
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
