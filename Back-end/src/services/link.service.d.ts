declare class LinkService {
    static encurtarLink(urlOriginal: string, codigo?: string, expiraEm?: number, senha?: string): Promise<{
        id: string;
        codigo: string;
        url_original: string;
        total_cliques: number;
        senha: string | null;
        qrcode_path: string | null;
        criado_em: Date;
        expira_em: Date | null;
    }>;
    static redirecionarLink(codigo: string, ip: string, userAgent: string): Promise<string>;
    static verificarSenha(codigo: string, senha: string, ip: string, userAgent: string): Promise<string>;
    static gerarQrcode(codigo: string): Promise<string>;
    static buscarEstatisticas(): Promise<{
        totalCliques: number;
        estados: {
            estado: any;
            total: any;
        }[];
        dispositivos: {
            dispositivo: any;
            total: any;
        }[];
    }>;
}
export default LinkService;
//# sourceMappingURL=link.service.d.ts.map