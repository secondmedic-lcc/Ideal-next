"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGalleryVideos } from "@/services/admin/galleryVideoService";
import { useGalleryVideoDelete } from "@/hooks/admin/useGalleryVideo";
import Link from "next/link";
import swal from "sweetalert";


const CategoryVideosPage = () => {
  const { categoryId } = useParams();
  const { deleteVideo } = useGalleryVideoDelete();

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
   const categoryTitle =
    videos.length > 0 ? videos[0]?.videoCategory?.title : "";

  return (
    <div className="admin-page">
      <div className="admin-card">
        <div className="admin-card-header">
          <h5 className="admin-card-title">
            Videos under Category : <span className="text-primary">{categoryTitle}</span>
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

                    <button
                      type="button"
                      className="theme-btn btn-danger"
                      onClick={() =>
                        swal({
                          title: "Are you sure?",
                          text: "This video will be removed",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            deleteVideo(video.id);
                          }
                        })
                      }
                    >
                      Delete Video
                    </button>
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
