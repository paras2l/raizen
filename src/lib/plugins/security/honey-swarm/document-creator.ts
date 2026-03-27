export class SyntheticDocumentCreator {
  createDocuments(volume: number) {
    console.log(`[HONEY-SWARM] Synthesizing ${volume} realistic fake documents to flood attacker channels...`);
    return Array(volume).fill({ title: 'Confidential_Dossier_Fake.pdf', tagged: true });
  }
}
