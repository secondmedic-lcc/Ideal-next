"use client";

import { useQuery } from "@tanstack/react-query";
import { getVideoCategories } from "@/services/admin/videoCategoryService";


const VideoCategoryPage = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["video-category"],
        queryFn: () => getVideoCategories({ page: 1, limit: 10 }),
    });

    const list = data?.data?.list || [];

    console.log("Video Category API response:", data);

    return (
        <div className="admin-page">
            <div className="admin-card">
                <div className="admin-card-header">
                    <h5 className="admin-card-title">Video Categories</h5>
                </div>

                <div className="admin-card-body">
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
                                    <td>
                                        <a
                                            href={`/admin/video-category/${cat.id}/videos`}
                                            className="btn btn-sm btn-primary me-2"
                                        >
                                            View
                                        </a>

                                        <a
                                            href={`/admin/video-category/${cat.id}/add-video`}
                                            className="btn btn-sm btn-success"
                                        >
                                            Add
                                        </a>
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
