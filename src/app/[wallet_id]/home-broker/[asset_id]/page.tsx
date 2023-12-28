import { Chart } from "@/components/Chart";
import { MyOrders } from "@/components/MyOrders";
import { OrderForm } from "@/components/OrderForm";
import { TabGroup, TabItem, Card } from "@/components/flowbite-components";
import { HiShoppingCart, HiArrowUp } from "@/components/react-icons/hi";

export default function HomeBrokerPage({
  params,
}: {
  params: {
    wallet_id: string;
    asset_id: string;
  };
}) {
  return (
    <main className="flex flex-grow flex-col container mx-auto p-2">
      <article className="format format-invert">
        <h1>Home Broker - {params.asset_id}</h1>
      </article>
      <div className="grid grid-cols-5 flex-grow gap-2 mt-4">
        <div className="col-span-2">
          <div>
            <Card
              theme={{
                root: {
                  children:
                    "flex h-full flex-col justify-center gap-4 py-4 px-2",
                },
              }}
            >
              <TabGroup aria-label="Default tabs" style="pills">
                <TabItem active title="Comprar" icon={HiShoppingCart}>
                  <OrderForm
                    type="BUY"
                    wallet_id={params.wallet_id}
                    asset_id={params.asset_id}
                  />
                </TabItem>
                <TabItem active title="Vender" icon={HiArrowUp}>
                  <OrderForm
                    type="SELL"
                    wallet_id={params.wallet_id}
                    asset_id={params.asset_id}
                  />
                </TabItem>
              </TabGroup>
            </Card>
          </div>
          <div className="mt-2">
            <Card
              theme={{
                root: {
                  children:
                    "flex h-full flex-col justify-center gap-4 py-4 px-2",
                },
              }}
            >
              <MyOrders wallet_id={params.wallet_id} />
            </Card>
          </div>
        </div>
        <div className="col-span-3 flex flex-grow">
          <Chart header={`${params.asset_id} - R$ 100`} />
        </div>
      </div>
    </main>
  );
}
