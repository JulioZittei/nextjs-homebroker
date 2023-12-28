import { WalletAsset } from "@/models";
import { isHomeBrokerClosed } from "@/util";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@/components/flowbite-components";
import Link from "next/link";

const getOrders = async (wallet_id: string): Promise<WalletAsset[]> => {
  const response = await fetch(
    `http://localhost:8000/wallets/${wallet_id}/assets`,
    {
      next: {
        revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
      },
    }
  );
  return response.json();
};

async function MyWallet(props: { wallet_id: string }) {
  const walletAssets = await getOrders(props.wallet_id);

  return (
    <Table>
      <TableHead>
        <TableHeadCell>Nome</TableHeadCell>
        <TableHeadCell>Preço</TableHeadCell>
        <TableHeadCell>Quant.</TableHeadCell>
        <TableHeadCell>
          <span className="sr-only">Comprar/Vender</span>
        </TableHeadCell>
      </TableHead>
      <TableBody className="divide-y">
        {walletAssets.map((walletAsset, key) => (
          <TableRow className="border-gray-700 bg-gray-800" key={key}>
            <TableCell className="whitespace-nowrap font-medium text-white">
              {walletAsset.Asset.id} ({walletAsset.Asset.symbol})
            </TableCell>
            <TableCell>
              {Number(walletAsset.Asset.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>{walletAsset.shares}</TableCell>
            <TableCell>
              <Link
                className="font-medium hover:underline text-cyan-500"
                href={`/${props.wallet_id}/home-broker/${walletAsset.Asset.id}`}
              >
                Comprar/Vender
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { MyWallet };
