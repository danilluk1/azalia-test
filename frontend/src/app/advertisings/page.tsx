import { AdvertisingDto } from "@/pages/api/dtos/dtos";
import React from "react";
import AddAdvertising from "./add-advertising";
import AdvertisingsList from "./advertisings";

const Advertisings = async () => {
  const advsResp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}advertisings`
  );

  if (!advsResp.ok) {
    throw new Error("Failed to fetch advertisings");
  }

  const advs = (await advsResp?.json()) as AdvertisingDto[];

  return (
    <div>
      <>
        <AddAdvertising />
        <AdvertisingsList advertisings={advs} />
      </>
    </div>
  );
};

export default Advertisings;
