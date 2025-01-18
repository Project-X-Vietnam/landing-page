import Header from "@/components/Header";
import Form from "@/components/Form";

export default function HomePage() {
  return (
    <div 
      className="bg-background" 
      style={{ backgroundColor: 'rgba(78, 217, 254, 0.05)' }}
    >
      <Header />
      <main className="py-10 max-w-3xl mx-auto">
        <div className="flex justify-center items-center w-full my-4 pb-4">
            <h2 className="text-4xl font-bold text-primary">APPLICATION FORM</h2>
        </div>
        <Form />
      </main>
    </div>
  );
}