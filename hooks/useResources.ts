import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../lib/axios";

// --- API Types ---

export interface ResourceGroup {
  uid: string;
  name: string;
  description: string;
  resource_type: string;
  resources: ResourceItem[];
  resources_count: number;
}

export interface ResourceItem {
  uid: string;
  name: string;
  description: string;
  tokens: number;
  preview_url: string;
  resource_type: string;
  purchased?: boolean;
}

export interface ResourceType {
  id: string;
  label: string;
  url: string;
}

export interface ResourcesResponseData {
  groups: ResourceGroup[];
  types: ResourceType[];
}

interface ApiResponse<T> {
  event: string;
  status: string;
  message: string;
  data: T;
  errors: any;
}

// --- Fetch Hooks ---

export const useResources = (type?: string) => {
  return useQuery({
    queryKey: ["resources", type],
    queryFn: async () => {
      const url = type 
        ? `/api/talent/resources/type/${type}` 
        : "/api/talent/resources/type";
      const res = await axios.get<ApiResponse<ResourcesResponseData>>(url);
      return res.data.data;
    },
  });
};

export const useResourceDetail = (uid: string) => {
  return useQuery({
    queryKey: ["resource", uid],
    queryFn: async () => {
      const res = await axios.get<ApiResponse<ResourceItem>>(
        `/api/talent/resources/${uid}`
      );
      return res.data.data;
    },
    enabled: !!uid,
  });
};

// --- Action Hooks (Buy/Download) ---

export const useBuyResource = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (uid: string) => {
      const res = await axios.post<ApiResponse<any>>(
        `/api/talent/resources/${uid}/buy`
      );
      return res.data;
    },
    onSuccess: (_, uid) => {
      // Invalidate both lists and detail
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      queryClient.invalidateQueries({ queryKey: ["resource", uid] });
      // Also invalidate user data to refresh tokens
      queryClient.invalidateQueries({ queryKey: ["user-data"] });
    },
  });
};

export const useDownloadResource = () => {
  return useMutation({
    mutationFn: async (uid: string) => {
      const res = await axios.get(`/api/talent/resources/${uid}/download`, {
        responseType: 'blob'
      });
      
      // Handle file download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resource-${uid}.pdf`); // Default to PDF or dynamic name if avail
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return res.data;
    },
  });
};
