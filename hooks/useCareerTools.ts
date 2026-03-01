import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../lib/axios";

export interface ToolType {
  id: string;
  label: string;
}

export interface Tool {
  uid: string;
  name: string;
  slug: string;
  description: string;
  generate_token_cost: number;
  regenerate_token_cost: number;
  type: string;
  status: string;
  icon_url?: string;
}

export interface ToolGroup {
  uid: string;
  name: string;
  description: string;
  type: string;
  tools: Tool[];
}

interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: any;
}

const fetchToolTypes = async (): Promise<ToolType[]> => {
  const res = await axios.get<ApiResponse<{ types: ToolType[] }>>("/api/talent/career-tools/types");
  return res.data.data.types;
};

const fetchGroupsByType = async (type: string): Promise<ToolGroup[]> => {
  const res = await axios.get<ApiResponse<{ groups: ToolGroup[] }>>(`/api/talent/career-tools/type/${type}`);
  return res.data.data.groups;
};

export const useToolTypes = () => {
  return useQuery({
    queryKey: ["career-tool-types"],
    queryFn: fetchToolTypes,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useToolGroups = (type?: string) => {
  const { data: toolTypes } = useToolTypes();
  
  return useQuery({
    queryKey: ["career-tool-groups", type, toolTypes?.length],
    queryFn: async () => {
      if (type && type !== "overview") {
        return fetchGroupsByType(type);
      }
      
      const typesToFetch = toolTypes?.map(t => t.id) || ["resume", "linkedin", "career"];
      const allResults = await Promise.all(
        typesToFetch.map(t => fetchGroupsByType(t).catch(() => []))
      );
      
      return allResults.flat();
    },
    enabled: !!toolTypes || type !== "overview",
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Overview might need to fetch all types or just handle it separately.
// Usually "Overview" shows some from each group.
// Let's also add a hook for the generation.
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const useGenerateToolOutput = (toolSlug: string) => {
  return useMutation({
    mutationFn: async (inputs: any) => {
      // Create a copy of inputs to avoid mutating original
      const payload: any = { ...inputs };
      
      // Convert any File objects to base64 strings
      for (const key in payload) {
        if (payload[key] instanceof File) {
          payload[key] = await fileToBase64(payload[key]);
        }
      }

      const res = await axios.post<ApiResponse<any>>(
        `/api/talent/career-tools/${toolSlug}/generate`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      return res.data.data;
    },
  });
};

export const useAllTools = () => {
  const { data: toolTypes } = useToolTypes();
  
  return useQuery({
    queryKey: ["career-all-tools"],
    queryFn: async () => {
      // Fallback types if ToolTypes fetch is slow or fails
      const typesToFetch = toolTypes?.map(t => t.id) || ["resume", "linkedin", "career"];
      
      const allResults = await Promise.all(
        typesToFetch.map(async (t) => {
          try {
            return await fetchGroupsByType(t);
          } catch (e) {
            console.error(`Failed to fetch groups for type: ${t}`, e);
            return [];
          }
        })
      );
      
      const flatTools = allResults.flat().flatMap(g => g.tools);
      // Remove duplicates by slug just in case
      return Array.from(new Map(flatTools.map(t => [t.slug, t])).values());
    },
    staleTime: 1000 * 60 * 15, // 15 minutes cache
    gcTime: 1000 * 60 * 60, // Keep in memory for 1 hour
  });
};

export const useToolBySlug = (slug: string) => {
  const { data: allTools, isLoading: isAllLoading, isFetching } = useAllTools();
  
  // If we already have tools in cache, let's return it immediately even if refetching
  const tool = allTools?.find((t) => t.slug === slug);
  
  return {
    data: tool,
    isLoading: isAllLoading && !tool, // Only show loading if we don't have the tool at all
    isFetching,
  };
};
