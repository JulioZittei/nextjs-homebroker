import { Order } from "@/models";
import { isHomeBrokerClosed } from "@/util";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@/components/flowbite-components";

const getOrders = async (wallet_id: string): Promise<Order[]> => {
  const response = await fetch(
    `http://localhost:8000/wallets/${wallet_id}/orders`,
    {
      next: {
        revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
        tags: [`orders-wallet-${wallet_id}`],
      },
    }
  );
  return response.json();
};

async function MyOrders(props: { wallet_id: string }) {
  const orders = await getOrders(props.wallet_id);

  return (
    <div>
      <article className="format format-invert">
        <h2>Minhas ordens</h2>
      </article>
      <Table className="mt-2">
        <TableHead>
          <TableHeadCell>Asset ID</TableHeadCell>
          <TableHeadCell>Quant.</TableHeadCell>
          <TableHeadCell>Preço</TableHeadCell>
          <TableHeadCell>Tipo</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
        </TableHead>
        <TableBody>
          {orders.map((order, key) => (
            <TableRow className=" border-gray-700 bg-gray-800" key={key}>
              <TableCell className="whitespace-nowrap font-medium text-white">
                {order.Asset.id}
              </TableCell>
              <TableCell>{order.shares}</TableCell>
              <TableCell>
                {Number(order.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                <Badge color={order.type === "BUY" ? "green" : "red"}>
                  {order.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge>{order.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { MyOrders };
