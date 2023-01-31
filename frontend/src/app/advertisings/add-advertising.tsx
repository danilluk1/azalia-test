"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const schema = yup.object({
  text: yup.string().required(),
  author: yup.string().required(),
});

type AdvertisingsInputData = yup.InferType<typeof schema>;

const AddAdvertising = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdvertisingsInputData>({
    resolver: yupResolver(schema),
  });

  const onSendClick: SubmitHandler<AdvertisingsInputData> = async (
    data: AdvertisingsInputData
  ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}advertisings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      alert(res.status);
    }

    router.refresh();
  };

  return (
    <div className="justify-center items-center flex flex-col mb-5">
      <div>
        <form onSubmit={handleSubmit(onSendClick)}>
          <div className="max-w-lg max-h-lg">
            <div>
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Введите автора
              </label>
              <input
                id="author"
                defaultValue="Тестовый автор"
                {...register("author", { required: true })}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.author && "Необходимо ввести число"}
            </div>
            <div>
              <label
                htmlFor="author"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Введите текст
              </label>
              <input
                id="text"
                defaultValue="Тестовый текст"
                {...register("text", { required: true })}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.text && "Необходимо ввести число"}
            </div>
            <button
              type="submit"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Отправить и обновить данные
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdvertising;
