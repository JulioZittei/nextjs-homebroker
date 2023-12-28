import { Label, TextInput, Button } from "flowbite-react";
import { revalidateTag } from "next/cache";

const initTransaction = async (formData: FormData) => {
  "use server";
  const shares = formData.get("shares");
  const price = formData.get("price");
  const wallet_id = formData.get("wallet_id");
  const asset_id = formData.get("asset_id");
  const type = formData.get("type");
  const response = await fetch(
    `http://localhost:8000/wallets/${wallet_id}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shares: Number(shares),
        price: Number(price),
        asset_id,
        type,
        status: "OPEN",
        created_at: Date.now(),
        updated_at: Date.now(),
        Asset: {
          id: asset_id,
          symbol: "PETR4",
          price: 30,
        },
      }),
    }
  );
  revalidateTag(`orders-wallet-${wallet_id}`);
  return await response.json();
};

function OrderForm(props: {
  asset_id: string;
  wallet_id: string;
  type: "BUY" | "SELL";
}) {
  return (
    <div>
      {/* <h1>Order Form</h1> */}
      <form action={initTransaction}>
        <input name="asset_id" type="hidden" defaultValue={props.asset_id} />
        <input name="wallet_id" type="hidden" defaultValue={props.wallet_id} />
        <input name="type" type="hidden" defaultValue={"BUY"} />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shares" value="Quantidade" />
          </div>
          <TextInput
            id="shares"
            name="shares"
            required
            type="number"
            min={1}
            step={1}
            defaultValue={1}
          />
        </div>
        <br />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="shares" value="Preço R$" />
          </div>
          <TextInput
            id="price"
            name="price"
            required
            type="number"
            min={1}
            step={1}
            defaultValue={1}
          />
        </div>
        <br />
        <Button type="submit" color={props.type === "BUY" ? "green" : "red"}>
          Confirmar {props.type === "BUY" ? "compra" : "venda"}
        </Button>
      </form>
    </div>
  );
}

export { OrderForm };
