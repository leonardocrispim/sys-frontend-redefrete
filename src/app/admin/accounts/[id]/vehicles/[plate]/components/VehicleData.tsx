import PageTitle from "@/components/utils/PageTitle"
import { Vehicle } from "VehiclesTypes"

type DataType = {
    vehicle: Vehicle
}

export default function VehicleData({ vehicle }: DataType) {

    function formatDate(data: Date) {
        const dataObj = new Date(data);
        const dia = dataObj.getUTCDate();
        const mes = dataObj.getUTCMonth() + 1; // Os meses em JavaScript são indexados a partir de zero
        const ano = dataObj.getUTCFullYear();
        
        // Formatação com zero à esquerda para dias e meses menores que 10
        const diaFormatado = dia < 10 ? '0' + dia : dia;
        const mesFormatado = mes < 10 ? '0' + mes : mes;
        
        const dataFormatada = `${diaFormatado}/${mesFormatado}/${ano}`;
        return dataFormatada;
    }

    function formatPlate(plate: string) {
        if (plate.length >= 4) {
            return plate.slice(0, 3) + "-" + plate.slice(3)
        } else {
            return plate
        }
    }

    let date = ""
    vehicle.created_at !== undefined ? date = formatDate(vehicle.created_at) : null
    
    const plate = formatPlate(vehicle.license_plate)


    return (
        <>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 mb-5">
                <div className="sm:col-span-2 flex items-center">
                    <PageTitle>Dados do Veículo</PageTitle>
                </div>

                <div className="border rounded-md p-4 mb-2">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                            <div className="text-xs font-medium text-rede-gray-400">Placa</div>
                            <div className="text-md font-medium  text-rede-gray-200">
                                {plate}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-rede-gray-400">Tipo de Veículo</div>
                            <div className="text-md font-medium  text-rede-gray-200">
                                {vehicle.vehicle_type}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs font-medium text-rede-gray-400">Data de Cadastro</div>
                            <div className="text-md font-medium  text-rede-gray-200">
                                {date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}