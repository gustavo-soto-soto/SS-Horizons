import InvoiceComponent from "@/app/components/Invoice";
import Invoice from "@/db/models/invoice";
import { connectDB } from "@/db/mongodb";

async function getInvoice(invoiceId) {
  try {
    await connectDB();
    const invoice = Invoice.findById(invoiceId)
    return invoice
  } catch (error) {
    console.error(error);
    return {};
  }
}

const page = async ({ params: { id } }) => {
  const invoiceData = await getInvoice(id)

  return (
    <div className="min-h-screen h-auto grid items-center justify-center bg-[#092635] p-5">
      <InvoiceComponent data={invoiceData} />;
    </div>
  );
};

export default page;
