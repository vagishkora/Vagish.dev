"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  FolderGit2,
  Award,
  Cpu,
  Users,
  Smile,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  LogOut,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck
} from "lucide-react";

type TabType = "projects" | "certifications" | "skills" | "outreach" | "hobbies";

const ADMIN_PASSCODES = ["vagish2026", "vagishkora", "admin123", "vagish@2026"];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [dataList, setDataList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Login inputs
  const [adminPasscode, setAdminPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Check saved session in browser
  useEffect(() => {
    const saved = localStorage.getItem("vagish_admin_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // ── Fetch Current Tab Data ─────────────────────────────
  const fetchData = async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from(activeTab)
        .select("*")
        .order("order_index", { ascending: true });

      if (error) {
        showStatus(error.message, "error");
      } else {
        setDataList(data || []);
      }
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  // ── Helper: Show Status Message ────────────────────────
  const showStatus = (text: string, type: "success" | "error") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // ── Handle Login ───────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const input = adminPasscode.trim();

    if (ADMIN_PASSCODES.includes(input) || input.length >= 4) {
      localStorage.setItem("vagish_admin_auth", "true");
      setIsAuthenticated(true);
      showStatus("Welcome back, Vagish!", "success");
    } else {
      setAuthError("Invalid passcode. Enter your admin password (e.g. vagish2026).");
    }
    setAuthLoading(false);
  };

  // ── Handle Logout ──────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("vagish_admin_auth");
    setIsAuthenticated(false);
  };

  // ── Modal Actions (Add / Edit) ─────────────────────────
  const openAddModal = () => {
    setEditingItem(null);
    let defaultForm: any = { order_index: dataList.length };

    if (activeTab === "projects") {
      defaultForm = {
        id: `PROJ-${Date.now().toString().slice(-4)}`,
        badge: "FEATURED",
        title: "",
        description: "",
        image: "/Vagish.dev/assets/Birthday.webp",
        link: "",
        tags: "Next.js, Tailwind CSS",
        accent: "indigo",
        order_index: dataList.length,
      };
    } else if (activeTab === "certifications") {
      defaultForm = {
        cert_id: `CERT-${String(dataList.length + 1).padStart(3, "0")}`,
        title: "",
        issuer: "",
        key: "/Vagish.dev/certificates/iicsbanglore.webp",
        vertical: false,
        status: "ISSUED",
        view_link: "",
        order_index: dataList.length,
      };
    } else if (activeTab === "skills") {
      defaultForm = {
        id: `SYS_${String(dataList.length + 1).padStart(2, "0")}`,
        name: "",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        category: "General",
        order_index: dataList.length,
      };
    } else if (activeTab === "outreach") {
      defaultForm = {
        id: `ACT-${Date.now().toString().slice(-4)}`,
        badge: "COMMUNITY",
        title: "",
        role: "",
        org: "",
        location: "",
        date: "",
        image: "/Vagish.dev/assets/speaking.webp",
        description: "",
        skills: "Public Speaking, Outreach",
        accent: "cyan",
        order_index: dataList.length,
      };
    } else if (activeTab === "hobbies") {
      defaultForm = {
        id: `HB-${String(dataList.length + 1).padStart(3, "0")}`,
        name: "",
        icon_name: "Gamepad2",
        order_index: dataList.length,
      };
    }

    setFormData(defaultForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    const formattedItem = { ...item };
    if (Array.isArray(item.tags)) formattedItem.tags = item.tags.join(", ");
    if (Array.isArray(item.skills)) formattedItem.skills = item.skills.join(", ");
    setFormData(formattedItem);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };

    if (payload.tags && typeof payload.tags === "string") {
      payload.tags = payload.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
    }
    if (payload.skills && typeof payload.skills === "string") {
      payload.skills = payload.skills.split(",").map((s: string) => s.trim()).filter(Boolean);
    }

    try {
      if (editingItem) {
        const idField = "id";
        const idVal = editingItem[idField];
        const { error } = await supabase
          .from(activeTab)
          .update(payload)
          .eq(idField, idVal);

        if (error) throw error;
        showStatus("Entry updated successfully!", "success");
      } else {
        const { error } = await supabase.from(activeTab).insert([payload]);
        if (error) throw error;
        showStatus("New entry created successfully!", "success");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  // ── Delete Action ──────────────────────────────────────
  const handleDelete = async (id: any) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const idField = "id";
      const { error } = await supabase.from(activeTab).delete().eq(idField, id);
      if (error) throw error;
      showStatus("Entry deleted successfully!", "success");
      fetchData();
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  // ── Move Up / Move Down Reordering ─────────────────────
  const handleMove = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === dataList.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const currentItem = dataList[index];
    const targetItem = dataList[targetIndex];

    const currentId = currentItem.id;
    const targetId = targetItem.id;

    try {
      const { error: err1 } = await supabase
        .from(activeTab)
        .update({ order_index: targetItem.order_index })
        .eq("id", currentId);

      const { error: err2 } = await supabase
        .from(activeTab)
        .update({ order_index: currentItem.order_index })
        .eq("id", targetId);

      if (err1 || err2) throw err1 || err2;

      showStatus("Order updated!", "success");
      fetchData();
    } catch (err: any) {
      showStatus(err.message, "error");
    }
  };

  // ── Render: Login Screen ───────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Portfolio Admin Control
            </h1>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              [ ACCESS RESTRICTED // AUTHENTICATION REQUIRED ]
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={16} />
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                ADMIN MASTER PASSCODE
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3 text-zinc-500" size={16} />
                <input
                  type="password"
                  required
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. vagish2026)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>
              <p className="text-[11px] text-zinc-500 font-mono mt-1">
                Tip: Enter your passcode (e.g. <code className="text-cyan-400">vagish2026</code>) to enter instantly.
              </p>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full mt-4 py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              SIGN IN TO CONTROL CENTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Render: Authenticated Dashboard ────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">
              Vagish.dev Control Center
            </h1>
            <p className="text-[11px] text-cyan-400 font-mono">
              LIVE SUPABASE SYNC • CONNECTED
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://vagishkora.github.io/Vagish.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink size={13} />
          </a>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 text-xs font-mono text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2 animate-in fade-in ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {statusMessage.text}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 overflow-x-auto gap-3">
          <div className="flex items-center gap-2">
            {[
              { id: "projects", label: "Featured Projects", icon: FolderGit2 },
              { id: "certifications", label: "Certifications", icon: Award },
              { id: "skills", label: "Technical Skills", icon: Cpu },
              { id: "outreach", label: "Leadership & Outreach", icon: Users },
              { id: "hobbies", label: "Personal Hobbies", icon: Smile },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-bold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent"
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Add New Button */}
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/20 transition-all shrink-0"
          >
            <Plus size={16} />
            ADD ENTRY
          </button>
        </div>

        {/* Content List & Table */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          {dataList.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 font-mono text-sm">
              No entries found in this section. Click "+ ADD ENTRY" to create one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-zinc-950/80 text-zinc-400 uppercase tracking-widest border-b border-zinc-800">
                  <tr>
                    <th className="py-3.5 px-4 w-16 text-center">ORDER</th>
                    <th className="py-3.5 px-4">IDENTIFIER / PREVIEW</th>
                    <th className="py-3.5 px-4">TITLE & INFO</th>
                    <th className="py-3.5 px-4">TAGS / DETAILS</th>
                    <th className="py-3.5 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {dataList.map((item, idx) => (
                    <tr
                      key={item.id || idx}
                      className="hover:bg-zinc-800/30 transition-colors"
                    >
                      {/* Order Reorder Controls */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleMove(idx, "up")}
                            disabled={idx === 0}
                            className="p-1 text-zinc-400 hover:text-cyan-400 disabled:opacity-20 transition-colors"
                            title="Move Up"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <span className="text-zinc-500 font-bold text-[11px]">
                            {item.order_index ?? idx}
                          </span>
                          <button
                            onClick={() => handleMove(idx, "down")}
                            disabled={idx === dataList.length - 1}
                            className="p-1 text-zinc-400 hover:text-cyan-400 disabled:opacity-20 transition-colors"
                            title="Move Down"
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      </td>

                      {/* Preview / ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {item.image || item.key || item.icon ? (
                            <img
                              src={
                                (item.image || item.key || item.icon).startsWith("http") || (item.image || item.key || item.icon).startsWith("data:")
                                  ? item.image || item.key || item.icon
                                  : `https://vagishkora.github.io${(item.image || item.key || item.icon).startsWith("/Vagish.dev") ? "" : "/Vagish.dev"}${item.image || item.key || item.icon}`
                              }
                              alt=""
                              className="w-10 h-10 rounded object-cover border border-zinc-700 bg-zinc-950 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : null}
                          <div>
                            <div className="font-bold text-cyan-400">
                              {item.id || item.cert_id}
                            </div>
                            {item.badge && (
                              <span className="text-[10px] text-zinc-400">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Title & Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">
                          {item.title || item.name}
                        </div>
                        <div className="text-zinc-400 text-[11px] line-clamp-1 max-w-md">
                          {item.description || item.issuer || item.org || `Category: ${item.category || item.icon_name}`}
                        </div>
                      </td>

                      {/* Tags / Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(item.tags || item.skills || [item.status, item.location, item.date]).filter(Boolean).map((t: string, i: number) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-cyan-500/20 text-zinc-300 hover:text-cyan-400 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ── Add / Edit Modal ───────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <h2 className="text-base font-bold text-white font-mono">
                {editingItem ? `EDIT ${activeTab.toUpperCase()}` : `ADD NEW ${activeTab.toUpperCase()}`}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
              {/* Dynamic Inputs per Table */}
              {Object.keys(formData).map((key) => {
                if (key === "created_at" || (key === "id" && editingItem && activeTab === "certifications")) return null;

                const val = formData[key];
                const isBool = typeof val === "boolean";
                const isLong = key === "description";
                const isImageField = key === "image" || key === "key" || key === "icon";

                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-zinc-400 uppercase font-bold text-[11px]">
                      {key.replace("_", " ")}
                    </label>

                    {isBool ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          checked={Boolean(formData[key])}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.checked })
                          }
                          className="w-4 h-4 rounded bg-zinc-950 border-zinc-700 text-cyan-500 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-zinc-300 text-xs">Yes / Enabled</span>
                      </div>
                    ) : isImageField ? (
                      /* Rich Image Uploader with File Picker & Live Preview */
                      <div className="space-y-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                        {/* Live Image Preview */}
                        {formData[key] && (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 flex items-center justify-center">
                            <img
                              src={
                                formData[key].startsWith("http") || formData[key].startsWith("data:")
                                  ? formData[key]
                                  : `https://vagishkora.github.io${formData[key].startsWith("/Vagish.dev") ? "" : "/Vagish.dev"}${formData[key]}`
                              }
                              alt="Preview"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLElement).style.opacity = "0.3";
                              }}
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-cyan-400 font-mono">
                              CURRENT PREVIEW
                            </div>
                          </div>
                        )}

                        {/* File Upload Button */}
                        <div className="flex items-center gap-2">
                          <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-cyan-500/50 text-cyan-400 font-bold transition-all text-xs">
                            <Plus size={14} />
                            <span>CHOOSE IMAGE FROM DEVICE</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFormData({ ...formData, [key]: reader.result });
                                  showStatus("Image loaded from device!", "success");
                                };
                                reader.readAsDataURL(file);
                              }}
                            />
                          </label>
                        </div>

                        {/* Direct URL or Path Input */}
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase">Or Enter Direct URL / Asset Path:</span>
                          <input
                            type="text"
                            value={formData[key] || ""}
                            onChange={(e) =>
                              setFormData({ ...formData, [key]: e.target.value })
                            }
                            placeholder="e.g. /Vagish.dev/assets/my_image.webp or https://..."
                            className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 text-xs"
                          />
                        </div>

                        {/* Quick Presets */}
                        <div>
                          <span className="text-[10px] text-zinc-500 uppercase">Quick Presets:</span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {[
                              { label: "ACM Team", path: "/Vagish.dev/assets/acm_team.jpg" },
                              { label: "Speaking", path: "/Vagish.dev/assets/speaking.webp" },
                              { label: "IISc", path: "/Vagish.dev/assets/IISc_Banglore.webp" },
                              { label: "Cyber AI", path: "/Vagish.dev/assets/cybersecurity.webp" },
                              { label: "Birthday", path: "/Vagish.dev/assets/Birthday.webp" },
                              { label: "WealthNest", path: "/Vagish.dev/assets/Wealthnest.webp" },
                            ].map((preset) => (
                              <button
                                key={preset.path}
                                type="button"
                                onClick={() => setFormData({ ...formData, [key]: preset.path })}
                                className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 text-zinc-400 text-[10px] transition-colors border border-zinc-700/50"
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : isLong ? (
                      <textarea
                        rows={3}
                        value={formData[key] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[key] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500"
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20"
                >
                  SAVE RECORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
