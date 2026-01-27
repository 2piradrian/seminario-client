export class Errors {

    // ===== Validaciones =====
    public static readonly INVALID_PASSWORD = "La contraseña debe tener al menos: ocho carácteres, una minúscula, una mayúscula y un número."
    public static readonly INVALID_EMAIL = "El email es inválido."
    public static readonly INVALID_NAME = "El nombre es inválido."
    public static readonly INVALID_LASTNAME = "El apellido es inválido."
    public static readonly INVALID_IMAGE = "El tamaño de la imágen debe ser menor a 1MB."
    public static readonly INVALID_TYPE = "Solo se permiten archivos JPG y JPEG."
    public static readonly INVALID_SHORTDESCRIPTION = "La descripción corta es inválida."
    public static readonly INVALID_LONGDESCRIPTION = "La descripción larga es inválida."
    public static readonly INVALID_TITLE = "El título de la publicación es inválido."
    public static readonly INVALID_CONTENT = "El contenido es inválido."

    // ===== Generales =====
    public static readonly INTERNAL_ERROR = "Error interno del servidor."
    public static readonly INVALID_CREDENTIALS = "Credenciales inválidas."
    public static readonly EMAIL_ALREADY_IN_USE = "El email ya está en uso."
    public static readonly USER_NOT_FOUND = "Usuario no encontrado."
    public static readonly UNAUTHORIZED = "No autorizado."
    public static readonly FORBIDDEN = "Prohibido."
    public static readonly RESOURCE_NOT_FOUND = "Recurso no encontrado."
    public static readonly BAD_REQUEST = "Solicitud inválida."

    public static readonly FULLNAME_ALREADY_EXISTS = "El nombre de usuario ya existe"
    public static readonly EMAIL_ALREADY_EXISTS = "El email ya existe"
    public static readonly MISSING_REQUIRED_FIELDS = "El campo debe ser completado"
    public static readonly INVALID_FIELDS = "El campo es inválido"

    // ===== Usuario =====
    public static readonly EMAIL_NOT_VERIFIED = "Debe verificar su email para continuar."
    public static readonly USER_DELETED = "El usuario fue baneado."
    public static readonly PASSWORDS_DO_NOT_MATCH = "Las contraseñas no coinciden."
    public static readonly USER_ALREADY_ACTIVATED = "El usuario ya está activado."
    public static readonly USER_ALREADY_HAS_NO_ROLE = "El usuario ya no tiene rol asignado."
    public static readonly USER_ALREADY_HAS_ROLE = "El usuario ya tiene un rol asignado."
    public static readonly USER_ALREADY_IS_AUTHOR = "El usuario ya es el autor del evento."

    // ===== Event =====
    public static readonly EVENT_NOT_STARTED = "El evento aún no comenzó."
    public static readonly EVENT_ALREADY_ENDED = "El evento ya finalizó."
    public static readonly EVENT_NOT_FOUND = "Evento no encontrado."

    // ===== Post / Foro =====
    public static readonly POST_NOT_FOUND = "Foro no encontrado"
    public static readonly POST_NOT_ACTIVE = "El foro no está activo"
    public static readonly COMMENT_NOT_FOUND = "Comentario no encontrado"

    // ===== Page =====
    public static readonly PAGE_NOT_FOUND = "Página no encontrada."
    public static readonly PAGENAME_ALREADY_EXISTS = "El nombre de la página ya existe."
    public static readonly USER_NOT_MEMBER = "El usuario no es miembro de la página."
    public static readonly USER_ALREADY_MEMBER = "El usuario ya es miembro de la página."
    public static readonly INVITATION_ALREADY_USED = "La invitación ya fue utilizada."

    // ===== Catalog =====
    public static readonly ROLE_NOT_FOUND = "Rol no encontrado."
    public static readonly PAGE_TYPE_NOT_FOUND = "Tipo de página no encontrado."
    public static readonly INSTRUMENT_NOT_FOUND = "Instrumento no encontrado."
    public static readonly CATEGORY_NOT_FOUND = "Categoría no encontrada."
    public static readonly POSTYPE_NOT_FOUND = "Tipo de publicación no encontrado."
    public static readonly CONTENT_TYPE_NOT_FOUND = "Tipo de contenido no encontrado."
    public static readonly STYLE_NOT_FOUND = "Estilo musical no encontrado"

    // ===== Notification =====
    public static readonly NOTIFICATION_NOT_FOUND = "Notificación no encontrada."

    // ===== Session =====
    public static readonly LOGIN_ERROR_MESSAGE = "No se ha podido iniciar sesión"
    public static readonly NO_SESSION_SAVED_ERROR = "No hay sesión guardada"
    public static readonly GET_SESSION_ERROR = "Error obteniendo sesión"
    public static readonly SAVE_SESSION_ERROR = "Error guardando sesión"
    public static readonly DELETE_SESSION_ERROR = "Error eliminando sesión"

    // ===== Misc =====
    public static readonly REVIEW_NOT_FOUND = "Reseña no encontrada."
    public static readonly UNKNOWN_ERROR = "Error desconocido"

}