import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useCreateSoftwareExternals = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.post("/api/software/externals", item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareExternals"]); // ✅ 데이터 새로고침
        },
    });
}

export const useFetchSoftwareExternals = () => {
    return useQuery({
        queryKey: ["SoftwareExternals"],
        queryFn: async () => await (await axios.get("/api/software/externals")).data,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        refetchOnWindowFocus: false,
    });
};

export const useDeleteSoftwareExternals = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => await axios.delete("/api/software/externals/" + id),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareExternals"]); // ✅ 데이터 새로고침
        },
    });
};

export const useUpdateSoftwareExternals = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: async (item) => await axios.put("/api/software/externals/" + item.id, item, {
            name: item.name,
            description: item.description,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries(["SoftwareExternals"]); // ✅ 데이터 새로고침
        },
    });
}
