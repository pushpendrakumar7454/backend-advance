import { Image, Music, X } from "lucide-react";
import { useState } from "react";
import { useAuthpost } from "../../hooks/useAuth";

const PostForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    submitPost,
  } = useAuthpost();

  const [songName, setSongName] = useState("");

  const onSubmit = async (data) => {
    const imageFile = data.image?.[0];
    const songFile = data.song?.[0];

    if (!imageFile) {
      return;
    }

    const imageReader = new FileReader();

    imageReader.onload = () => {
      const postData = {
        ...data,
        image: imageReader.result,
        song: null,
        songName: "",
      };

      // Agar song select kiya hai
      if (songFile) {
        const songReader = new FileReader();

        songReader.onload = () => {
          postData.song = songReader.result;
          postData.songName = songFile.name;

          submitPost(postData);
        };

        songReader.readAsDataURL(songFile);
      } else {
        submitPost(postData);
      }
    };

    imageReader.readAsDataURL(imageFile);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-3 py-6 pb-24 sm:px-4 sm:py-10">

      <div className="flex w-full justify-center">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[500px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >

          {/* HEADER */}
          <div className="border-b border-gray-200 px-4 py-4 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Create new post
            </h2>
          </div>

          {/* IMAGE */}
          <div className="flex min-h-[260px] w-full items-center justify-center bg-gray-50 sm:min-h-[300px]">

            <div className="flex flex-col items-center px-4 py-8 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 sm:h-20 sm:w-20">
                <Image
                  size={34}
                  strokeWidth={1.5}
                  className="text-gray-700"
                />
              </div>

              <h3 className="text-lg font-normal text-gray-900 sm:text-xl">
                Drag photos and videos here
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Or select from your device
              </p>

              <label className="mt-5 cursor-pointer rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-95">

                Select from computer

                <input
                  {...register("image", {
                    required: "Please select an image",
                  })}
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                />

              </label>

              {errors.image && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}

            </div>

          </div>

          {/* CAPTION */}
          <div className="border-t border-gray-200 px-4 py-4">

            <textarea
              {...register("caption")}
              maxLength={2200}
              placeholder="Write a caption..."
              className="h-24 w-full resize-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base"
            />

          </div>

          {/* SONG */}
          <div className="border-t border-gray-200 px-4 py-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <Music
                    size={22}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Add music
                  </p>

                  <p className="text-xs text-gray-500">
                    Add a song to your post
                  </p>
                </div>

              </div>

              <label className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">

                Add song

                <input
                  {...register("song", {
                    onChange: (e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setSongName(file.name);
                      }
                    },
                  })}
                  type="file"
                  accept="audio/*"
                  className="hidden"
                />

              </label>

            </div>

            {/* SELECTED SONG */}
            {songName && (
              <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3">

                <div className="flex min-w-0 items-center gap-3">

                  <Music
                    size={20}
                    className="shrink-0 text-blue-500"
                  />

                  <p className="truncate text-sm text-gray-700">
                    {songName}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSongName("");
                  }}
                  className="ml-2 shrink-0 text-gray-500 hover:text-red-500"
                >
                  <X size={18} />
                </button>

              </div>
            )}

          </div>

          {/* SHARE */}
          <div className="border-t border-gray-200 px-4 py-4">

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-[0.99]"
            >
              Share
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default PostForm;