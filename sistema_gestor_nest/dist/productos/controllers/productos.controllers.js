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
exports.ProductosControllers = void 0;
const common_1 = require("@nestjs/common");
const productos_services_1 = require("../services/productos.services");
const create_productos_dto_1 = require("../dto/create-productos.dto");
const update_productos_dto_1 = require("../dto/update-productos-dto");
const productos_schema_1 = require("../schema/productos.schema");
const swagger_1 = require("@nestjs/swagger");
let ProductosControllers = class ProductosControllers {
    constructor(productosServices) {
        this.productosServices = productosServices;
    }
    async create(createProductosDto) {
        return this.productosServices.createProducto(createProductosDto);
    }
    async deactive(id) {
        await this.productosServices.deactive(id);
    }
    async active(id) {
        await this.productosServices.active(id);
    }
    async delete(id) {
        await this.productosServices.delete(id);
    }
    async findAll() {
        return await this.productosServices.findAllProdutos();
    }
    async findOne(id) {
        return await this.productosServices.findOne(id);
    }
    async update(id, updateProductosDto) {
        return await this.productosServices.update(id, updateProductosDto);
    }
    async updatePartial(id, updateProductosDto) {
        return await this.productosServices.updatePartial(id, updateProductosDto);
    }
    async agregarProveedorProducto(productoId, proveedorId) {
        return await this.productosServices.agregarProveedorAProducto(productoId, proveedorId);
    }
    async eliminarProveedorProducto(productoId, proveedorId) {
        return await this.productosServices.eliminarProveedorDeProducto(productoId, proveedorId);
    }
    async agregarClienteAProducto(productoId, clienteId) {
        return await this.productosServices.agregarClientesAProducto(productoId, clienteId);
    }
    async eliminarCLienteDeProducto(productoId, clienteId) {
        return await this.productosServices.eliminarClientesDeProducto(productoId, clienteId);
    }
};
exports.ProductosControllers = ProductosControllers;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo producto' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto creado', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Solicitud incorrecta' }),
    (0, swagger_1.ApiBody)({
        type: create_productos_dto_1.CreateProductoDto,
        examples: {
            ejemplo1: {
                summary: 'Ejemplo de creación de producto',
                value: {
                    nombre_producto: 'Producto Ejemplo',
                    cantidad: 10,
                    precio: 100.50,
                    proveedor: ['proveedorId1', 'proveedorId2'],
                    cliente: ['clienteId1'],
                    activo: true,
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_productos_dto_1.CreateProductoDto]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "create", null);
__decorate([
    (0, common_1.Put)('deactive/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Desactivar un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Producto desactivado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "deactive", null);
__decorate([
    (0, common_1.Put)('active/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Activar un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Producto activado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "active", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Producto eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los productos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de productos', type: [productos_schema_1.Productos] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto encontrado', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto actualizado', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, swagger_1.ApiBody)({
        type: update_productos_dto_1.UpdateProductosDto,
        examples: {
            ejemplo1: {
                summary: 'Ejemplo de actualización de producto',
                value: {
                    nombre_producto: 'Producto Actualizado',
                    cantidad: 20,
                    precio: 150.00,
                    proveedor: ['proveedorId1'],
                    cliente: ['clienteId2'],
                    activo: false,
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_productos_dto_1.UpdateProductosDto]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updatePartial/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar parcialmente un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto actualizado parcialmente', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, swagger_1.ApiBody)({
        type: update_productos_dto_1.UpdateProductosDto,
        examples: {
            ejemplo1: {
                summary: 'Ejemplo de actualización parcial',
                value: {
                    precio: 120.00,
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_productos_dto_1.UpdateProductosDto]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "updatePartial", null);
__decorate([
    (0, common_1.Patch)(':productoId/proveedores/:proveedorId'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar un proveedor a un producto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Proveedor agregado al producto', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto o proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('productoId')),
    __param(1, (0, common_1.Param)('proveedorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "agregarProveedorProducto", null);
__decorate([
    (0, common_1.Patch)(':productoId/proveedores/:proveedorId/eliminar'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un proveedor de un producto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Proveedor eliminado del producto', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto o proveedor no encontrado' }),
    __param(0, (0, common_1.Param)('productoId')),
    __param(1, (0, common_1.Param)('proveedorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "eliminarProveedorProducto", null);
__decorate([
    (0, common_1.Patch)(':productoId/clientes/:clienteId'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar un cliente a un producto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente agregado al producto', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto o cliente no encontrado' }),
    __param(0, (0, common_1.Param)('productoId')),
    __param(1, (0, common_1.Param)('clienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "agregarClienteAProducto", null);
__decorate([
    (0, common_1.Patch)(':productoId/clientes/:clienteId/eliminar'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un cliente de un producto' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente eliminado del producto', type: productos_schema_1.Productos }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto o cliente no encontrado' }),
    __param(0, (0, common_1.Param)('productoId')),
    __param(1, (0, common_1.Param)('clienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductosControllers.prototype, "eliminarCLienteDeProducto", null);
exports.ProductosControllers = ProductosControllers = __decorate([
    (0, swagger_1.ApiTags)('productos'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [productos_services_1.ProductosServices])
], ProductosControllers);
//# sourceMappingURL=productos.controllers.js.map