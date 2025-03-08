import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useCreateSoftwareMetrics = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.post("/api/software/metrics", item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareMetrics"]); // ✅ 데이터 새로고침
        },
    });
}

export const useFetchSoftwareMetrics = () => {
    return useQuery({
        queryKey: ["SoftwareMetrics"],
        queryFn: async () => await (await axios.get("/api/software/metrics")).data,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        refetchOnWindowFocus: false,
    });
};

export const useDeleteSoftwareMetrics = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await axios.delete("/api/software/metrics/" + id),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareMetrics"]); // ✅ 데이터 새로고침
        },
    });
};

export const useUpdateSoftwareMetrics = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.put("/api/software/metrics/" + item.id, item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareMetrics"]); // ✅ 데이터 새로고침
        },
    });
}
