import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useCreateSoftwareEquities = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.post("/api/software/equities", item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareEquities"]); // ✅ 데이터 새로고침
        },
    });
}

export const useFetchSoftwareEquities = () => {
    return useQuery({
        queryKey: ["SoftwareEquities"],
        queryFn: async () => await (await axios.get("/api/software/equities")).data,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        refetchOnWindowFocus: false,
    });
};

export const useDeleteSoftwareEquities = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await axios.delete("/api/software/equities/" + id),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareEquities"]); // ✅ 데이터 새로고침
        },
    });
};

export const useUpdateSoftwareEquities = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.put("/api/software/equities/" + item.id, item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareEquities"]); // ✅ 데이터 새로고침
        },
    });
}
