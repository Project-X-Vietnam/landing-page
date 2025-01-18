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
        <Form />
      </main>
    </div>
  );
}