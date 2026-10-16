import { useEffect, useState } from "react";
import CustomTable from "../Reusables/table/customtable";
import { GetAxios } from "../../services/services";
import { Button, IconButton } from "@mui/material";
import Print from "@mui/icons-material/LocalPrintshopRounded";
import PrintTest from "@mui/icons-material/LocalPrintshopTwoTone";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Acuse } from "./hojas/acuse/Acuse";
import { PdfDeclaracion } from "../Reusables/pdf/PdfDeclaracion";

const Checador = ({ }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openPdfs, setOpenPDfs] = useState({
        acuse: false,
        declaracion: false,
        testeada: false,
        row: {}

    })
    const init = async () => {
        setLoading(true);
        let dataNew = await GetAxios(`apartados/all/`)
        dataNew = dataNew.map((it) => {
            return {
                Folio: it.Folio,
                Gender: it.Gender,
                EmpleadoFechaAlta: it.EmpleadoFechaAlta,
                NombreCompleo: it.Nombre + " " + it.ApPaterno + " " + it.ApMaterno,
                AereaAdscripcion:it.AereaAdscripcion,
                DenominacionPuesto:it.DenominacionPuesto,
                Dependencia:it.Dependencia,

                Nombre: it.Nombre,
                ApPaterno: it.ApPaterno,
                ApMaterno: it.ApMaterno,
                Id_User: it.Id_User,
                Id_Person: it.Id_Person,


                Tipo_declaracion: it.Tipo_declaracion,
                Declaracion: it.Declaracion,
                Tstatus: it.Status,
                FechaRegistroFormateada: it.FechaRegistroFormateada,
                FechaRegistroTerminada: it.FechaRegistroTerminada,
            }
        })

        setData(dataNew);

        setLoading(false);
    };
    useEffect(() => {
        init()
    }, [])
    return (
        <>
            <CustomTable data={data} paginate={[10, 25, 50]}
                actions={(row) => (
                    <>
                        <Button variant="text" onClick={() => {
                            setOpenPDfs({
                                acuse: false,
                                declaracion: true,
                                testeada: false,
                                row
                            })
                        }}> <Print className="text-green-500  hover:text-green-600" /> </Button>
                        <Button variant="text" onClick={() => {
                            setOpenPDfs({
                                acuse: false,
                                declaracion: false,
                                testeada: true,
                                row
                            })
                        }}> <PrintTest className="text-gray-500  hover:text-gray-600" /> </Button>
                        <Button variant="text" onClick={() => {
                            setOpenPDfs({
                                acuse: true,
                                declaracion: false,
                                testeada: false,
                                row
                            })
                        }}> <ReceiptOutlinedIcon className="text-orange-500  hover:text-orange-600" /> </Button>
                    </>
                )}

                loading={loading} columns={[{
                    field: "Folio", headerName: "Folio"
                }, { field: "NombreCompleo", headerName: "NombreCompleo" },
                { field: "Tipo_declaracion", headerName: "Modalidad de la declaración" },
                { field: "Declaracion", headerName: "Tipo de declaración" },
                { field: "Tstatus", headerName: "Estatus" },


                ]} />
            {openPdfs.acuse && (
                <PdfDeclaracion title={"ACUSE"} open={openPdfs.acuse} setOpen={() => {
                    setOpenPDfs({
                        acuse: false,
                        declaracion: false,
                        testeada: false,
                        row: {}
                    })
                }} formTitle={"ACUSE"}>

                    <Acuse item={openPdfs.row} />
                </PdfDeclaracion>
            )}
            {openPdfs.declaracion && (
                <></>
            )}

        </>
    )

}

export default Checador;
