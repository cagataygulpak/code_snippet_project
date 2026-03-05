"use client";
import Sidebar from "./components/Sidebar";
import SnippetList from "./components/SnippetList";
import Workspace from "./components/Workspace";
import ConfirmModal from "./components/ConfirmModal";
import { useSnippets } from "./context/SnippetContext";

export default function Home() {
  const { activeSnippet, isCreating } = useSnippets();

  return (
    <main className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden relative">
      <ConfirmModal />
      <Sidebar />
      <SnippetList />
      <Workspace key={activeSnippet ? activeSnippet.id : (isCreating ? "new" : "empty")} />
    </main>
  );
}