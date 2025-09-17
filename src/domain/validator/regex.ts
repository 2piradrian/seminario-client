export class Regex {

    public static readonly EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    public static readonly NAME = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
    
    public static readonly LASTNAME = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

    public static readonly PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;

}