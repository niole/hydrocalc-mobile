import * as React from 'react';
import { Text, View } from 'react-native';
import { SizeUnits, VolumeUnits, BucketSize } from '../globalState';

/**
 * Renders a BucketSize so that it is human readable
 */

type BucketSizeProps = { bucketSize: BucketSize };

export const BucketSizeLabel: React.FC<BucketSizeProps> = ({ bucketSize: { volume, lwh } }) => volume || lwh ? (
  <View>
    {volume ? <Text>{volume.total} {VolumeUnits[volume.unit]}</Text>: null}
    {lwh ? <Text>{lwh.length} x {lwh.width} x {lwh.height} {SizeUnits[lwh.unit]}</Text>: null}
  </View>
) : null;

