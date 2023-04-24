import { useImgContext } from "@/context/useContext";
import { PageProps } from "@/types/type";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Table from "../components/table";

const url =
  "https://docs.google.com/spreadsheets/d/1rbIyfZhxXroZhmui-gDt-cQWNFWzMHu0-a3fNrPopCc/gviz/tq?tqx=out:json&sheet=";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(url + "jogadores");
  const str: any = await response.text();
  const jsonRegex = /google\.visualization\.Query\.setResponse\((.*)\);/s;
  const jsonData = str.match(jsonRegex)[1];
  const data: PageProps = JSON.parse(jsonData);

  const response2 = await fetch(url + "informacoes");
  const str2: any = await response2.text();
  const jsonRegex2 = /google\.visualization\.Query\.setResponse\((.*)\);/s;
  const jsonData2 = str2.match(jsonRegex2)[1];
  const info: PageProps = JSON.parse(jsonData2);

  return {
    props: {
      data,
      info,
    },
  };
};

const Home: NextPage<PageProps> = ({ data, info }) => {
  const { img, updateImg } = useImgContext();

  useEffect(() => {
    if (img === "") {
      updateImg(info?.table.rows[1].c[2].v);
    }
  }, [img, info?.table.rows, updateImg]);

  return (
    <div className="flex w-full h-[100vh] justify-center items-center">
      <div className="flex w-full max-w-[500px] h-[100vh] py-2 gap-1 relative items-center justify-between bg-white">
        <Table data={data} info={info} />
        <div className="absolute right-0 z-10 top-0 flex flex-col h-full items-center justify-center min-w-[90%]">
          <div className="absolute bg-yellow-400 w-3/5 h-[87vh] right-0 top-6 -z-10"></div>
          <div className="absolute bg-white w-2/5 h-[85vh] right-12 top-8 -z-10"></div>
          <div className="absolute bg-blue-950 w-2/5 h-[88vh] right-8 top-4 -z-10"></div>
          <div className="absolute bg-blue-900 w-3/5 h-[80vh] right-0 top-14 -z-10"></div>
          <img className="fixed bg-transparent min-w-[300px] max-w-[450px]" src={img} alt="teste" />
        </div>
      </div>
    </div>
  );
};

export default Home;
