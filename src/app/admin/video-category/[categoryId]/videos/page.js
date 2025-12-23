"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGalleryVideos } from "@/services/admin/galleryVideoService";

const CategoryVideosPage = () => {
  const { categoryId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery-video", categoryId],
    queryFn: () =>
      getGalleryVideos({
        video_category_id: categoryId,
        page: 1,
        limit: 50,
      }),
    enabled: !!categoryId,
  });

  const videos = data?.data?.list || [];

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="admin-card-title">
            Videos under Category ID: {categoryId}
          </h5>
        </div>

        <div className="admin-card-body">
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error loading videos</div>}

          <div className="row">
            {videos.length === 0 && !isLoading && (
              <div>No videos found for this category</div>
            )}

            {videos.map((video) => (
              <div className="col-md-4 mb-3" key={video.id}>
                <div className="card">
                  <iframe
                    src={video.link}
                    title={video.title}
                    style={{ width: "100%", height: "220px" }}
                    frameBorder="0"
                    allowFullScreen
                  />
                  <div className="card-body">
                    <strong>{video.title}</strong>
                    <div className="text-muted" style={{ fontSize: 12 }}>
                      Video ID: {video.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryVideosPage;
