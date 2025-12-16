import ImagesSlider from "../ImagesSlider";
import PostTitle from "./PostTitlle";
import PostBody from "./PostBody";
import PostTime from "./PostTime";

import { useAuth } from "../hooks/useAuth";
import AdminControls from "./AdminControls";

export default function Post({
  postId,
  title,
  body,
  images,
  special,
  secret,
  postedAt,
  type,
  onDeletePost,
  storyId,
  fromAdmin = false,
}) {
  const { user } = useAuth();
  return (
    <div
      className="flex max-w-full items-center justify-center py-15 md:p-10"
      style={secret && !user?.role ? { display: "none" } : {}}
    >
      <div
        className={`post w-full flex-col border border-r-0 border-l-0 p-5 md:w-[80%] md:rounded-2xl md:border-r md:border-l lg:w-[80%] xl:w-fit xl:max-w-[1200px] relative${
          special ? " special" : secret ? " secret" : ""
        }`}
        style={
          special
            ? {
                borderColor: "var(--gold-story-border-color)",
                backgroundColor: "var(--gold-story-bg-color)",
              }
            : secret && user?.role
              ? {
                  backgroundColor: "var(--secret-post-bg-color)",
                  color: "var(--secret-post-font-color)",
                  borderColor: "var(--secret-post-border-color)",
                }
              : {}
        }
      >
        {user?.role === 1 && !fromAdmin && (
          <AdminControls
            postId={postId}
            type={type}
            onDeletePost={onDeletePost}
            storyId={storyId}
          />
        )}
        {postId > 436 && <PostTime postedAt={postedAt} />}
        {title?.trim() !== "" && <PostTitle text={title} />}
        {body?.trim() !== "" && (
          <PostBody body={body} showAllText={images?.length === 0} />
        )}
        {images?.length > 0 && (
          <ImagesSlider images={images} showImageSrcUnder={fromAdmin} />
        )}
      </div>
    </div>
  );
}
