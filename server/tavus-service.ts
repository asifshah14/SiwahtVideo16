import { z } from "zod";

const TAVUS_API_KEY = process.env.TAVUS_API_KEY || "";
const TAVUS_API_URL = process.env.TAVUS_API_URL || "https://tavusapi.com/v2";

const replicaSchema = z.object({
  replica_id: z.string(),
  replica_name: z.string().optional(),
  status: z.string().optional(),
  thumbnail_video_url: z.string().optional(),
  created_at: z.string().optional(),
});

const personaSchema = z.object({
  persona_id: z.string(),
  persona_name: z.string().optional(),
  system_prompt: z.string().optional(),
  context: z.string().optional(),
  llm_provider: z.string().optional(),
  llm_model: z.string().optional(),
  created_at: z.string().optional(),
});

const conversationSchema = z.object({
  conversation_id: z.string(),
  conversation_name: z.string().optional(),
  conversation_url: z.string(),
  status: z.string().optional(),
  created_at: z.string().optional(),
});

type TavusReplica = z.infer<typeof replicaSchema>;
type TavusPersona = z.infer<typeof personaSchema>;
type TavusConversation = z.infer<typeof conversationSchema>;

class TavusService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = TAVUS_API_KEY;
    this.apiUrl = TAVUS_API_URL;

    if (!this.apiKey) {
      console.warn("TAVUS_API_KEY is not configured");
    }
  }

  private async makeRequest(
    endpoint: string,
    method: string = "GET",
    body?: any
  ): Promise<any> {
    if (!this.apiKey) {
      throw new Error("Tavus API key is not configured");
    }

    const url = `${this.apiUrl}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
    };

    if (body && (method === "POST" || method === "PATCH" || method === "PUT")) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Tavus API error (${response.status}): ${errorText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Tavus API request failed:", error);
      throw error;
    }
  }

  async listReplicas(): Promise<TavusReplica[]> {
    try {
      const response = await this.makeRequest("/replicas");
      return response.replicas || [];
    } catch (error) {
      console.error("Failed to list replicas:", error);
      throw error;
    }
  }

  async getReplicaById(replicaId: string): Promise<TavusReplica> {
    try {
      const response = await this.makeRequest(`/replicas/${replicaId}`);
      return replicaSchema.parse(response);
    } catch (error) {
      console.error("Failed to get replica:", error);
      throw error;
    }
  }

  async listPersonas(): Promise<TavusPersona[]> {
    try {
      const response = await this.makeRequest("/personas");
      return response.personas || [];
    } catch (error) {
      console.error("Failed to list personas:", error);
      throw error;
    }
  }

  async createPersona(data: {
    persona_name: string;
    system_prompt: string;
    context?: string;
    llm_provider?: string;
    llm_model?: string;
    default_replica_id?: string;
  }): Promise<TavusPersona> {
    try {
      const response = await this.makeRequest("/personas", "POST", data);
      return personaSchema.parse(response);
    } catch (error) {
      console.error("Failed to create persona:", error);
      throw error;
    }
  }

  async updatePersona(
    personaId: string,
    data: {
      persona_name?: string;
      system_prompt?: string;
      context?: string;
      llm_provider?: string;
      llm_model?: string;
    }
  ): Promise<TavusPersona> {
    try {
      const response = await this.makeRequest(
        `/personas/${personaId}`,
        "PATCH",
        data
      );
      return personaSchema.parse(response);
    } catch (error) {
      console.error("Failed to update persona:", error);
      throw error;
    }
  }

  async deletePersona(personaId: string): Promise<void> {
    try {
      await this.makeRequest(`/personas/${personaId}`, "DELETE");
    } catch (error) {
      console.error("Failed to delete persona:", error);
      throw error;
    }
  }

  async createConversation(data: {
    replica_id: string;
    persona_id: string;
    conversation_name?: string;
    callback_url?: string;
  }): Promise<TavusConversation> {
    try {
      const response = await this.makeRequest("/conversations", "POST", data);
      return conversationSchema.parse(response);
    } catch (error) {
      console.error("Failed to create conversation:", error);
      throw error;
    }
  }

  async getConversationById(
    conversationId: string
  ): Promise<TavusConversation> {
    try {
      const response = await this.makeRequest(
        `/conversations/${conversationId}`
      );
      return conversationSchema.parse(response);
    } catch (error) {
      console.error("Failed to get conversation:", error);
      throw error;
    }
  }

  async endConversation(conversationId: string): Promise<void> {
    try {
      await this.makeRequest(`/conversations/${conversationId}`, "DELETE");
    } catch (error) {
      console.error("Failed to end conversation:", error);
      throw error;
    }
  }

  async getConversationTranscript(conversationId: string): Promise<any> {
    try {
      const response = await this.makeRequest(
        `/conversations/${conversationId}/transcript`
      );
      return response;
    } catch (error) {
      console.error("Failed to get conversation transcript:", error);
      throw error;
    }
  }
}

export const tavusService = new TavusService();
export type { TavusReplica, TavusPersona, TavusConversation };
