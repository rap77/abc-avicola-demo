// F3 — CHECKOUT SIMULADO (AT-DEMO-001, DEC-005). Página server que lee el query
// param (?course=[id] o ?curso=[id], ambos soportados) y renderiza el flujo mock.
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CheckoutFlow from "@/components/CheckoutFlow";

export const metadata = { title: "Checkout simulado — ABC Avícola (PROTOTIPO)" };

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: { course?: string; curso?: string };
}) {
  const courseId = searchParams?.course ?? searchParams?.curso;
  return (
    <>
      <NavBar />
      <CheckoutFlow initialCourseId={courseId} />
      <Footer />
    </>
  );
}
