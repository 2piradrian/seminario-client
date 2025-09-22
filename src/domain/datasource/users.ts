export abstract class UserDataSourceI {
    abstract getById(): Promise<any>;
    abstract register(): Promise<any>;
    abstract login(): Promise<any>;
}