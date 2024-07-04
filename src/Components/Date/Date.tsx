import { format, differenceInHours } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  data: Date;
}

export const DateComponent = ({ data }: Props) => {
  const now = new Date();
  const diffHours = differenceInHours(now, data);

  let content;
  if (diffHours < 24) {
    const timeDistance = formatDistanceToNow(data, { locale: ptBR, addSuffix: true });
    content = timeDistance;
  } else {
    const formattedDate = format(data, "dd/MM/yyyy");
    content = formattedDate;
  }

  return <span className="opaque-text mt-[6px]">{content}</span>;
};
