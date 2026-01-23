"use client";

import Link from "next/link";
import swal from "sweetalert";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getVideoCategories, updateVideoCategory } from "@/services/admin/videoCategoryService";
import { useVideoCategory } from "@/hooks/admin/useVideoCategory";

const VideoCategoryPage = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    addCategory,
    deleteCategory,
    isAdding,
  } = useVideoCategory();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["video-category"],
    queryFn: () => getVideoCategories({ page: 1, limit: 10 }),
  });

  const list = data?.data?.list || [];

  // ✅ UPDATE mutation
  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, title }) => updateVideoCategory(id, { title }),
    onSuccess: (result) => {
      if (result?.status) {
        swal("Updated!", result?.message || "Category updated successfully", "success");
        queryClient.invalidateQueries(["video-category"]);
      } else {
        swal("Error", result?.message || "Something went wrong", "error");
      }
    },
    onError: (err) => {
      swal("Error", err?.message || "Failed to update category", "error");
    },
  });

  // ✅ Edit popup
  const handleEdit = async (cat) => {
    const newTitle = await swal({
      title: "Edit Category",
      text: "Update category title",
      content: {
        element: "input",
        attributes: {
          placeholder: "Enter new category title",
          value: cat.title || "",
          type: "text",
        },
      },
      buttons: ["Cancel", "Update"],
    });

    // cancel
    if (newTitle === null) return;

    const title = String(newTitle || "").trim();
    if (!title) {
      swal("Error", "Title is required", "error");
      return;
    }

    updateMutate({ id: cat.id, title });
  };

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="admin-card-title">Video Categories</h5>
        </div>

        <div className="admin-card-body">
          {/* ADD FORM */}
          <form
            onSubmit={handleSubmit((data) => addCategory(data))}
            className="mb-4"
          >
            <div className="row align-items-end">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Category Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category title"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="col-md-3">
                <button type="submit" className="theme-btn" disabled={isAdding}>
                  {isAdding ? "Saving..." : "Add Category"}
                </button>
              </div>
            </div>
          </form>

          {/* LIST */}
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error loading categories</div>}

          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={4}>No category found</td>
                </tr>
              )}

              {list.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td>{cat.title}</td>
                  <td>{cat.slug}</td>
                  <td className="d-flex gap-2">
                    <Link
                      href={`/admin/video-category/${cat.id}/videos`}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </Link>

                    {/* ✅ EDIT */}
                    <button
                      type="button"
                      className="btn btn-sm btn-warning"
                      disabled={isUpdating}
                      onClick={() => handleEdit(cat)}
                    >
                      {isUpdating ? "Updating..." : "Edit"}
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default VideoCategoryPage;
