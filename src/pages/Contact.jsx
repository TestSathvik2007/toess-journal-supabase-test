import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "../services/supabase"; // ← adjust path if needed

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      type: "contact_form",
      recipient_email: "editor@toess.org",
      subject: form.subject,
      message: form.message,
      author_email: form.email,
      author_name: form.name,
      status: "pending",
    };

    // 🔍 DEBUG — remove this after it works
    console.log("📤 Supabase URL:", supabase.supabaseUrl);
    console.log("📦 Inserting payload:", payload);

    const { data, error } = await supabase
      .from("email_notifications")
      .insert(payload)
      .select("id")
      .single();

    if (error || !data) {
      console.error("❌ Insert failed:", error);
      setStatus("error");
      setErrorMsg(
        error?.message ||
        "Message could not be sent. Please try again or email us directly at editor@toess.org"
      );
      return;
    }

    console.log("✅ Message queued with id:", data.id);
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <Mail className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <a href="mailto:editor@toess.org" className="text-indigo-600 hover:underline">
              editor@toess.org
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <Phone className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <a href="tel:+919952445562" className="text-indigo-600 hover:underline">
              +91 99524 45562
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <MapPin className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Address</h3>
            <p className="text-sm text-gray-600">
              379, 7th cross, 5th main, NGEF Layout,
              <br />
              Mallathahalli, Bangalore, India - 560 056
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

          {status === "success" && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">
                Your message has been sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="What is this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}