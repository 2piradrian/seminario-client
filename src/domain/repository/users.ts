export abstract class UsersRepository {
    abstract getById(): Promise<any>;
    abstract register(): Promise<any>;
    abstract login(): Promise<any>;
}