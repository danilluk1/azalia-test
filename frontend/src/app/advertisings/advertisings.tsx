import { AdvertisingDto } from "@/pages/api/dtos/dtos";

type Props = {
  advertisings: AdvertisingDto[];
};

const AdvertisingsList = ({ advertisings }: Props) => {
  return (
    <div className="justify-center items-center flex flex-col">
      <h1>Список сообщений</h1>
      <ul>
        {advertisings.map((advertising) => (
          <li key={advertising.id}>{advertising.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdvertisingsList;
