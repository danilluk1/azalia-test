"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  text: yup.string().required(),
  author: yup.string().required(),
});

type AdvertisingsInputData = yup.InferType<typeof schema>;

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
};

const AddAdvertising = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdvertisingsInputData>({
    resolver: yupResolver(schema),
  });
  return <div>AddAdvertising</div>;
};

export default AddAdvertising;
