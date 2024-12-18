import { UpdateClientesDto } from '../dto/update-clientes.dto';
import { CreateClientesDto } from '../dto/create-clientes.dto';
import { ClientesService } from '../service/cliente.service';
import { Clientes } from '../schema/cliente.schema';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(createClientesDto: CreateClientesDto): Promise<Clientes>;
    findAll(): Promise<Clientes[]>;
    findOne(id: string): Promise<Clientes>;
    update(id: string, updateClientesDto: UpdateClientesDto): Promise<Clientes>;
    remove(id: string): Promise<void>;
    deactivate(id: string): Promise<void>;
    active(id: string): Promise<void>;
}
