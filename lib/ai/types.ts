import { buildAIContext } from "./context-builder";

export type AIContext = Awaited<ReturnType<typeof buildAIContext>>;
