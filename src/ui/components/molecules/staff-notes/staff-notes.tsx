import style from "./style.module.css";

export default function StaffNotes() {
    return (
        <div className={style.placeholderCard}>
            <h3>Notas del staff</h3>
            <ul>
                <li>💡 Tip: Sigue a otras cuentas para ver sus publicaciones.</li>
                <li>🚀 Nuevo: Envía mensajes a otras personas.</li>
            </ul>
        </div>
    );
}
