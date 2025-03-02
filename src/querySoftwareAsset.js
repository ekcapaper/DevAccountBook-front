import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useCreateSoftwareAssets = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.post("/api/software/assets", item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareAssets"]); // ✅ 데이터 새로고침
        },
    });
}

export const useFetchSoftwareAssets = () => {
    return useQuery({
        queryKey: ["SoftwareAssets"],
        queryFn: async () => await (await axios.get("/api/software/assets")).data,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        refetchOnWindowFocus: false,
    });
};

export const useDeleteSoftwareAssets = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await axios.delete("/api/software/assets/" + id),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareAssets"]); // ✅ 데이터 새로고침
        },
    });
};

export const useUpdateSoftwareAssets = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.put("/api/software/assets/" + item.id, item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareAssets"]); // ✅ 데이터 새로고침
        },
    });
}
