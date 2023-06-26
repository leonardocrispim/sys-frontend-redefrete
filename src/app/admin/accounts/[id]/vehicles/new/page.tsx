import { Driver } from "DriversTypes";
import TabsPage from "../../components/TabsPage";
import VehiclesMenu from "../components/VehiclesMenu";
import NewForm from "./components/NewForm";

type DataType = {
    params: {
      id: string;
    };
};

export default async function AccountVehiclesNewPage({ params }: DataType) {
    const account_id = Number(params.id);

  return (
    <>
        <TabsPage current='vehicles' account_id={account_id}></TabsPage>

        <div className="px-4 py-6 border rounded-b-md">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                <div>
                    <VehiclesMenu account_id={account_id} current="New" />
                </div>
                <div className="col-span-4">
                    <NewForm account_id={account_id} />
                </div>
            </div>
        </div>
    </>
  )  
}