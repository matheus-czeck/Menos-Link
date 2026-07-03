declare class CliqueModel {
    static registrarClique(linkId: string, ip: string, userAgent: string): Promise<{
        id: string;
        clicadoEm: Date;
        ip: string | null;
        pais: string | null;
        estado: string | null;
        dispositivo: string | null;
        linkId: string;
    }>;
}
export default CliqueModel;
//# sourceMappingURL=clique.model.d.ts.map