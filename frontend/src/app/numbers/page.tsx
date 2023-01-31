"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OperationDto } from "@/pages/api/dtos/dtos";

const schema = yup.object({
  number: yup.number().required(),
});

type NumberInputFormData = yup.InferType<typeof schema>;

const Numbers = () => {
  const [history, setHistory] = useState<OperationDto[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NumberInputFormData>({
    resolver: yupResolver(schema),
  });

  const onSendClick: SubmitHandler<NumberInputFormData> = async (
    data: NumberInputFormData
  ) => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}numbers`, {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY?.toString() ?? "",
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ number: data.number }),
    });
    if (!res.ok) {
      alert(res.status);
      return;
    }

    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}numbers`, {
      headers: {
        "api-key": process.env.NEXT_PUBLIC_API_KEY?.toString() ?? "",
      },
    });

    if (!res.ok) {
      alert(res.status);
      return;
    }

    setHistory(await res.json());
  };

  React.useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}numbers`, {
        headers: {
          "api-key": process.env.NEXT_PUBLIC_API_KEY?.toString() ?? "",
        },
      });

      if (!res.ok) {
        alert(res.status);
        return;
      }

      setHistory(await res.json());
    })();
  }, []);

  return (
    <div className="justify-center items-center flex flex-col">
      <div>
        <form onSubmit={handleSubmit(onSendClick)}>
          <div className="max-w-lg max-h-lg">
            <div>
              <label
                htmlFor="number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Введите число
              </label>
              <input
                id="number"
                defaultValue="0"
                {...register("number", { required: true })}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.number && "Необходимо ввести число"}
            </div>
            <button
              type="submit"
              className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Отправить и получить среднее
            </button>
          </div>
        </form>
      </div>
      <div>
        <h1>История операций</h1>
        <ul className="overflow-y-auto max-h-48">
          {history.map((operation) => (
            <li key={operation.id}>
              Введено число: {operation.inserted_number}, Предыдущее{" "}
              {operation.previous_number}, Результат: {operation.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Numbers;
