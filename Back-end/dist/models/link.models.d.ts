declare class LinkModel {
    static gerarLink(tamanho?: number): string;
    static linkDisponivel(codigo: string): Promise<boolean>;
    static criarLinkUnico(urlOriginal: string, codigo?: string, expiraEm?: number, senha?: string): Promise<{
        id: string;
        codigo: string;
        url_original: string;
        total_cliques: number;
        senha: string | null;
        qrcode_path: string | null;
        criado_em: Date;
        expira_em: Date | null;
    }>;
    static buscarLink(codigo: string): Promise<{
        id: string;
        codigo: string;
        url_original: string;
        total_cliques: number;
        senha: string | null;
        qrcode_path: string | null;
        criado_em: Date;
        expira_em: Date | null;
    } | null>;
    static registrarClique(linkId: string): Promise<{
        id: string;
        codigo: string;
        url_original: string;
        total_cliques: number;
        senha: string | null;
        qrcode_path: string | null;
        criado_em: Date;
        expira_em: Date | null;
    }>;
    static gerarQrcode(codigo: string): Promise<string>;
    static verificarSenha(codigo: string, senha: string, ip: string, userAgent: string): Promise<string>;
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
    static buscarLinkParaQrcode(codigo: string): Promise<{
        id: string;
        codigo: string;
        url_original: string;
        total_cliques: number;
        senha: string | null;
        qrcode_path: string | null;
        criado_em: Date;
        expira_em: Date | null;
    }>;
}
export default LinkModel;
//# sourceMappingURL=link.models.d.ts.map