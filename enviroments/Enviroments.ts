import * as prodEnv from './env.prod';
import * as testingEnv from './env.testing';
import * as stagingEnv from './env.staging';

export class Enviroment {
    private readonly env: any;

    // * Definimos el constructor que recibirá el ambiente a ejecutar
    // * según el argumento recibido, se asignará el ambiente y los datos correspondientes
    // * a la variable env
    constructor(enviroment: string) {
        switch (process.env.NODE_ENV) {
            case 'prod':
                this.env = prodEnv.PROD[enviroment];
                break;
            case 'testing':
                this.env = testingEnv.TESTING[enviroment];
                break;
            case 'staging':
                this.env = stagingEnv.STAGING[enviroment];
                break;
            default:
                throw new Error('Ambiente inválido');
        }
    }

    // * Debemos declarar los métodos get para cada una de las variables
    // * que necesitemos utilizar en nuestros tests
    // *
    // * No es necesario declarar el ambiente de ese dato, ya que se asignó
    // * cuando definimos el constructor

    public get urlAgent(): string {
        return this.env.urlAgent;
    }

    public get urlComsumer(): string {
        return this.env.urlComsumer;
    }

    public get appLink(): string {
        return this.env.appLink;
    }

    public get userName(): string {
        return this.env.username;
    }

    public get password(): string {
        return this.env.password;
    }
}
