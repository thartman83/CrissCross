import { describe, it, expect } from "vitest";
import * as fs from 'fs';
import { parsePuzFile } from "../puzFileUtils";

beforeAll(() => {

});

describe('puzFileUtils unit tests', () => {
  describe('parse puzzle file', () => {
    const puzStr = fs.readFileSync('src/utils/tests/wapo.puz') || "";

    expect(puzStr).not.toBeUndefined();
    console.log(`Puzzle string ${puzStr}`);
    const puzObj = parsePuzFile(puzStr);

    it(`Should parse the header information correctly`, () => {
      expect(puzObj.height).toBe(15);
      expect(puzObj.width).toBe(15);
      expect(puzObj.version).toBe('1.2c');
      expect(puzObj.clueCount).toBe(78);
    });

    it(`Should pull in the grid`, () => {
      const expectedGrid = 'LAMB.SPAT.CARVEORAL.ALEE.OBIESFIRESTORM.QUOTETAKEASWIPEAT......PIC.ETTU.SPFPHD.DOS..AVATARRUES.ROOK.IRANIESCAPEATTENTIONSHAKE.POEM.SNUGTUNERS..LBJ.STEOPT.FOAM.EEL......HOPEANDFAITHMAJOR.GUIDEPOSTAXIOM.IDLE.SWATTEMPS.SEED.EARP';
      const expectedState = '----.----.---------.----.--------------.-----------------......---.----.------.---..----------.----.-------------------------.----.----------..---.------.----.---......-----------------.--------------.----.---------.----.----';
      expect(puzObj.grid.length).toBe(puzObj.height * puzObj.width);
      expect(puzObj.grid.join('')).toBe(expectedGrid);
      expect(puzObj.state.join('')).toBe(expectedState);
    });

    it(`Should identify the author, title and copyright`, () => {
      expect(puzObj.title).toBe('December 6, 2005 - "Split Pea Soup"');
      expect(puzObj.author).toBe('By Raymond Hamel');
      expect(puzObj.copyright).toBe('� 2005 Raymond Hamel.  Distributed by CrosSynergy(TM) Syndicate');
    });

    it(`Should find all of the clues for each of the answers`, () => {
      expect(puzObj.clues.length).toBe(puzObj.clueCount);
      expect(puzObj.clues[0]).toBe("Mary's pet");
    });
  });
});
