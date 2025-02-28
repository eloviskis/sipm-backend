"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePermission = exports.addPermission = exports.getNotificationStats = exports.getSettingsStats = exports.getReportStats = exports.getUserStats = void 0;
const logger_1 = __importDefault(require("../middlewares/logger"));
const userModel_1 = __importDefault(require("../models/userModel")); // Importar o modelo de Usuário
// Função para obter estatísticas de usuários
const getUserStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = { count: 100 }; // Simular um retorno de 100 usuários cadastrados
        (0, logger_1.default)('info', 'Estatísticas de usuários recuperadas com sucesso.');
        res.status(200).send(stats);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao recuperar estatísticas de usuários:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de usuários.' });
    }
});
exports.getUserStats = getUserStats;
// Função para obter estatísticas de relatórios
const getReportStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = { count: 50 }; // Simular um retorno de 50 relatórios gerados
        (0, logger_1.default)('info', 'Estatísticas de relatórios recuperadas com sucesso.');
        res.status(200).send(stats);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao recuperar estatísticas de relatórios:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de relatórios.' });
    }
});
exports.getReportStats = getReportStats;
// Função para obter estatísticas de configurações
const getSettingsStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = { count: 20 }; // Simular um retorno de 20 configurações
        (0, logger_1.default)('info', 'Estatísticas de configurações recuperadas com sucesso.');
        res.status(200).send(stats);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao recuperar estatísticas de configurações:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de configurações.' });
    }
});
exports.getSettingsStats = getSettingsStats;
// Função para obter estatísticas de notificações
const getNotificationStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = { count: 200 }; // Simular um retorno de 200 notificações enviadas
        (0, logger_1.default)('info', 'Estatísticas de notificações recuperadas com sucesso.');
        res.status(200).send(stats);
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao recuperar estatísticas de notificações:', error);
        res.status(500).send({ error: 'Erro ao recuperar estatísticas de notificações.' });
    }
});
exports.getNotificationStats = getNotificationStats;
// Função para adicionar permissão a um usuário
const addPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { permission } = req.body;
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        user.permissions.push(permission);
        yield user.save();
        (0, logger_1.default)('info', `Permissão ${permission} adicionada ao usuário ${user.email}`);
        res.status(200).send({ message: 'Permission added successfully.', user });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao adicionar permissão:', error);
        res.status(500).send({ error: 'Erro ao adicionar permissão.' });
    }
});
exports.addPermission = addPermission;
// Função para remover permissão de um usuário
const removePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { permission } = req.body;
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }
        user.permissions = user.permissions.filter((perm) => perm !== permission);
        yield user.save();
        (0, logger_1.default)('info', `Permissão ${permission} removida do usuário ${user.email}`);
        res.status(200).send({ message: 'Permission removed successfully.', user });
    }
    catch (error) {
        (0, logger_1.default)('error', 'Erro ao remover permissão:', error);
        res.status(500).send({ error: 'Erro ao remover permissão.' });
    }
});
exports.removePermission = removePermission;
