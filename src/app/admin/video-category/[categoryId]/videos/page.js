"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGalleryVideos } from "@/services/admin/galleryVideoService";
import Link from "next/link";

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

          <Link
          href={`/admin/video-category/${categoryId}/add-video`}
          className="theme-btn"
        ><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <span>Add Videos</span>
        </Link>
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
