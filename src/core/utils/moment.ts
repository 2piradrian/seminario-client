import moment from "moment/min/moment-with-locales";

moment.updateLocale("es", {
    months: [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ],
    monthsShort: [
        "Ene","Feb","Mar","Abr","May","Jun",
        "Jul","Ago","Sep","Oct","Nov","Dic"
    ],
    weekdays: [
        "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
    ],
    weekdaysShort: ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],
});

export default moment;
