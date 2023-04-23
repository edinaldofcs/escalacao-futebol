export interface PageProps {
  data?: TableProps;
  info?: TableProps;
  image?:string;
}
interface TableProps {
  table: {
    cols: any;
    rows: any;
  };
}

export interface DataProps {
  nome: string;
  camisa: string;
  foto: string;
  capitao?: boolean;
}
