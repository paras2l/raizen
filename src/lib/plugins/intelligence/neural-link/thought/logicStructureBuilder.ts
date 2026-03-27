import { LogicStructure } from './thoughtCodeTypes';

export class LogicStructureBuilder {
  public build(structure: LogicStructure): any {
    // Builds the internal representation of the program.
    // This provides the context for the Generation Engine.
    return {
      name: structure.modules[0],
      methods: structure.functions,
      schema: structure.dataStructures,
      integrations: structure.apis
    };
  }
}
