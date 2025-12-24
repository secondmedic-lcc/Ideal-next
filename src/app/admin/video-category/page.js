"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getVideoCategories } from "@/services/admin/videoCategoryService";
import { useVideoCategory } from "@/hooks/admin/useVideoCategory";

const VideoCategoryPage = () => {
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
                <label className="form-label fw-semibold">
                  Category Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category title"
                  {...register("title", { required: true })}
                />
              </div>

              <div className="col-md-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isAdding}
                >
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

              {list.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.title}</td>
                  <td>{cat.slug}</td>
                  <td className="d-flex gap-2">
                    <Link
                      href={`/admin/video-category/${cat.id}/videos`}
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </Link>
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
