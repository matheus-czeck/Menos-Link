import { prisma } from "../repositories/database.js";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
class CliqueModel {
    static async registrarClique(linkId, ip, userAgent) {
        const geo = geoip.lookup(ip);
        const parser = new UAParser(userAgent);
        const pais = geo?.country || "Desconhecido";
        const estado = geo?.region || "Desconhecido";
        const dispositivo = parser.getDevice().type || "Desktop";
        return prisma.clique.create({
            data: {
                linkId,
                ip,
                pais,
                estado,
                dispositivo,
            },
        });
    }
}
export default CliqueModel;
