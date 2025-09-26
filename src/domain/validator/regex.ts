export class Regex {

    public static readonly EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public static readonly NAME = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    
    public static readonly SURNAME = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

    public static readonly PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;

    public static readonly IMAGE_URL = /^https:\/\/.+$/;

    public static readonly SHORT_DESCRIPTION = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,!?'"¡¿@%&$*+_:;\-\s]{1,50}$/;

    public static readonly LONG_DESCRIPTION  = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,!?'"¡¿@%&$*+_:;\-\s]{1,150}$/;
    
}