"use client";
import { useState, useEffect } from "react";
import { getClients, addClient, type Customer } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, User, Phone } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      if (data.success) {
        setCustomers(data.data);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAddCustomer = async () => {
    if (!name || !phone) {
      setError("Please fill in both name and phone number");
      return;
    }

    setAddLoading(true);
    setError("");

    try {
      await addClient({ name, phone: "+91" + phone });
      await loadCustomers();
      setName("");
      setPhone("");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to add customer");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <div className="w-full max-w-md mx-auto min-h-screen relative overflow-hidden">
        <header className="relative z-10 h-16 bg-white shadow-md flex items-center px-4">
          <button onClick={() => router.back()}>
            <ArrowLeft size={24} className="text-[#FF5404]" />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-[#FF5404]">Admin - Customers</h1>
        </header>

        <div className="px-6 py-8 relative z-10">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="mb-8 p-5 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Customer</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center border border-[#F2B8A0] rounded-xl h-12 px-3">
                <User size={20} className="text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 outline-none text-lg"
                />
              </div>
              
              <div className="flex items-center border border-[#F2B8A0] rounded-xl h-12 overflow-hidden">
                <div className="w-20 flex items-center justify-center border-r bg-gray-50">
                  <span>+91</span>
                </div>
                <Phone size={20} className="text-gray-500 mx-3" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1 outline-none text-lg"
                />
              </div>
            </div>

            <button
              onClick={handleAddCustomer}
              disabled={addLoading}
              className="w-full h-12 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {addLoading ? (
                "Adding..."
              ) : (
                <>
                  <Plus size={20} /> Add Customer
                </>
              )}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">All Customers ({customers.length})</h2>

            {loading ? (
              <div className="flex items-center justify-center py-10">
                <p className="text-gray-500">Loading customers...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="p-4 bg-white rounded-xl shadow-md flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                      <p className="text-sm text-gray-500">{customer.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
