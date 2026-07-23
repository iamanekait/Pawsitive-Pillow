import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI SDK
  const apiKey = process.env.GEMINI_API_KEY || "";
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.error("Failed to initialize Gemini AI:", err);
    }
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", brand: "Pawsitive Pillow", location: "Durgapur, West Bengal, India" });
  });

  // AI Chatbot Route powered by Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set or initialized
        return res.json({
          response:
            "Thank you for reaching out to Pawsitive Pillow! Our AI assistant is currently running in offline mode. For custom cutout pillows, photo guidelines, or order status, please email sales@pawsitivepillow.com or check our FAQ section below!",
        });
      }

      const systemInstruction = `
You are Pawsitive Assistant, the compassionate, warm, and expert customer guide for "Pawsitive Pillow" - a premium custom pet product e-commerce brand based in Durgapur, West Bengal, India.
Contact email: sales@pawsitivepillow.com

Brand Mission: To transform beloved pets into high-quality custom products that preserve precious memories forever. Every product celebrates the unconditional love between pets and their humans.

Key Product Line:
1. Custom Pet Cutout Pillow (Primary Product) - Exact replica of pet's body, posture, and fur colors made from ultra-soft plush velvet.
2. Custom Mugs, T-shirts, Hoodies, Blankets, Tote Bags, Keychains, Phone Cases, Canvas Prints, Ornaments, Memory Frames.
3. "Forever in Our Hearts ❤️" Memorial Collection - A compassionate, gentle collection for grieving pet parents who have lost a pet ("Rainbow Bridge"). Themes: "Love Never Leaves", "Because Some Best Friends Stay With Us Forever".

Customer Guidance Guidelines:
- Photo Advice: High resolution, well-lit, eye-level, no cropped ears/paws, good contrast between pet fur and background.
- Production & Shipping: Handcrafted in Durgapur with eco-friendly inks, takes 2-4 business days for crafting, 3-7 days for shipping with real-time tracking.
- Tone: Warm, empathetic, friendly, comforting (especially for memorial questions), professional, and deeply passionate about pets.
- Keep responses concise, helpful, and formatted nicely with bullet points where appropriate.
`;

      // Build conversation contents
      let promptText = message;
      if (history && Array.isArray(history) && history.length > 0) {
        const recentHistory = history.slice(-6).map((h: any) => `${h.role === 'user' ? 'Customer' : 'Assistant'}: ${h.text}`).join('\n');
        promptText = `Conversation History:\n${recentHistory}\n\nCustomer: ${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I am here to help you turn your beloved pet into a cozy custom memory. How can I assist you further?";
      return res.json({ response: replyText });

    } catch (error: any) {
      console.error("Chat API Error:", error);
      return res.status(500).json({
        error: "Failed to process message",
        details: error.message,
        fallback: "We encountered a temporary connection issue. Please feel free to ask about our custom pet pillows, photo tips, or email sales@pawsitivepillow.com!",
      });
    }
  });

  // Track Order Route
  app.post("/api/track-order", (req, res) => {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const cleanId = String(orderId).trim().toUpperCase();
    const mockOrders: Record<string, any> = {
      "PP-98241": {
        id: "PP-98241",
        customer: "Aniket D.",
        petName: "Milo (Golden Retriever)",
        product: "Custom Cutout Pillow (16 Inch - Most Popular)",
        status: "Handcrafting & Sewing",
        step: 3,
        totalSteps: 5,
        estimatedDelivery: "July 26, 2026",
        origin: "Durgapur Craft Facility, West Bengal",
        carrier: "Express Pet Courier",
        timeline: [
          { time: "July 22, 09:30 AM", status: "Order Received & Verified" },
          { time: "July 22, 02:15 PM", status: "AI Background Removal & Contour Art Approved" },
          { time: "July 23, 10:00 AM", status: "High-Def Eco-Velvet Sublimation Printing" },
          { time: "In Progress", status: "Hand-Cutting, Precision Sewing & Hypoallergenic Plush Filling" },
          { time: "Upcoming", status: "Dispatched from Durgapur Hub with Gift Packaging" },
        ]
      },
      "PP-77102": {
        id: "PP-77102",
        customer: "Priya M.",
        petName: "Bella (Persian Cat) ❤️ Memorial",
        product: "Forever in Our Hearts Memorial Pillow + Blanket Set",
        status: "Out for Delivery",
        step: 5,
        totalSteps: 5,
        estimatedDelivery: "July 23, 2026",
        origin: "Durgapur Craft Facility, West Bengal",
        carrier: "Priority Comfort Transit",
        timeline: [
          { time: "July 20, 11:00 AM", status: "Order Placed with Memorial Blessing Note" },
          { time: "July 20, 04:00 PM", status: "Custom Angel Wing Contour Rendered" },
          { time: "July 21, 09:00 AM", status: "Velvet Sublimation & Edge Stitches Complete" },
          { time: "July 22, 01:00 PM", status: "Quality Inspected & Dispatched" },
          { time: "July 23, 08:00 AM", status: "Out for Delivery to Customer's Doorstep" },
        ]
      }
    };

    if (mockOrders[cleanId]) {
      return res.json({ success: true, order: mockOrders[cleanId] });
    } else {
      // Default generated tracking result for any entered order ID
      return res.json({
        success: true,
        order: {
          id: cleanId,
          customer: "Valued Pet Parent",
          petName: "Custom Pet Cutout",
          product: "Handcrafted Custom Pet Cutout Pillow",
          status: "Order In Production",
          step: 2,
          totalSteps: 5,
          estimatedDelivery: "Estimated 3-5 Business Days",
          origin: "Durgapur Craft Facility, West Bengal",
          carrier: "Express Courier",
          timeline: [
            { time: "Recent", status: "Order Received & Payment Confirmed" },
            { time: "In Progress", status: "Photo Cutout Alignment & Background Removal" },
            { time: "Upcoming", status: "High-Resolution Fabric Sublimation Printing" },
            { time: "Upcoming", status: "Precision Sewing & Quality Assurance" },
            { time: "Upcoming", status: "Dispatch from Durgapur Craft Center" },
          ]
        }
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    return res.json({
      success: true,
      message: "Welcome to the Pawsitive Pillow family! Check your inbox for a 15% OFF coupon code on your first pet pillow.",
      discountCode: "PAWSITIVE15",
    });
  });

  // Vite Middleware for Development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pawsitive Pillow server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
