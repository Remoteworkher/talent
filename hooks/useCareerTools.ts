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
  });
};

export const useToolGroups = (type?: string) => {
  const { data: toolTypes } = useToolTypes();
  
  return useQuery({
    queryKey: ["career-tool-groups", type, toolTypes?.length],
    queryFn: async () => {
      // If a specific type is selected (and it's not overview), fetch just that
      if (type && type !== "overview") {
        return fetchGroupsByType(type);
      }
      
      // If overview or no type specified, fetch for all known types
      const typesToFetch = toolTypes?.map(t => t.id) || ["resume", "linkedin", "career"];
      const allResults = await Promise.all(
        typesToFetch.map(t => fetchGroupsByType(t))
      );
      
      // Combine all groups from all types
      return allResults.flat();
    },
    enabled: true,
  });
};

// Overview might need to fetch all types or just handle it separately.
// Usually "Overview" shows some from each group.
// Let's also add a hook for the generation.
export const useGenerateToolOutput = (toolSlug: string) => {
  return useMutation({
    mutationFn: async (inputs: any) => {
      const res = await axios.post<ApiResponse<any>>(
        `/api/talent/career-tools/${toolSlug}/generate`,
        inputs
      );
      return res.data.data;
    },
  });
};

export const useToolBySlug = (slug: string) => {
  const { data: groups } = useToolGroups("overview");
  return {
    data: groups?.flatMap((g) => g.tools).find((t) => t.slug === slug),
    isLoading: !groups,
  };
};
