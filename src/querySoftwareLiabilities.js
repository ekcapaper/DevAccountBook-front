import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useCreateSoftwareLiabilities = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.post("/api/software/liabilities", item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareLiabilities"]); // ✅ 데이터 새로고침
        },
    });
}

export const useFetchSoftwareLiabilities = () => {
    return useQuery({
        queryKey: ["SoftwareLiabilities"],
        queryFn: async () => await (await axios.get("/api/software/liabilities")).data,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        refetchOnWindowFocus: false,
    });
};

export const useDeleteSoftwareLiabilities = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await axios.delete("/api/software/liabilities/" + id),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareLiabilities"]); // ✅ 데이터 새로고침
        },
    });
};

export const useUpdateSoftwareLiabilities = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.put("/api/software/liabilities/" + item.id, item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareLiabilities"]); // ✅ 데이터 새로고침
        },
    });
}
