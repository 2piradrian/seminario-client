export class Regex {

    public static readonly EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public static readonly NAME = /^[\p{L}]{2,20}(?:[ '-][\p{L}]{2,20})*$/u;

    public static readonly SURNAME = /^[\p{L}]{2,20}(?:[ '-][\p{L}]{2,20})*$/u;

    public static readonly PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;

public static readonly SHORT_DESCRIPTION = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 @!|¿?¡%&$*+_:;=\/#\-\^~`'".,\[\]{}]{1,65}$/;

    public static readonly LONG_DESCRIPTION  = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 @!|¿?¡%&$*+_:;=\/#\-\^~`'".,\s\[\]{}]{1,150}$/;

    public static readonly TITLE = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,!?'"¡¿@%&$*+_:;\-\s\[\]{}]{1,64}$/;

    public static readonly CONTENT = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,!?'"¡¿@%&$*+_=#/?;:\\\-\s\r\n\[\]{}]{1,4096}$/;
    
    public static readonly COMMENT_CONTENT = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,!?'"¡¿@%&$*+_:;\-\s\[\]{}]{1,250}$/;
   
}