import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

const createTechnicalAssociations = async (newItem) => {
    try {
        // 1️⃣ 기술 컨텍스트 생성 (Technical Context)
        const technicalContextRes = await axios.post("/api/technical/contexts", {
            name: newItem.technicalContextName,
            description: newItem.technicalContextDescription,
        });
        const technicalContextId = technicalContextRes.data.id; // ✅ 응답 데이터에서 id 추출

        // 2️⃣ 기술 결정 생성 (Technical Decision)
        const technicalDecisionRes = await axios.post("/api/technical/decisions", {
            name: newItem.technicalDecisionName,
            description: newItem.technicalDecisionDescription,
        });
        const technicalDecisionId = technicalDecisionRes.data.id; // ✅ 응답 데이터에서 id 추출

        // 3️⃣ 기술 컨텍스트와 기술 결정을 연결 (Association)
        const associationRes = await axios.post("/api/technical/associations", {
            technicalContextId,
            technicalDecisionId,
        });

        return associationRes.data; // ✅ 최종적으로 association 데이터 반환
    } catch (error) {
        console.error("Error creating technical association:", error);
        throw error; // 🚨 예외 발생 시 상위에서 처리할 수 있도록 throw
    }
};
export const useCreateTechnicalAssociations = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: createTechnicalAssociations,
        onSuccess: () => {
            queryClient.invalidateQueries(["technicalAssociations"]); // ✅ 데이터 새로고침
        },
    });
}
const fetchTechnicalAssociations = async () => {
    const {data} = await axios.get("/api/technical/associations/");
    return data;
};
export const useFetchTechnicalAssociations = () => {
    return useQuery({
        queryKey: ["technicalAssociations"],
        queryFn: fetchTechnicalAssociations,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
        gcTime: 1000 * 60 * 10, // 10분 동안 캐시 유지
        refetchOnWindowFocus: false,
    });
};

const deleteTechnicalAssociations = async (id) => {
    const technicalAssociationRes = await axios.get("/api/technical/associations/" + id);
    const technicalContextId = technicalAssociationRes.data.technicalContextDTO.id;
    const technicaldicisionId = technicalAssociationRes.data.technicalDecisionDTO.id;

    await axios.delete(`/api/technical/associations/${id}`);
    await axios.delete(`/api/technical/contexts/${technicalContextId}`);
    await axios.delete(`/api/technical/decisions/${technicaldicisionId}`);
};
export const useDeleteTechnicalAssociations = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTechnicalAssociations,
        onSuccess: () => {
            queryClient.invalidateQueries(["technicalAssociations"]); // ✅ 데이터 새로고침
        },
    });
};
const updateTechnicalAssociations = async (newItem) => {
    try {
        const technicalAssociationRes = await axios.get("/api/technical/associations/" + newItem.id);
        const technicalContextId = technicalAssociationRes.data.technicalContextDTO.id;
        const technicaldicisionId = technicalAssociationRes.data.technicalDecisionDTO.id;

        // 1️⃣ 기술 컨텍스트 생성 (Technical Context)
        const technicalContextRes = await axios.put("/api/technical/contexts/" + technicalContextId, {
            name: newItem.technicalContextName,
            description: newItem.technicalContextDescription,
        });

        // 2️⃣ 기술 결정 생성 (Technical Decision)
        const technicalDecisionRes = await axios.put("/api/technical/decisions/" + technicaldicisionId, {
            name: newItem.technicalDecisionName,
            description: newItem.technicalDecisionDescription,
        });
    } catch (error) {
        console.error("Error creating technical association:", error);
        throw error; // 🚨 예외 발생 시 상위에서 처리할 수 있도록 throw
    }
};
export const useUpdateTechnicalAssociations = () => {
    const queryClient = useQueryClient(); // 캐시 관리
    return useMutation({
        mutationFn: updateTechnicalAssociations,
        onSuccess: () => {
            queryClient.invalidateQueries(["technicalAssociations"]); // ✅ 데이터 새로고침
        },
    });
}
