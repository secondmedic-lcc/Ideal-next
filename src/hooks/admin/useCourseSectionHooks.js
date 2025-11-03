// hooks/useCourseSectionHooks.js
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createCourseSection,
    getCourseSections,
    getCourseSectionById,
    updateCourseSection,
    deleteCourseSection,
} from "@/services/admin/courseSectionService";
import swal from "sweetalert";


/**
 * useCourseSections - paginated/filtered list
 * params: { page, limit, course_id, status }
 * options: { enabled, staleTime, ... } forwarded to react-query
 */
export const useCourseSections = (params = {}, options = {}) => {
    const queryKey = ["courseSections", params];
    return useQuery({
        queryKey,
        queryFn: () => getCourseSections(params),
        keepPreviousData: true,
        ...options,
    });
};

/**
 * useCourseSection - single item fetch
 */
export const useCourseSection = (id, options = {}) => {
    return useQuery({
        queryKey: ["courseSection", id],
        queryFn: () => getCourseSectionById(id),
        enabled: Boolean(id),
        ...options,
    });
};

/**
 * useCreateCourseSection
 */
export const useCreateCourseSection = (options = {}) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) =>
            createCourseSection(data),
        onSuccess: (res) => {
            if (options.onSuccess) options.onSuccess(res);
        },
        onError: (err) => {
            const msg = err?.message || "Network or server error";
            swal("Error", msg, "error");
            if (options.onError) options.onError(err);
        },
        ...options,
    });
};

/**
 * useUpdateCourseSection
 */
export const useUpdateCourseSection = (options = {}) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) =>
            updateCourseSection(id, data, { token: localStorage.getItem("token") }),
        onSuccess: (res, variables) => {
            if (res?.status) {
                swal("Success", res.message || "Section updated", "success");
                qc.invalidateQueries({ queryKey: ["courseSections"] });
                if (variables?.id) qc.invalidateQueries({ queryKey: ["courseSection", variables.id] });
            } else {
                swal("Error", res?.message || "Unable to update section", "error");
            }
            if (options.onSuccess) options.onSuccess(res);
        },
        onError: (err) => {
            const msg = err?.message || "Network or server error";
            swal("Error", msg, "error");
            if (options.onError) options.onError(err);
        },
        ...options,
    });
};

/**
 * useDeleteCourseSection
 */
export const useDeleteCourseSection = (options = {}) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteCourseSection(id, { token: localStorage.getItem("token") }),
        onSuccess: (res, id) => {
            if (res?.status) {
                swal("Success", res.message || "Section deleted", "success");
                qc.invalidateQueries({ queryKey: ["courseSections"] });
            } else {
                swal("Error", res?.message || "Unable to delete section", "error");
            }
            if (options.onSuccess) options.onSuccess(res);
        },
        onError: (err) => {
            const msg = err?.message || "Network or server error";
            swal("Error", msg, "error");
            if (options.onError) options.onError(err);
        },
        ...options,
    });
};
