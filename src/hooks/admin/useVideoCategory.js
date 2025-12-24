// src/hooks/admin/useVideoCategory.js

import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  saveVideoCategory,
  deleteVideoCategory,
} from "@/services/admin/videoCategoryService";

export const useVideoCategory = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  // ADD CATEGORY
  const addMutation = useMutation({
    mutationFn: saveVideoCategory,
    onSuccess: (res) => {
      if (res?.status === true) {
        swal("Success", res.message || "Category added", "success");
        reset();
        queryClient.invalidateQueries(["video-category"]);
      } else {
        swal("Error", res?.message || "Failed to add category", "error");
      }
    },
    onError: () => {
      swal("Error", "Server error", "error");
    },
  });

  // DELETE CATEGORY
  const deleteMutation = useMutation({
    mutationFn: deleteVideoCategory,
    onSuccess: (res) => {
      if (res?.status === true) {
        swal("Deleted", res.message || "Category deleted", "success");
        queryClient.invalidateQueries(["video-category"]);
      } else {
        swal("Error", res?.message || "Failed to delete category", "error");
      }
    },
  });

  return {
    register,
    handleSubmit,
    addCategory: addMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isAdding: addMutation.isPending,
  };
};
