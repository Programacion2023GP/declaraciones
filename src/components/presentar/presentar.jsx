import { useEffect, useState } from "react";
import { GetAxios } from "../../services/services";
import CustomTable from "../Reusables/table/customtable";
import Spinner from "../loading/Loading";

const Presentar = ({ }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fechaInicio, setFechaInicio] = useState("2020-01-01");
    const getToday = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };
    const [fechaFin, setFechaFin] = useState(getToday());

    // Nuevos estados para los parámetros adicionales
    const [fechaAlta, setFechaAlta] = useState("2020-01-01"); // Inicialmente igual que fechaInicio
    const [plazoId, setPlazoId] = useState("1"); // Valor inicial para "inicial" (1)

    const init = async (fechaRef = "", fechaFinParam = "", plazoIdParam = "", fechaAltaParam = "") => {
        setLoading(true);
        try {
            // Construir la URL según los parámetros
            let url = '/reportes/presentar';

            // Si hay algún parámetro, construir la URL con todos los parámetros
            if (fechaRef || fechaFinParam || plazoIdParam || fechaAltaParam) {
                const params = [
                    plazoIdParam || "1", // Si no hay plazoId, usar 1 (inicial)
                    fechaRef || "2020-01-01", // fecha_referencia
                    fechaFinParam || getToday(), // fecha_fin
                    fechaAltaParam || fechaRef || "2020-01-01" // fechaAlta, usa fechaRef como default
                ];
                url = `/reportes/presentar/${params.join('/')}`;
            }

            const result = await GetAxios(url);
            setData(result || []);
        } catch (error) {
            console.error("Error al cargar datos:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const handleBuscar = () => {
        // Usar fechaInicio como fechaAlta si no se especificó otra
        const fechaAltaParaBuscar = fechaAlta || fechaInicio;

        init(fechaInicio, fechaFin, plazoId, fechaAltaParaBuscar);
    };

    const handleLimpiarFiltros = () => {
        setFechaInicio("2020-01-01");
        setFechaFin(getToday());
        setFechaAlta("2020-01-01");
        setPlazoId("1");
        init();
    };

    // Calcular la fecha mínima y máxima para los inputs
    const today = getToday();
    const minDate = "2020-01-01";

    return (
        <>
            {/* Filtro de Fechas */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                       
                        Filtros de Reportes
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">Selecciona los parámetros para generar el reporte</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    {/* Fecha Inicio (fecha_referencia) */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Fecha Inicial
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            
                            </div>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                max={fechaFin || today}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Fecha Fin */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Fecha Final
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               
                            </div>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                min={fechaInicio || minDate}
                                max={today}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Fecha Alta */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Fecha Alta (Empleados)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              
                            </div>
                            <input
                                type="date"
                                value={fechaAlta}
                                onChange={(e) => setFechaAlta(e.target.value)}
                                max={today}
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Select de Plazo */}
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">
                            Tipo de Declaración
                        </label>
                        <select
                            value={plazoId}
                            onChange={(e) => setPlazoId(e.target.value)}
                            className="w-full pl-4 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200 text-gray-800"
                        >
                            <option value="1">Inicial</option>
                            <option value="2">Modificación</option>
                            <option value="3">Conclusión</option>
                        </select>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end space-x-4">
                   
                    <button
                        onClick={handleBuscar}
                        disabled={!fechaInicio}
                        className={`
                            relative flex items-center justify-center gap-2
                            px-6 py-3 rounded-lg font-semibold
                            transition-all duration-300 ease-out
                            ${!fechaInicio
                                ? `
                                    bg-gray-200 text-gray-400 cursor-not-allowed
                                `
                                : `
                                    bg-gradient-to-r from-blue-600 to-cyan-500
                                    text-white
                                    shadow-lg shadow-blue-500/30
                                    hover:from-blue-700 hover:to-cyan-600
                                    hover:shadow-xl hover:shadow-blue-500/40
                                    active:scale-95
                                `
                            }
                        `}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        Generar Reporte
                    </button>
                </div>

                {/* Resumen del filtro */}
        
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Resultados del Reporte
                        {data.length > 0 && (
                            <span className="ml-2 text-sm font-normal text-gray-600">
                                ({data.length} registros)
                            </span>
                        )}
                    </h2>
                </div>

                <CustomTable
                    data={data}
                    paginate={[10, 25, 50]}
                    loading={loading}
                    columns={[
                        { field: "Email", headerName: "Correo" },
                        { field: "NombreCompleto", headerName: "Nombre" },
                        { field: "Nomina", headerName: "Nomina" },
                        { field: "Dependencia", headerName: "Dependencia" },
                        { field: "Adscripcion", headerName: "Adscripcion" },
                        { field: "Empleo", headerName: "Empleo" },
                        { field: "fechaAlta", headerName: "Fecha alta" },

                    ]}
                />
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default Presentar;