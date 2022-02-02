import * as React from 'react';
import { Text, View } from 'react-native';
import { SizeUnits, VolumeUnits, BucketSize } from '../globalState';
import { pluralizeSizes, pluralizeVolumes } from './volumeUtil';

/**
 * Renders a BucketSize so that it is human readable
 */

type BucketSizeProps = {
  bucketSize: BucketSize;
};

export const BucketSizeLabel: React.FC<BucketSizeProps> = ({
  bucketSize: { volume, lwh }
}) => volume || lwh ? (
  <View>
    {volume ? <Text>{volume.total} {pluralizeVolumes(volume.unit)}</Text>: null}
    {lwh ? <Text>{lwh.length} x {lwh.width} x {lwh.height} {pluralizeSizes(lwh.unit)}</Text>: null}
  </View>
) : null;

