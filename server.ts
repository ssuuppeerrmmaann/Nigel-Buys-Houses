import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Path to leads data
  const dataDir = path.join(process.cwd(), "data");
  const leadsPath = path.join(dataDir, "leads.json");

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Helper to read leads
  const readLeads = () => {
    if (!fs.existsSync(leadsPath)) {
      // Seed initial dummy leads
      const initialLeads = [
        {
          id: 'lead-1',
          address: '4512 Suncrest Ave',
          city: 'Orlando',
          state: 'Florida',
          zipCode: '32801',
          firstName: 'Robert',
          lastName: 'Manning',
          phone: '(407) 555-8321',
          email: 'robert.m81@gmail.com',
          timestamp: '2026-06-10 14:32',
          estimatedValue: 285000,
          status: 'New',
          googleSynced: true,
          notes: ''
        },
        {
          id: 'lead-2',
          address: '1109 Whispering Pines Dr',
          city: 'Houston',
          state: 'Texas',
          zipCode: '77002',
          firstName: 'Linda',
          lastName: 'Preston',
          phone: '(713) 555-9114',
          email: 'lindapreston63@yahoo.com',
          timestamp: '2026-06-09 09:12',
          estimatedValue: 310000,
          status: 'Analyzing',
          googleSynced: true,
          notes: ''
        },
        {
          id: 'lead-3',
          address: '784 Cherry Hill Rd',
          city: 'Rockford',
          state: 'Michigan',
          zipCode: '49341',
          firstName: 'Brett',
          lastName: 'Cavanaugh',
          phone: '(480) 500-9801',
          email: 'brettc_vets@outlook.com',
          timestamp: '2026-06-08 17:05',
          estimatedValue: 195000,
          status: 'Offer Sent',
          googleSynced: true,
          notes: ''
        }
      ];
      fs.writeFileSync(leadsPath, JSON.stringify(initialLeads, null, 2));
      return initialLeads;
    }
    try {
      return JSON.parse(fs.readFileSync(leadsPath, "utf-8"));
    } catch (e) {
      return [];
    }
  };

  // Helper to write leads
  const writeLeads = (leads: any[]) => {
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
  };

  // API endpoints
  app.get("/api/leads", (req, res) => {
    res.json(readLeads());
  });

  app.post("/api/leads", (req, res) => {
    const leads = readLeads();
    const newLead = {
      id: "lead-" + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "New",
      googleSynced: false,
      notes: "",
      ...req.body
    };
    leads.unshift(newLead);
    writeLeads(leads);
    res.status(201).json(newLead);
  });

  app.put("/api/leads/:id", (req, res) => {
    const leads = readLeads();
    const index = leads.findIndex((l: any) => l.id === req.params.id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...req.body };
      writeLeads(leads);
      res.json(leads[index]);
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  });

  app.delete("/api/leads/:id", (req, res) => {
    const leads = readLeads();
    const filtered = leads.filter((l: any) => l.id !== req.params.id);
    writeLeads(filtered);
    res.json({ success: true });
  });

  // Vite middleware setup
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
