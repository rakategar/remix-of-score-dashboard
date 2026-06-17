import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/ClientShell";
import { ProgramDetail } from "@/components/ProgramDetail";

export const Route = createFileRoute("/client/programs/ace-batch-3/evaluation")({
  component: () => <ClientShell><ProgramDetail tab="evaluation" /></ClientShell>,
});
