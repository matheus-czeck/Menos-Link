import { prisma } from "../repositories/database.ts";

class CliqueModel {
  static async registrarClique(linkId: string) {
    return prisma.clique.create({ data: { linkId } });
  }
}

export default CliqueModel;
