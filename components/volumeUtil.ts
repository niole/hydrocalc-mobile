import { VolumeUnits, SizeUnits } from '../globalState';

export const pluralizeSizes = (unit: SizeUnits): string => {
  switch (unit) {
    case SizeUnits.CM:
      return 'cm';
    case SizeUnits.Inch:
      return 'inches';
    default:
      throw new Error(`this size unit is not covered in pluralization logic: ${unit}`);
  }
};

export const pluralizeVolumes = (unit: VolumeUnits): string => {
  return `${VolumeUnits[unit].toLowerCase()}s`;
};
