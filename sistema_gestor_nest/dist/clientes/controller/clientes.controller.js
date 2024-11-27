"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const update_clientes_dto_1 = require("../dto/update-clientes.dto");
const create_clientes_dto_1 = require("../dto/create-clientes.dto");
const cliente_service_1 = require("../service/cliente.service");
const cliente_schema_1 = require("../schema/cliente.schema");
const swagger_1 = require("@nestjs/swagger");
let ClientesController = class ClientesController {
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    async create(createClientesDto) {
        return await this.clientesService.createCliente(createClientesDto);
    }
    async findAll() {
        return await this.clientesService.findAll();
    }
    async findOne(id) {
        return await this.clientesService.findOne(id);
    }
    async update(id, updateClientesDto) {
        return await this.clientesService.update(id, updateClientesDto);
    }
    async remove(id) {
        await this.clientesService.delete(id);
    }
    async deactivate(id) {
        await this.clientesService.deactivate(id);
    }
    async active(id) {
        await this.clientesService.active(id);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo cliente' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cliente creado con éxito', type: cliente_schema_1.Clientes }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Error en la creación del cliente' }),
    (0, swagger_1.ApiBody)({
        description: 'Datos del cliente a crear',
        type: create_clientes_dto_1.CreateClientesDto,
        examples: {
            example: {
                summary: 'Ejemplo de creación de cliente',
                value: {
                    numero_identificacion: '12345678',
                    nombre_cliente: 'Juan Pérez',
                    email_cliente: 'juan.perez@example.com',
                    celular_cliente: '555-5555',
                    activo_cliente: true,
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_clientes_dto_1.CreateClientesDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los clientes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de clientes', type: [cliente_schema_1.Clientes] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un cliente por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente encontrado', type: cliente_schema_1.Clientes }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del cliente que deseas obtener',
        type: String,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un cliente por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente actualizado', type: cliente_schema_1.Clientes }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    (0, swagger_1.ApiBody)({
        description: 'Datos del cliente a actualizar',
        type: update_clientes_dto_1.UpdateClientesDto,
        examples: {
            example: {
                summary: 'Ejemplo de actualización de cliente',
                value: {
                    nombre_cliente: 'Juan Pérez Actualizado',
                    email_cliente: 'juan.perez.actualizado@example.com',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clientes_dto_1.UpdateClientesDto]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un cliente por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Cliente eliminado con éxito' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del cliente que deseas eliminar',
        type: String,
    }),
    (0, swagger_1.ApiBody)({
        description: 'No se requiere cuerpo para eliminar un cliente',
        examples: {
            example: {
                summary: 'Ejemplo de eliminación de cliente',
                value: {
                    message: 'Cliente eliminado con éxito',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('deactivate/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Desactivar un cliente por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Cliente desactivado con éxito' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del cliente que deseas desactivar',
        type: String,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)('active/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Activar un cliente por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Cliente activado con éxito' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente no encontrado' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'ID del cliente que deseas activar',
        type: String,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientesController.prototype, "active", null);
exports.ClientesController = ClientesController = __decorate([
    (0, swagger_1.ApiTags)('clientes'),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClientesService])
], ClientesController);
//# sourceMappingURL=clientes.controller.js.map