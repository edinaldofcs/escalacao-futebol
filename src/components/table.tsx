import { useImgContext } from "@/context/useContext";
import { DataProps, PageProps } from "@/types/type";
import { NextPage } from "next";

const Table: NextPage<PageProps> = ({ data, info }) => {
  const { updateImg } = useImgContext();
  const titulares: DataProps[] = [];
  const reservas: DataProps[] = [];
  const informacoes = {
    mandante: info?.table.rows[0].c[0].v,
    tecnico: info?.table.rows[0].c[1].v,
    tipo: info?.table.rows[0].c[3].v,
    data: info?.table.rows[0].c[4].v,
    hora: info?.table.rows[0].c[5].v,
    estadio: info?.table.rows[0].c[6].v,
  };
// console.log(informacoes);

  data?.table.rows.forEach((row: any) => {
    titulares.push({
      nome: row.c[0].v,
      camisa: row.c[1].v,
      foto: row.c[2].v,
      capitao: row.c[3].v == "s",
    });
  });

  data?.table.rows.forEach((row: any) => {
    try {
      reservas.push({ nome: row.c[4].v, camisa: row.c[5].v, foto: row.c[6].v });
    } catch (error) {}
  });

  return (
    <div className="flex flex-col w-[45%] gap-4 justify-start items-center absolute bottom-0 p-2 h-[100vh] z-20">
      <div className="flex flex-col w-full gap-2">
        {informacoes && (
          <div className="flex relative justify-center items-center gap-1">
            <img
              src={informacoes.mandante}
              alt="teste"
              className="w-[80px]  z-10"
            />
          </div>
        )}
        <div className="flex flex-col  justify-center items-center bg-blue-900 text-white text-[12px] mx-2 relative">
          <p className="w-full text-center">{informacoes.tipo}</p>
          <p className="w-full text-center">
            {informacoes.data} - {informacoes.hora}
          </p>
          <p className="w-full text-center">{informacoes.estadio}</p>
          <div className="absolute bg-yellow-400 w-[60%] h-[50px] -z-20 -right-4 -top-2 opacity-80"></div>
        </div>
      </div>

      <div className="flex flex-col w-full h-fit border border-blue-900">
        {titulares.map((jogador) => (
          <div key={Math.random()} className="flex gap-2 w-full text-[14px]">
            <span className="bg-blue-950 text-yellow-400 w-[25px] text-center py-[2px]">
              {jogador.camisa}
            </span>
            <span
              className="text-blue-950 cursor-pointer"
              onClick={() => updateImg(jogador.foto)}
            >
              {jogador.nome.toLocaleUpperCase()}
            </span>
            {jogador.capitao && (
              <span className="bg-yellow-400 text-blue-900 text-[12px] flex items-center px-1">
                C
              </span>
            )}
          </div>
        ))}
        <div className="text-[12px] bg-blue-950">
          <span className="text-yellow-400 text-center">TEC</span>
          <span className="pl-2 text-center text-white">
            {informacoes.tecnico}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center w-full h-fit border border-blue-900 bg-blue-950">
        <p className="text-[12px] text-white font-bold w-full text-left px-2">
          SUPLENTES
        </p>
        <div className="flex w-full h-fit flex-wrap text-[8px] justify-center font-bold relative">
          {reservas.map((jogador) => (
            <div key={jogador.nome} className="m-[2px]">
              <span key={Math.random()} className="text-yellow-500 text-center">
                {jogador.camisa}.
              </span>
              <span key={jogador.nome} className=" text-white">
                {jogador.nome.toLocaleUpperCase()}
              </span>
            </div>
          ))}
          <div className="absolute bg-yellow-400 w-[60%] h-[50px] -z-20 -right-2 -top-10 opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default Table;
